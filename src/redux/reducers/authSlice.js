import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginU: (state, action) => { // Azione per il login
            state.isAuth = true;
            state.user = action.payload;
        },
        logoutU: (state) => { // Azione per il logout
            state.isAuth = false;
            state.user = null;
        },
    },
});

// Esporta le azioni e il reducer
export const { loginU, logoutU } = authSlice.actions;
export default authSlice.reducer;
