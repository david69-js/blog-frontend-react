import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Etiquetas from './Etiquetas';
import Categorias from './Categorias';

const CreateForm = () => {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagenCover, setImagenCover] = useState('');
    const [estado, setEstado] = useState('borrador');
    const [selectedEtiquetaIds, setSelectedEtiquetaIds] = useState([]);
    const [selectedCategoriaIds, setSelectedCategoriaIds] = useState([]);
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario')).usuario;

    const handleSubmit = async (e) => {
        console.log(usuario.id_usuario);
        e.preventDefault();
        const articleData = {
            id_usuario: usuario.id_usuario,
            titulo,
            contenido,
            imagen_cover: imagenCover,
            estado,
            etiquetas: selectedEtiquetaIds, // IDs de etiquetas
            categorias: selectedCategoriaIds, // IDs de categorías
        };

        try {
            const response = await axios.post(
                'http://localhost:4000/articulos',
                articleData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert('Artículo creado exitosamente');
                navigate('/profile'); // Redirigir al perfil o a donde desees
            } else {
                alert('Error al crear el artículo');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al crear el artículo');
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Crear Nuevo Artículo</h1>
            <form onSubmit={handleSubmit}>
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

                <Etiquetas
                    selectedIds={selectedEtiquetaIds}
                    setSelectedIds={setSelectedEtiquetaIds}
                />

                <Categorias
                    selectedCaIds={selectedCategoriaIds}
                    setSelecteCadIds={setSelectedCategoriaIds}
                    token={token}
                />

                <button type="submit" className="btn btn-success">
                    Crear Artículo
                </button>
            </form>
        </div>
    );
};

export default CreateForm;
