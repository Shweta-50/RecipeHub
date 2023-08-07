import React, { useState } from "react";
import Header from "../Header/Header";
import Products from "../Products/Products";
import chilli from "../../assets/chilli.json";
import { ToastContainer } from "react-toastify";

import Lottie from "lottie-react";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 150) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <div className=" relative home ">
      <div
        className="absolute w-full md:h-[44vh] top-4"
        style={{
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 1,
        }}
      >
        <Lottie
          className="absolute "
          animationData={chilli}
          loop={true}
          style={{ height: "100%", left: "50%" }}
        />
        <Lottie
          className="absolute"
          animationData={chilli}
          loop={true}
          style={{ height: "100%", left: "70%" }}
        />
        <Lottie
          className="absolute "
          animationData={chilli}
          loop={true}
          style={{ height: "100%" }}
        />
      </div>
      <div className="  home-continer relative lg:h-[43vh] md:h-[40vh] xl:h-[60vh] h-[35vh]">
        <div
          className={` transition-all ${
            colorChange &&
            "fixed w-full shadow-lg z-30 backdrop-filter backdrop-blur-lg"
          }`}
        >
          <Header />
        </div>

        <div
          className="flex justify-center items-center relative h-[50%] text-center"
          style={{ zIndex: 2 }}
        >
          <div>
            <h1 className="md:text-[5vw] hero-heading hover:text-green-500 hover:scale-105 transition-all text-[40px] z-20 animate__animated animate__fadeInDown  font-bold">
              Welcome to RecipiHub
            </h1>
            <p className=" animate__animated animate__fadeInUp text-center hover:scale-105 transition-all md:text-lg lg:text-3xl text-[20px] xl:text-4xl">
              🍽 Find the best food recipe here !🍴
            </p>
          </div>
        </div>
      </div>

      <Products />
      <Sidebar />
      <Footer />
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default Home;
