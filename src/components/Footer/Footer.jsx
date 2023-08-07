import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-green-400 via-green-200 to-green-500 py-5 flex-col">
      <h3 className="font-bold text-2xl ">RecipeHub&copy; {date} </h3>
      <a
        href="https://github.com/Shweta-50/"
        className="font-bold text-blue-500"
      >
        Made by Shweta yadav
      </a>
    </div>
  );
};

export default Footer;
