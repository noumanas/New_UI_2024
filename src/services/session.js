import AuthEnum from "../enums/auth.enum";
import {
    clearStorage,
    getItemToLocalStorage,
    remveItemToLocalStorage,
    setItemToLocalStorage
} from "./storage"; 

const createNewSession = (item) => {
    setItemToLocalStorage(AuthEnum.TOKEN, item)
}

const getItemFromCurrentSession = (key) => {
    return getItemToLocalStorage(key);
}

const removeItemFromCurrentSession = (key) => {
    remveItemToLocalStorage(key);
}

const finishSession = () => {
    clearStorage();
}

const removeSessionOnBrowserClosed = () => {
    window.addEventListener('beforeunload', function () {
        clearStorage();
        window.removeEventListener('beforeunload');
    })
}

export {
    createNewSession,
    getItemFromCurrentSession,
    removeItemFromCurrentSession,
    removeSessionOnBrowserClosed,
    finishSession
}