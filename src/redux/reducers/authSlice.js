import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    user: null,
    role: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginU: (state, action) => { // Azione per il login
            state.isAuth = true;
            state.user = action.payload;
            state.role = action.payload.role; 
        },
        logoutU: (state) => { // Azione per il logout
            state.isAuth = false;
            state.user = null;
            state.role = "";
        },
    },
});

// Esporta le azioni e il reducer
export const { loginU, logoutU } = authSlice.actions;
export default authSlice.reducer;
