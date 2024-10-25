import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import useFetch from '../hooks/useFetch'; // Si tienes un hook de uso personalizado

const Home = () => {
    const [articulos, setArticulos] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    // Usando useFetch o fetch directamente
    const { data, loading, error } = useFetch('http://localhost:4000/articulos', token); // Asegúrate de que la URL sea correcta

    useEffect(() => {
        if (data) {
            setArticulos(data);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleViewDetails = (id_articulo) => {
        // Navega a la página de detalles del artículo
        navigate(`/articulos/ver/${id_articulo}`); // Ajusta la ruta según tu configuración
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Artículos</h1>
            {articulos.length === 0 ? (
                <p>No hay artículos disponibles.</p>
            ) : (
                <div className="row">
                    {articulos.map((articulo) => (
                        <div key={articulo.id_articulo} className="col-md-4 mb-4">
                            <div className="card">
                                {articulo.imagen_cover && (
                                    <img 
                                        src={articulo.imagen_cover} 
                                        alt={articulo.titulo} 
                                        className="card-img-top" 
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{articulo.titulo}</h5>
                                    <p className="card-text">{articulo.contenido.substring(0, 100)}...</p>
                                    <p className="card-text">
                                        <strong>Autor:</strong> {articulo.nombre_usuario}
                                    </p>
                                    <p className="card-text">
                                        <strong>Fecha de publicación:</strong> {new Date(articulo.fecha_publicacion).toLocaleDateString()}
                                    </p>
                                    <p className="card-text">
                                        <strong>Estado:</strong> {articulo.estado}
                                    </p>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => handleViewDetails(articulo.id_articulo)}
                                    >
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
