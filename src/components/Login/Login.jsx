import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { setItemInLocalStorage } from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import logo from "../../assets/recipe.png";

import { login } from "../../redux/userSlice";
const LoginPage = () => {
  const [signInData, setSignInData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleInput = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    // form validations for all fields
    if (signInData.email === "" || signInData.password === "") {
      toast.error("Please fill all the field!");
      return;
    }

    if (signInData.email && signInData.password) {
      const isValidEmail = /\S+@\S+\.\S+/.test(signInData.email);
      if (!isValidEmail) {
        toast.error("Enter valid email.");
      }

      if (signInData.password.length < 8) {
        toast.error("Password should be 8 digits.");

        return;
      }
      setSubmitButtonDisabled(true);
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          signInData.email,
          signInData.password
        );
        const data = await res.user;
        if (data) {
          setSubmitButtonDisabled(false);
          toast.success("User Logged In Successfully!");
          setItemInLocalStorage("user", {
            token: data.accessToken,
            email: data.email,
            id: data.uid,
          });
          dispatch(
            login({
              token: data.accessToken,
              email: data.email,
              id: data.uid,
            })
          );
          setUserData(signInData);
          setSignInData({
            email: "",
            password: "",
          });

          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        setSubmitButtonDisabled(false);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="bg-gray-100 px-8 h-screen flex  flex-col gap-4 py-8 items-center">
      <div className=" cursor-pointer  animate__animated animate__zoomIn">
        <img
          src={logo}
          alt="logo"
          width={200}
          className="hover:scale-110 transition-all mr-10"
        />
      </div>
      <div className=" container animate__animated animate__zoomIn  ">
        <div>
          <div className="relative py-3 sm:max-w-lg sm:mx-auto order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-200 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl text-center font-semibold ">LogIn</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        onChange={handleInput}
                        value={signInData.email}
                        name="email"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 mb-2 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        onChange={handleInput}
                        value={signInData.password}
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 mb-2 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        disabled={submitButtonDisabled}
                        onClick={signInWithEmail}
                        className={`${
                          submitButtonDisabled
                            ? "bg-slate-400 w-full hover:bg-slate-600  text-slate-900 rounded-md px-2 py-1"
                            : "bg-green-400 w-full hover:bg-green-500  text-white rounded-md px-2 py-1"
                        }`}
                      >
                        Logi In
                      </button>
                    </div>
                    <p className="text-center">Don't have an account?</p>
                    <Link
                      to="/signup"
                      className="w-full flex justify-center items-center text-blue-700"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
              <ToastContainer position="top-right" autoClose={2500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
