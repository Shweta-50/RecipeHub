import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../redux/sidebarSlice";
import { SlClose } from "react-icons/sl";
import { FaTrash } from "react-icons/fa";
import { getItemFromLocalStorage } from "../../utils/localStorage";
import { auth } from "../../utils/firebase";
import EmptyItem from "../../assets/emptyItem.json";
import Lottie from "lottie-react";
import { removeSavedRecipe } from "../../redux/recipeSlice";

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const recipe = useSelector((state) => state.recipes.savedRecipes);
  const [userData, setUserData] = useState("");
  const dispatch = useDispatch();
  let user = getItemFromLocalStorage("user");
  const handleCloseSidebar = () => {
    dispatch(openSidebar(false)); // Close the sidebar
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, []);

  const deleteSavedRecipe = (item) => {
    dispatch(removeSavedRecipe(item));
  };

  return (
    <>
      <button
        className={`${
          !isSidebarOpen
            ? "hidden"
            : "flex text-4xl text-white items-center cursor-pointer fixed right-12 hover:scale-100 transition-all top-8 z-50"
        }`}
        onClick={handleCloseSidebar}
      >
        <SlClose className="text-slate-700" size={24} />
      </button>

      <div
        className={`top-0 right-0 lg:w-[25vw] md:w-[40vw] w-[100vw] glass  p-5 pt-10  sidebar text-white fixed h-screen overflow-y-scroll z-40 overflow-x-hidden ease-in-out duration-300 ${
          isSidebarOpen ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="my-10">
          <div className="absolute top-5 flex  items-center gap-3 w-full">
            {recipe.length == 0 ? (
              <div className=" h-screen w-full flex  justify-center items-center mx-auto  ">
                <div className="">
                  <Lottie
                    animationData={EmptyItem}
                    loop={true}
                    className="w-40 lg:60 mx-auto"
                  />
                  <h1 className="text-lg text-slate-700 font-bold ">
                    No Recipes in your bucket
                  </h1>
                </div>
              </div>
            ) : null}
            <div>
              {userData && (
                <div
                  className="avatar online absolute top-2   hover:scale-105 transition-all left-2    placeholder cursor-pointer "
                  tabIndex={0}
                >
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10 shadow-lg">
                    <span className="text-lg">
                      {" "}
                      {userData?.displayName
                        ?.split(" ")
                        .map((name) => name.slice(0, 1))
                        .join(" ")}
                    </span>
                  </div>
                </div>
              )}
              <div className=" absolute top-1 left-14">
                <h1 className="text-slate-700 font-semibold">
                  {userData.displayName}
                </h1>
                <span className="text-slate-700 ">{userData.email}</span>
              </div>
            </div>
          </div>
          <div className="mt-14">
            {recipe?.map((item) => (
              <div
                className="card card-side bg-base-100 shadow-xl h-100 my-5 hover:scale-105 transition-all animate__animated animate__fadeInUp "
                key={item.recipe.label}
              >
                <figure>
                  <img
                    src={item.recipe.image}
                    alt={item.recipe.label}
                    className="h-full w-28 lg:w-30"
                  />
                </figure>
                <div className="card-body p-3 px-6 gap-0  relative">
                  <button
                    className="absolute top-10 right-3 hover:scale-125 transition-all"
                    onClick={() => deleteSavedRecipe(item.recipe.label)}
                  >
                    <FaTrash size={24} color="red" />
                  </button>
                  <p className="card-title text-black text-[14px]">
                    {item.recipe.label.length > 15
                      ? item.recipe.label.substring(0, 15) + "..."
                      : item.recipe.label}
                  </p>
                  <span className=" text-gray-600 text-sm mb-2">
                    {item.recipe.mealType}
                  </span>

                  <a
                    target="_blank"
                    href={item.recipe.url}
                    className="bg-warning hover:scale-105 transition-all w-[max-content] text-sm block rounded-md text-center px-2 py-1 shadow-lg"
                  >
                    See full Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
