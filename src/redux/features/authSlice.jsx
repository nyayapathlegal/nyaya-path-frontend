import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    email: null,
    fullName: null,
    role: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, username, email, fullName, role } = action.payload || {};
            state.id = id || null;
            state.username = username || null;
            state.email = email || null;
            state.fullName = fullName || null;
            state.role = role || null;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.fullName = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
