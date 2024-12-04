// redux/userAuthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthUser: false, // Stato per gestire l'autenticazione dell'utente
    userDetails: null, // Puoi memorizzare dettagli dell'utente qui
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        // Azione per il login dell'utente
        loginUser: (state, action) => {
            state.isAuthUser = true; // Imposta l'autenticazione a true
            state.userDetails = action.payload; // Salva le informazioni dell'utente
        },
        logoutUser: (state) => {
            // Azione per il logout dell'utente
            state.isAuthUser = false; // Imposta l'autenticazione a false
            state.userDetails = null; // Rimuove le informazioni dell'utente
        },
    },
});

// Esporta le azioni e il reducer
export const { loginUser, logoutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
