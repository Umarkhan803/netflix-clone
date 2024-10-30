import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import WatchPageSkeleton from "../components/WatchPageSkeleton";
import { formatReleaseDate } from "../utils/dateFunction";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerId, setCurrenTrailerId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/trailers`);
        setTrailers(response.data.trailers);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTrailers();
  }, [contentType, id]);

  //   console.log("trailers", trailers);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/similar`);
        setSimilarContent(response.data.similar);
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  //   console.log("similar", similarContent);
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/details`);
        setContent(response.data.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);
  //   console.log("content", content);
  const handelNext = () => {
    if (currentTrailerId < trailers.length - 1)
      setCurrenTrailerId(currentTrailerId + 1);
  };
  const handelPrev = () => {
    if (currentTrailerId > 0) setCurrenTrailerId(currentTrailerId - 1);
  };

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

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h1 className="text-2xl sm:text-5xl font-bold text-balance">
              Content Not Found
            </h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <div className="mx-auto container px-4 py-8 h-full">
          <Navbar />
          {trailers.length > 0 && (
            <div className="flex justify-between items-center mb-4">
              <button
                className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                  currentTrailerId === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={currentTrailerId === 0}
                onClick={handelPrev}>
                <ChevronLeft size={24} />
              </button>
              <button
                className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                  currentTrailerId === trailers.length - 1
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={currentTrailerId === trailers.length - 1}
                onClick={handelNext}>
                <ChevronRight size={24} />
              </button>
            </div>
          )}
          <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32 ">
            {trailers.length > 0 && (
              <ReactPlayer
                controls={true}
                width={"100%"}
                height={"70vh"}
                className="mx-auto overflow-hidden rounded-lg"
                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerId].key}`}
              />
            )}
            {trailers?.length === 0 && (
              <>
                <h2 className="text-xl text-center mt-5">
                  No trailers available for{" "}
                </h2>
                <span className="font-bold text-red-600">
                  {content?.title || content?.name}
                </span>
                😥
              </>
            )}
          </div>
          {/* movies details */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto">
            <div className="mb-4 md:mb-0">
              <h2 className="text-5xl font-bold text-balance">
                {content?.title || content?.name}
              </h2>

              <p className="mt-2 text-lg">
                {formatReleaseDate(
                  content?.release_date || content?.first_air_date
                )}{" "}
                |{" "}
                {content?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}{" "}
              </p>
              <p className="mt-4 text-lg">{content?.overview}</p>
            </div>
            <img
              src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
              alt="Poster image"
              className="max-h-[600px] rounded-md"
            />
          </div>
          {similarContent.length > 0 && (
            <div className="mt-12 max-w-5xl mx-auto relative">
              <h3 className="text-3xl font-bold mb-4">
                Similar Movies/Tv show
              </h3>
              <div
                className="flex overflow-x-scroll scrollbar-hide gap-4 group"
                ref={sliderRef}>
                {similarContent.map((content) => {
                  if (content.poster_path === null) return null;
                  return (
                    <Link
                      key={content.id}
                      to={`/watch/${content.id}`}
                      className="w-52 flex-none">
                      <img
                        src={SMALL_IMG_BASE_URL + content?.poster_path}
                        alt="similar img"
                        className="w-full h-auto rounded-md"
                      />
                      <h4 className="mt-2 text-lg font-semibold">
                        {content.title || content.name}
                      </h4>
                    </Link>
                  );
                })}
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-5 md:-left-12 flex items-center justify-center
                size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
                  onClick={scrollLeft}>
                  <ChevronLeft />
                </button>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-5 md:-right-12 flex items-center justify-center
                size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
                  onClick={scrollRight}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WatchPage;
