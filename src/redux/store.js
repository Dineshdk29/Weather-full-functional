import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import { rootPersistConfig, reducers } from './rootReducer';


const store = configureStore({
  reducer: persistReducer(rootPersistConfig, reducers),
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
