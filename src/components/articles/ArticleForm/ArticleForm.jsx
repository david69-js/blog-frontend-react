import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import axios from 'axios';
import Etiquetas from './Etiquetas';
import Categorias from './Categorias';

const ArticleForm = () => {
    const navigate = useNavigate();
    const { id_articulo } = useParams();
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagenCover, setImagenCover] = useState('');
    const [estado, setEstado] = useState('borrador');
    const [selectedEtiquetaIds, setSelectedEtiquetaIds] = useState([]);
    const [selectedCategoriaIds, setSelectedCategoriaIds] = useState([]); 
    const [selectedEtiquetaNombres, setSelectedEtiquetaNombres] = useState([]); // Estado para nombres de etiquetas
    const [selectedCategoriaNombres, setSelectedCategoriaNombres] = useState([]); // Estado para nombres de categorías
    const token = localStorage.getItem('token');
    const id_usuario = JSON.parse(localStorage.getItem('usuario')).usuario.id_usuario;
    
    console.log(id_usuario)
    // Usar useFetch para obtener datos del artículo
    const { data: articleData, loading, error } = useFetch(
        id_articulo ? `http://localhost:4000/articulos/${id_articulo}` : null,
        token
    );

    useEffect(() => {
        if (articleData) {
            setTitulo(articleData.titulo);
            setContenido(articleData.contenido);
            setImagenCover(articleData.imagen_cover || '');
            setEstado(articleData.estado || 'borrador');

            // Suponiendo que articleData.etiquetas y articleData.categorias tienen la estructura que proporcionaste
            const etiquetasData = JSON.parse(articleData.etiquetas || '[]');
            setSelectedEtiquetaIds(etiquetasData.map(tag => tag.id_etiqueta));
            setSelectedEtiquetaNombres(etiquetasData.map(tag => tag.nombre_etiqueta));

            const categoriasData = JSON.parse(articleData.categorias || '[]');
            setSelectedCategoriaIds(categoriasData.map(cat => cat.id_categoria));
            setSelectedCategoriaNombres(categoriasData.map(cat => cat.nombre_categoria));
        }
    }, [articleData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const articleDataToSend = {
            id_usuario,
            titulo,
            contenido,
            imagen_cover: imagenCover,
            estado,
            etiquetas: selectedEtiquetaIds, // IDs de las etiquetas
            categorias: selectedCategoriaIds, // IDs de las categorías
        };

        try {
            const method = id_articulo ? 'PUT' : 'POST';
            const response = await axios({
                method,
                url: `http://localhost:4000/articulos${id_articulo ? `/${id_articulo}` : ''}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: articleDataToSend,
            });

            if (response.status === 200 || response.status === 201) {
                alert(id_articulo ? 'Artículo actualizado exitosamente' : 'Artículo creado exitosamente');
                navigate('/profile');
            } else {
                alert('Error al guardar el artículo');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div className="text-danger">Error al cargar el artículo: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="my-4">{id_articulo ? 'Editar Artículo' : 'Nuevo Artículo'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contenido</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen Cover</label>
                    <input
                        type="text"
                        className="form-control"
                        value={imagenCover}
                        onChange={(e) => setImagenCover(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                        className="form-control"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="borrador">Borrador</option>
                        <option value="publicado">Publicado</option>
                        <option value="pendiente">Pendiente</option>
                    </select>
                </div>

                </div>

               <div>
               <Etiquetas 
                    selectedIds={selectedEtiquetaIds} 
                    setSelectedIds={setSelectedEtiquetaIds} 
                    articleId={id_articulo} 
                />
                
                <Categorias 
                    selectedCaIds={selectedCategoriaIds} 
                    setSelecteCadIds={setSelectedCategoriaIds} 
                    token={token} 
                    articleId={id_articulo} 
                />
               </div>

                <button type="submit" className="btn btn-success">
                    {id_articulo ? 'Actualizar Artículo' : 'Crear Artículo'}
                </button>
            </form>
        </div>
    );
};

export default ArticleForm;
