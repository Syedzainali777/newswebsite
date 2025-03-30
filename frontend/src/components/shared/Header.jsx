import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa"; // Import FaBars for menu icon
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutSuccess } from "@/redux/user/userSlice";
import DarkModeToggle from "../shared/DarkModeToggle"; // Dark Mode Toggle

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow-lg sticky top-0 bg-white dark:bg-gray-900 z-50">
      <div className="flex justify-between items-center max-w-6xl lg:max-w-7xl mx-auto p-4">
        <Link to={"/"}>
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="text-slate-500 dark:text-gray-300 font-cinzel">
              Updated
            </span>
            <span className="text-slate-900 dark:text-white font-cinzel">
              Pakistan
            </span>
          </h1>
        </Link>

        {/* Mobile Search (Center) */}
        <form
          className="lg:hidden p-3 bg-slate-100 dark:bg-gray-800 rounded-lg flex items-center mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search ..."
            className="focus:outline-none bg-transparent w-24 sm:w-64 text-slate-700 dark:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600 dark:text-gray-400" />
          </button>
        </form>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-4">
          <Link to={"/"}>
            <li className="text-slate-700 dark:text-gray-300 hover:underline font-cinzel font-bold">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="text-slate-700 dark:text-gray-300 hover:underline font-cinzel font-bold">
              About
            </li>
          </Link>
          <Link to={"/news"}>
            <li className="text-slate-700 dark:text-gray-300 hover:underline font-cinzel font-bold">
              News Articles
            </li>
          </Link>
        </ul>

        {/* Desktop Search */}
        <form
          className="hidden lg:flex p-3 bg-slate-100 dark:bg-gray-800 rounded-lg items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search ..."
            className="focus:outline-none bg-transparent w-24 sm:w-64 text-slate-700 dark:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600 dark:text-gray-400" />
          </button>
        </form>
        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {currentUser ? (
          <DropdownMenu className="hidden lg:block">
            <DropdownMenuTrigger asChild>
              <div>
                <img
                  src={currentUser.profilePicture}
                  alt="user photo"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 dark:bg-gray-800 dark:text-gray-300">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-400" />
              <DropdownMenuItem className="block font-semibold text-sm">
                <div className="flex flex-col gap-1">
                  <span>@{currentUser.username}</span>
                  <span>@{currentUser.email}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold mt-2">
                <Link to="/dashboard?tab=profile" className="w-full block">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-semibold mt-2"
                onClick={handleSignout}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden lg:block">
            <Link to={"/sign-in"}>
              <Button>Sign In</Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Icon (Right Side) */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            <FaBars className="text-xl dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 p-4 shadow-md">
          <ul className="flex flex-col gap-4">
            <Link to={"/"}>
              <li className="text-slate-700 dark:text-gray-300 hover:underline font-cinzel font-bold">
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="text-slate-700 dark:text-gray-300 hover:underline font-cinzel font-bold">
                About
              </li>
            </Link>
            <Link to={"/news"}>
              <li className="text-slate-700 dark:text-gray-300 hover:underline font-cinzel font-bold">
                News Articles
              </li>
            </Link>
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            {currentUser ? (
              <li
                className="font-semibold mt-2 text-slate-700 dark:text-gray-300"
                onClick={handleSignout}
              >
                Sign Out
              </li>
            ) : (
              <Link to={"/sign-in"}>
                <Button>Sign In</Button>
              </Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
