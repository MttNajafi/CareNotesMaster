import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import categoriesReducer, {setCategories} from './slices/categorySlice';
import clientsReducer, {setClients} from './slices/clientSlice';
import notesReducer from './slices/noteSlice';

import categoriesData from '../assets/data/categories.json';
import clientsData from '../assets/data/clients.json';

interface RootState {
  categories: ReturnType<typeof categoriesReducer>;
  clients: ReturnType<typeof clientsReducer>;
  notes: ReturnType<typeof notesReducer>;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['notes'],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  clients: clientsReducer,
  notes: notesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {ignoredActions: ['persist/PERSIST']},
    }),
});

const persistor = persistStore(store);

store.dispatch(setCategories(categoriesData));
store.dispatch(setClients(clientsData));

export {store, persistor, RootState};
