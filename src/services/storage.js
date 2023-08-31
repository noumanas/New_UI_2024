
const setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

const getItemToLocalStorage = (key) => {
    return localStorage.getItem(key);
}

const remveItemToLocalStorage = (key) => {
    return localStorage.removeItem(key);
}

const clearStorage = () => {
    localStorage.clear();
}

export {
    setItemToLocalStorage,
    getItemToLocalStorage,
    remveItemToLocalStorage,
    clearStorage
}