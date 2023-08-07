import React, { useEffect, useState } from "react";

import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../../assets/recipe.png";
import { auth, signOut } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { openSidebar } from "../../redux/sidebarSlice";

const Header = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();

  const savedRecipes = useSelector((state) => state.recipes.savedRecipes);

  const handleOpenSidebar = () => {
    dispatch(openSidebar(true)); // Open the sidebar
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setisLoggedIn(true);
      setUserName(user?.displayName);
      let userToken = getItemFromLocalStorage("user")?.token;
      if (userToken !== null) {
        setToken(userToken);
      }
    });
  }, []);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully.");
        removeItemFromLocalStorage("user");
        removeItemFromLocalStorage("savedRecipes");
        dispatch(logout());
        window.location.reload(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let avIcon = userName
    ?.split(" ")
    .map((name) => name.slice(0, 1))
    .join(" ");

  return (
    <div className="container mx-auto pt-3 relative z-30 ">
      <div className="navbar">
        <div className=" cursor-pointer animate__animated animate__fadeInLeft">
          <img
            src={logo}
            alt="logo"
            style={{ zIndex: 2 }}
            className="hover:scale-110 transition-all lg:w-[150px] w-28 ml-2 "
          />
        </div>

        <div
          className="d-flex justify-center items-center gap-2 ml-auto animate__animated animate__fadeInRight"
          style={{ zIndex: 2 }}
        >
          <div className="">
            <div
              onClick={handleOpenSidebar}
              className="indicator lg:mr-4 mr-2 bg-gray-800   hover:scale-110 transition-all cursor-pointer rounded-3xl h-[40px] w-[40px] d-flex justify-center items-center"
            >
              <AiFillHeart className=" text-red-600 " size={25} />
              <span className="badge badge-sm indicator-item bg-blue-500 h-5 w-5 text-white font-bold">
                {savedRecipes?.length}
              </span>
            </div>
          </div>
          {!token && (
            <div>
              <Link
                to="/login"
                className="btn rounded-3xl hover:scale-110 transition-all px-4 lg:px-7 bg-[#57b565] hover:bg-[#51985C] shadow-lg text-white outline-none border-none"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn hover:scale-110 transition-all lg:ml-3 bg-gray-200 outline-none border-none rounded-3xl  px-4 lg:px-7 shadow-lg  "
              >
                SignUp
              </Link>
            </div>
          )}

          <div
            className={`${
              token
                ? "dropdown dropdown-end z-30 animate__animated animate__fadeInRight "
                : "hidden"
            }`}
          >
            <div
              className="avatar online  hover:scale-110 transition-all placeholder cursor-pointer "
              tabIndex={0}
            >
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10 shadow-lg">
                <span className="text-lg">{avIcon}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3  p-2 z-30  shadow menu menu-sm dropdown-content bg-white rounded-box w-40"
            >
              <li>
                <button
                  className="cursor-pointer mb-2 animate__animated animate__fadeInRight"
                  onClick={handleOpenSidebar}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="cursor-pointer animate__animated animate__fadeInRight"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default Header;
