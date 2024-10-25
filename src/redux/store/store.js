// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice.js'; // Importa el reducer de userSlice

const store = configureStore({
    reducer: {
        user: userReducer, // Añade el reducer de user
        // otros reducers si los tienes
    },
});

export default store;
