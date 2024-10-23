import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState();

  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
          <Link to={"/"}>
            <img src="/netflix-logo.png" alt="logo" className="w-32 sm:w-40" />
          </Link>
          {/* desktop navbar items */}
          <div className="hidden sm:flex gap-2 items-center">
            <Link to={"/"} className="hover:underline">
              Movies
            </Link>
            <Link to={"/"} className="hover:underline">
              Tv Show
            </Link>
            <Link to={"/"} className="hover:underline">
              Search History
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center z-50">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer" />
          </Link>
          <img
            src={user.image}
            alt="user image"
            className="h-8 rounded cursor-pointer"
          />
          <LogOut className="size-6 cursor-pointer " onClick={logout} />
        </div>
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
        {/* mobile nav bars items */}
        {isMobileMenuOpen && (
          <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
            <Link
              to={"/"}
              className="block hover:underline p-2"
              onClick={toggleMobileMenu}>
              Movies
            </Link>
            <Link
              to={"/"}
              className="block hover:underline p-2"
              onClick={toggleMobileMenu}>
              Tv Show
            </Link>
            <Link
              to={"/"}
              className="block hover:underline p-2"
              onClick={toggleMobileMenu}>
              Search History
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
