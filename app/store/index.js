import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(logger));
export const persistor = persistStore(store);
