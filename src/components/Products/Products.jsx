import React, { useState, useEffect } from "react";

import { AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import Ingredient from "../Ingredients/Ingredients";
import Lottie from "lottie-react";
import useDebounce from "../../hooks/Debounce";
import loader from "../../assets/loader.json";
import { useDispatch } from "react-redux";
import { saveRecipe } from "../../redux/recipeSlice";
import { getItemFromLocalStorage } from "../../utils/localStorage";
import { randomId } from "../../utils/getRandomId";
import { toast } from "react-toastify";
const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipeList, setRecipeList] = useState([]); // store data from api
  const [search, setSearch] = useState("chole"); // state for search term
  const [loading, setLoading] = useState(false); // state for loading
  const debouncedSearch = useDebounce(search, 500); // custom  hook to perform debouncing on input search
  let userToken = getItemFromLocalStorage("user")?.token;
  const dispatch = useDispatch();
  useEffect(() => {
    if (debouncedSearch) {
      fetchData();
    }
  }, [debouncedSearch]);

  async function fetchData() {
    setLoading(true);

    setRecipeList([]);

    const data = await fetch(
      `https://api.edamam.com/search?q=${debouncedSearch.trim()}&app_id=adff98de&app_key=${
        import.meta.env.VITE_RECIPE_KEY
      }`
    );
    const res = await data.json();

    setRecipeList(res.hits);
    setLoading(false);
  }
  const onSearchClick = (e) => {
    e.preventDefault();
    if (debouncedSearch) fetchData();
  };

  const sliceProduct = recipeList.slice(0, 9);
  const getIngredient = (id, ingredient) => {
    setIngredients({ id, ingredient });
    setShowModal(true);
  };

  const handleSaveRecipe = (item) => {
    if (userToken) {
      const savedRecipes = getItemFromLocalStorage("savedRecipes") || [];
      const recipeExists = savedRecipes.some(
        (recipe) => recipe.recipe.label === item.recipe.label
      );

      if (!recipeExists) {
        dispatch(saveRecipe(item));
        toast.success("Recipe saved successfully.");
      } else {
        toast.warning("Recipe already saved.");
      }
    } else {
      toast.warning("Please login to save recipes.");
    }
  };

  return (
    <div className="container mx-auto md:mt-5 lg:mt-20 product animate__animated animate__fadeInUp ">
      <div className="heading text-center py-6 mb-10 rounded-2xl bg-gradient-to-r from-green-400 via-green-200 to-green-500 font-bold ml-5 md:text-4xl text-lg shadow-2xl px-3 mx-5">
        <h1 className="mb-4 font-heading animate__animated animate__fadeInUp ">
          Explore Recipies
        </h1>

        {/* Search bar */}
        <form>
          <div className="  animate__animated animate__fadeInUp  flex  items-center py-2  max-w-2xl mx-auto justify-center bg-white rounded-full ">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              value={search}
              placeholder="Search Recipe, Ingredient, cuisine.."
              className="  rounded-3xl text-[18px] font-normal focus:outline-none active:outline-none flex-1 pl-5 "
            />
            <button
              type="submit"
              onClick={onSearchClick}
              className="hover:scale-110 transition-all"
            >
              <AiOutlineSearch className=" text-gray-400 mr-4 " size={25} />
            </button>
          </div>
        </form>
      </div>
      <div
        className={`   ${
          !search
            ? "grid grid-cols-1  md:grid-cols-2 mt-20 lg:grid-cols-3 justify-center items-center h-[70vh]"
            : "grid md:grid-cols-2 mt-20 lg:grid-cols-3 grid-cols-1 justify-center "
        }`}
      >
        {!search && (
          <>
            <div></div>
            <div className="flex justify-center items-center  ">
              <Lottie
                className=" "
                animationData={loader}
                loop={true}
                style={{ height: "400px" }}
              />
            </div>
          </>
        )}

        {search &&
          sliceProduct &&
          sliceProduct?.map((item, index) => (
            <div
              data-aos="fade-up"
              className="card md:w-[80%] w-[90%]   glass backdrop-blur-lg hover:drop-shadow-lg  mb-14 shadow-2xl  mx-auto"
              key={index}
            >
              <figure className="w-full mt-7">
                <img
                  loading="lazy"
                  src={item.recipe.image}
                  alt={item.recipe.label}
                  className="rounded-lg w-[80%] h-60 transition-all hover:scale-105 "
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title font-heading">{item.recipe.label}</h2>
                <div className="flex justify-between itemsrecipe.-center ">
                  <div className="my-5 text-text-uppercase ">
                    <p>
                      CuisineType:
                      <span className="badge badge-success  ml-2 ">
                        {item.recipe.cuisineType[0]}
                      </span>
                    </p>
                    <p>
                      Calories:
                      <span className="badge badge-success ml-2">
                        {item.recipe.calories.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className=" bg-gray-200 mt-4 transition-all hover:scale-125 rounded-3xl h-[50px] w-[50px] flex justify-center items-center">
                    <button
                      className="tooltip "
                      data-tip="Save Recipe"
                      onClick={() => handleSaveRecipe({ recipe: item.recipe })}
                    >
                      <AiFillHeart className=" text-red-600 " size={25} />
                    </button>
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-warning w-full text-xl capitalize hover:scale-110 transition-all rounded "
                    onClick={() => getIngredient(index, item.recipe)}
                  >
                    See Ingredient
                  </button>
                </div>
              </div>
            </div>
          ))}
        <Ingredient
          showModal={showModal}
          setShowModal={setShowModal}
          data={ingredients}
        />
      </div>
    </div>
  );
};

export default Products;
