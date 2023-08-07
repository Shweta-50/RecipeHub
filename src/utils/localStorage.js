const getItemFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error while getting item from localStorage:", error);
    return null;
  }
};

const setItemInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error while setting item in localStorage:", error);
  }
};

const removeItemFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error while removing item from localStorage:", error);
  }
};

export {
  getItemFromLocalStorage,
  setItemInLocalStorage,
  removeItemFromLocalStorage,
};
