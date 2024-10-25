import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';

const Categorias = ({ selectedCaIds, setSelecteCadIds, articleId }) => {
    const token = localStorage.getItem('token');
    const [availableCategorias, setAvailableCategorias] = useState([]);
    const [newCategoriaName, setNewCategoriaName] = useState('');
    const [loadingCreation, setLoadingCreation] = useState(false);

    const { data, loading, error } = useFetch(
        articleId ? `http://localhost:4000/articulos/${articleId}` : null,
        token
    );

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:4000/categorias');
                setAvailableCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchCategorias();
    }, [newCategoriaName]);

    useEffect(() => {
        if (data && data.categorias) {
            const categorias = JSON.parse(data.categorias || '[]');
            setSelecteCadIds(categorias.map(cat => cat.id_categoria));
        }
    }, [data]);

    const handleSelectCategoria = (e, categoriaId) => {
        e.preventDefault();
        if (!selectedCaIds.includes(categoriaId)) {
            setSelecteCadIds([...selectedCaIds, categoriaId]);
        } else {
            setSelecteCadIds(selectedCaIds.filter(id => id !== categoriaId));
        }
    };

    const handleCreateCategoria = async (e) => {
        e.preventDefault();
        if (newCategoriaName.trim() === '') return;

        setLoadingCreation(true);
        try {
            const response = await axios.post('http://localhost:4000/categorias', {
                nombre_categoria: newCategoriaName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAvailableCategorias([...availableCategorias, response.data]);
            setNewCategoriaName('');
        } catch (error) {
            console.error('Error al crear la categoría:', error);
        } finally {
            setLoadingCreation(false);
        }
    };

    const renderAvailableCategorias = () => (
        <div>
            <h5>Seleccionar Categorías</h5>
            <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                {availableCategorias.map(categoria => (
                    <button 
                        key={categoria.id_categoria} 
                        className={`btn ${selectedCaIds.includes(categoria.id_categoria) ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={(e) => handleSelectCategoria(e, categoria.id_categoria)}
                    >
                        {categoria.nombre_categoria}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="mb-3">
            {loading && <p>Cargando categorías...</p>}
            {error && <p>Error al cargar categorías: {error.message}</p>}
            {!loading && !error && (
                <>
                    {renderAvailableCategorias()}
                    <div className="mt-3" style={{ width: '340px' }}>
                        <div className="input-group d-flex flex-nowrap" style={{ width: '100%' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nueva categoría"
                                value={newCategoriaName}
                                onChange={(e) => setNewCategoriaName(e.target.value)}
                                style={{ width: '100%' }} // Asegurarse de que el input ocupe todo el espacio disponible
                            />
                            <button className="btn btn-success" onClick={handleCreateCategoria} disabled={loadingCreation}>
                                {loadingCreation ? 'Creando...' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Categorias;
