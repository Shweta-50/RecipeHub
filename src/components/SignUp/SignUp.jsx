import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../utils/firebase";
import logo from "../../assets/recipe.png";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
const SignUp = () => {
  const [signUpdata, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleInput = (e) => {
    setSignUpData({
      ...signUpdata,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    // form validations for all fields
    if (
      signUpdata.name === "" ||
      signUpdata.email === "" ||
      signUpdata.password === ""
    ) {
      toast.error("Please fill all the field!");
      return;
    }

    if (signUpdata.name && signUpdata.email && signUpdata.password) {
      const isValidEmail = /\S+@\S+\.\S+/.test(signUpdata.email);
      if (!isValidEmail) {
        toast.error("Enter valid email.");
      }

      if (signUpdata.password.length < 8) {
        toast.error("Password should be 8 digits.");
        return;
      }
      setSubmitButtonDisabled(true);
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          signUpdata.email,
          signUpdata.password
        );
        const data = await res.user;
        await updateProfile(data, {
          displayName: signUpdata.name,
        });
        if (data) {
          setSubmitButtonDisabled(false);

          toast.success("User Registered Successfully!");
          setUserData(signUpdata);
          setSignUpData({
            name: "",
            email: "",
            password: "",
          });

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        setSubmitButtonDisabled(false);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="bg-gray-100 px-8 h-screen flex  flex-col gap-4 py-8 items-center w-full">
      <div className=" cursor-pointer   animate__animated animate__zoomIn">
        <img
          src={logo}
          alt="logo"
          width={200}
          className="hover:scale-110 transition-all mr-10"
        />
      </div>
      <div className="container  animate__animated animate__zoomIn">
        <div>
          <div className="relative py-3 sm:max-w-lg sm:mx-auto order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-200 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold text-center">SignUp</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="name"
                        onChange={handleInput}
                        value={signUpdata.name}
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 mb-2 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter name"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Enter name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        onChange={handleInput}
                        value={signUpdata.email}
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
                        value={signUpdata.password}
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
                        onClick={signUpWithEmail}
                        className={`${
                          submitButtonDisabled
                            ? "bg-slate-400 w-full hover:bg-green-500  text-slate-900 rounded-md px-2 py-1"
                            : "bg-green-400 w-full hover:bg-green-500  text-white rounded-md px-2 py-1"
                        }`}
                      >
                        SignUp
                      </button>
                    </div>
                    <p className="text-center">Already have an account?</p>
                    <Link
                      to="/login"
                      className="w-full flex justify-center items-center text-blue-700"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default SignUp;
