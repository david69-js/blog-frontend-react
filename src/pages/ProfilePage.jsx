// src/pages/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch'; // Importa el hook
import UserProfile from '../components/User/UserProfile';
import { setUser } from '../redux/slices/userSlice';

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    // Llamada a la API para obtener el perfil del usuario
    const { data: usuario, loading: loadingUsuario, error: errorUsuario } = useFetch('http://localhost:4000/profile', token);

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        } else if (usuario) {
            dispatch(setUser(usuario));
            localStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar en localStorage
        }
    }, [navigate, token, usuario, dispatch]);
    
    return (
        <div className="container">
            <h1 className="my-4">Perfil del Usuario</h1>
            {loadingUsuario && <p>Loading...</p>}
            {errorUsuario && <p>Error: {errorUsuario.message}</p>}
            {usuario && <UserProfile user={usuario.usuario} />}

            <button 
                className="btn btn-success mt-4"
                onClick={() => navigate('/articulos/nuevo')}
            >
                Nuevo Artículo
            </button>
        </div>
    );
};

export default ProfilePage;
