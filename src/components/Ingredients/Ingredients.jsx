const Ingredient = ({ showModal, setShowModal, data }) => {
  let { ingredient } = data;
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto max-w-3xl w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="w-full p-6 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 ">
                  <div>
                    <img
                      src={ingredient.image}
                      className=" object-fit-cover aspect-video  rounded-lg"
                    />
                    <div className="py-2 ">
                      <p className="font-semibold">
                        Total Calories 👉
                        <span className="badge bg-green-500 mx-2 ">
                          {Math.floor(ingredient?.calories)}
                        </span>
                      </p>
                      <div className="font-semibold   mb-2 text-sm ">
                        <p>
                          Cuisine Type 👉
                          <span className="badge bg-green-500 mx-2 my-3 ">
                            {ingredient?.cuisineType}
                          </span>
                        </p>
                        <p>
                          Meal Type 👉
                          <span className="badge bg-green-500 mx-2 ">
                            {ingredient?.mealType}
                          </span>
                        </p>
                      </div>
                      <a
                        href={ingredient?.url}
                        target="_blank"
                        className="text-blue-500 font-semibold my-2"
                      >
                        Source : {ingredient?.source}
                      </a>
                    </div>
                  </div>
                  {/* Content */}
                  <div>
                    <div>
                      <h3 className="text-2xl   font-semibold">
                        {ingredient.label}
                      </h3>
                      <div>
                        <div className="">
                          <p className="badge  badge-warning font-semibold my-2">
                            Total Ingredients :{" "}
                            {ingredient?.ingredients?.length}
                          </p>
                          <div className="flex flex-col gap-2">
                            {ingredient?.ingredientLines.map((item, id) => (
                              <span className="rounded-lg text-sm text-gray-500 ">
                                🍴 {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6  rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold  px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <a
                    className="bg-green-500 text-white  font-bold  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    href={ingredient?.url}
                    target="_blank"
                    onClick={() => setShowModal(false)}
                  >
                    See Full Instructions
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Ingredient;
