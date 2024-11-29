import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from '../reducers/authSlice'; 
import userAuthReducer from '../reducers/userAuthSlice';

// Configurazione per la persistenza
const persistConfig = {
    key: 'root',
    storage,
};

// Combina tutti i reducer in un unico rootReducer
const rootReducer = combineReducers({
    auth: authReducer,          // Reducer generale
    userAuth: userAuthReducer,  // Reducer per l'autenticazione utente
});

// Crea un reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crea lo store con il reducer persistente
const store = configureStore({
    reducer: persistedReducer,
});

// Crea il persistor per gestire la persistenza
const persistor = persistStore(store);

export { store, persistor };
