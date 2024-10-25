// src/pages/ArticlePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; // Importa el hook
import axios from 'axios'; // Importa Axios

const ArticlePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const usuarioId = JSON.parse(localStorage.getItem('usuario')).usuario;

    // Llamada a la API para obtener los artículos del usuario
    const { data: articulos, loading: loadingArticulos, error: errorArticulos } = useFetch(
        `http://localhost:4000/articulos/usuario/${usuarioId.id_usuario}`,
        token
    );

    // Función para eliminar un artículo
    const handleDelete = async (id_articulo) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
            try {
                await axios.delete(`http://localhost:4000/articulos/${id_articulo}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('Artículo eliminado exitosamente');
                window.location.reload(); // Recargar la página para ver la lista actualizada
            } catch (error) {
                console.error('Error al eliminar el artículo:', error);
                alert('Ocurrió un error al eliminar el artículo');
            }
        }
    };

    if (loadingArticulos) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga
    }

    if (errorArticulos) {
        return (
            <div>
                <h1 className="text-warning">{errorArticulos}</h1>
                <button 
                className="btn btn-success mt-4"
                onClick={() => navigate('/articulos/nuevo')}
            >
                Nuevo Artículo
            </button>

            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="my-4">Mis Artículos</h1>
            {articulos && articulos.length > 0 ? (
                <ul>
                    {articulos.map((articulo) => (
                        <li key={articulo.id_articulo}>
                            <h3>{articulo.titulo}</h3>
                            <p>{articulo.contenido.substring(0, 100)}...</p>
                            <small>Creado el: {new Date(articulo.fecha_creacion).toLocaleDateString()}</small>
                            <button 
                                className="btn btn-primary mx-2"
                                onClick={() => navigate(`/articulos/editar/${articulo.id_articulo}`)} // Correcto aquí
                            >
                                Editar
                            </button>
                            <button 
                                className="btn btn-danger"
                                onClick={() => handleDelete(articulo.id_articulo)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron artículos.</p>
            )}
            <button 
                className="btn btn-success mt-4"
                onClick={() => navigate('/articulos/crear')}
            >
                Nuevo Artículo
            </button>
        </div>
    );
};

export default ArticlePage;
