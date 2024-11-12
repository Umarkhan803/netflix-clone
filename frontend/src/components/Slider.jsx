import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [arrows, setArrows] = useState(false);

  const sliderRef = useRef(null);

  const formattedCategory =
    category.replace("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContent = contentType === "movie" ? "Movie" : "Tv Show";
  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${category}`);
        setContent(response.data.content);
      } catch (error) {
        console.log(error.message);
      }
    };

    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className="bg-black text-white relative px-5 md:px-20"
        onMouseEnter={() => setArrows(true)}
        onMouseLeave={() => setArrows(false)}>
        <h2 className="mb-4 text-2xl font-bold">
          {formattedCategory} {formattedContent}
        </h2>

        <div
          className="flex space-x-4 overflow-x-scroll scrollbar-hide"
          ref={sliderRef}>
          {content.map((item) => (
            <Link
              key={item.id}
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt="slide img"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center">{item.tittle || item.name}</p>
            </Link>
          ))}
        </div>
        {arrows && (
          <>
            <button
              className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
              onClick={scrollLeft}>
              <ChevronLeft />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
              onClick={scrollRight}>
              <ChevronRight />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Slider;
