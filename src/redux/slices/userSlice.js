import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado inicial de localStorage
const initialState = {
    usuario: localStorage.getItem('usuario') 
        ? JSON.parse(localStorage.getItem('usuario'))
        : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.usuario = action.payload; // Guardar en el estado de Redux
            localStorage.setItem('usuario', JSON.stringify(action.payload)); // Guardar en localStorage
        },
        clearUser: (state) => {
            state.usuario = null; // Limpiar el estado de Redux
            localStorage.removeItem('usuario'); // Remover de localStorage
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
