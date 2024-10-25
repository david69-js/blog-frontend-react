// src/components/ArticleItem.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'; // Asegúrate de que el hook esté en la ruta correcta

const ArticleItem = () => {
    const { id_articulo } = useParams(); // Obtener id_articulo desde la URL
    const token = localStorage.getItem('token');

    // Usar useFetch para obtener datos del artículo
    const { data: articleData, loading, error } = useFetch(
        id_articulo ? `http://localhost:4000/articulos/${id_articulo}` : null,
        token
    );

    // Manejo de errores
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Asegurarse de que articleData tenga un valor antes de intentar renderizar
    if (!articleData) return null;

    const articulo = articleData; // Suponiendo que el artículo es el objeto devuelto
    const etiquetas = JSON.parse(articulo.etiquetas);
    const categorias = JSON.parse(articulo.categorias);

    return (
        <div className="container mt-5">
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
                    <p className="card-text">{articulo.contenido}</p>
                    <p className="card-text">
                        <strong>Autor:</strong> {articulo.nombre}
                    </p>
                    <p className="card-text">
                        <strong>Fecha de publicación:</strong> {new Date(articulo.fecha_publicacion).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                        <strong>Estado:</strong> {articulo.estado}
                    </p>
                    {articulo.nombre_categoria && (
                        <p className="card-text">
                            <strong>Categoría:</strong> {articulo.nombre_categoria}
                        </p>
                    )}
                    <div>
                        <div className="form-group p-2">
                            <h3>Mis etiquetas</h3>
                        {etiquetas?.map(etiqueta => (
                                <button 
                                    key={etiqueta.id_etiqueta} 
                                    className={`btn btn-primary mr-1`}
                                >
                                    {etiqueta.nombre_etiqueta}
                                </button>
                            ))}
                        </div>
                        <div className="form-grup p-2">
                        <h3>Mis Categorias</h3>
                            {categorias?.map(categoria => (
                                <button 
                                key={categoria.id_categoria} 
                                className={`btn btn-primary`}
                                >
                                    {categoria.nombre_categoria}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleItem;
