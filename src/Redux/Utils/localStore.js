// import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const localStoreUtil = {
  storeData: async (key, data) => {
    await storage.setItem(key, JSON.stringify(data));
    return true;
  },
  getData: async (key) => {
    const item = await storage.getItem(key);
    if (!item || item === undefined) return;

    return JSON.parse(item);
  },

  removeData: async key => {
    await storage.removeItem(key);
    return true;
  },
  removeAll: async () => {
    await storage.clear();
    return true;
  },
};

export const saveAccessToken = accessToken =>
  localStoreUtil.storeData('accessToken', accessToken);
export const saveRefreshToken = refreshToken =>
  localStoreUtil.storeData('refreshToken', refreshToken);
// export const getAccessToken = () => localStorage.getItem('accessToken');
export const getAccessToken = () => localStoreUtil.getData('accessToken');
export const saveUser = user => localStoreUtil.storeData('user', user);
export const getUser = () => localStoreUtil.storeData('user');

export const saveSessionData = () =>
  localStoreUtil.storeData('saveSessionData', true);
export const getSessionData = () => localStoreUtil.getData('saveSessionData');


export default localStoreUtil;