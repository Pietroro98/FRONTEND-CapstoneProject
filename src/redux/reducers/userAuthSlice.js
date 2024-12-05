import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthUser: false,
    userDetails: null,
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        // Azione per il login dell'utente
        loginUser: (state, action) => {
            state.isAuthUser = true;
            state.userDetails = action.payload;
        },
        logoutUser: (state) => {
            // Azione per il logout dell'utente
            state.isAuthUser = false;
            state.userDetails = null;
        },
    },
});

// Esporta le azioni e il reducer
export const { loginUser, logoutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
