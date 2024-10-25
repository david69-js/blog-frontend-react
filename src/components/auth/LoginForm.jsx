// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { loginUser } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice'; // Importa la acción para establecer el usuario
import { useNavigate } from 'react-router-dom'; // Para redirigir después de iniciar sesión

const LoginForm = () => {
    const [login, setLogin] = useState(''); // Cambié el nombre de la variable a "login" para mayor claridad
    const [contrasenia, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Inicializa el hook de navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser({ login, contrasenia });
            // Almacena el token y la información del usuario en el almacenamiento local
            localStorage.setItem('token', response.token);
            localStorage.setItem('usuario', JSON.stringify(response.usuario));

            // Almacena el usuario en el estado global (Redux)
            dispatch(setUser(response));

           
            navigate('/profile'); // Cambia a la ruta que desees
        } catch (err) {
            // Manejo de errores
            if (err.response) {
                setError(err.response.data.mensaje || 'Error desconocido');
            } else {
                setError('Error de conexión');
            }
        }
    };

    return (
        <div className="container mt-5 w-full">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <h2 className="mb-3">Iniciar sesión</h2>
                <div className="mb-3">
                    <input
                        type="text" // Cambié a "text" para permitir el uso de nickname
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="form-control"
                        placeholder="Correo o Nickname"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        value={contrasenia}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                {error && <div className="text-danger mt-2">{error}</div>} {/* Mostrar el error aquí */}
            </form>
        </div>
    );
};

export default LoginForm;
