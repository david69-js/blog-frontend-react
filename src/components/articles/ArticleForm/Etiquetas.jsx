import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';

const Etiquetas = ({ selectedIds, setSelectedIds, articleId }) => {
    const token = localStorage.getItem('token');
    const [availableEtiquetas, setAvailableEtiquetas] = useState([]);
    const [newEtiquetaName, setNewEtiquetaName] = useState('');
    const [loadingCreation, setLoadingCreation] = useState(false);

    // Usar useFetch para obtener datos del artículo
    const { data, loading, error } = useFetch(
        articleId ? `http://localhost:4000/articulos/${articleId}` : null,
        token
    );

    // Obtener todas las etiquetas disponibles
    useEffect(() => {
        const fetchEtiquetas = async () => {
            try {
                const response = await axios.get('http://localhost:4000/etiquetas');
                setAvailableEtiquetas(response.data);
            } catch (error) {
                console.error('Error al obtener las etiquetas:', error);
            }
        };

        fetchEtiquetas();
    }, [newEtiquetaName]);

    // Obtener las etiquetas asignadas al artículo
    useEffect(() => {
        if (data && data.etiquetas) {
            const etiquetas = JSON.parse(data.etiquetas);
            setSelectedIds(etiquetas.map(tag => tag.id_etiqueta));
        }
    }, [data]);

    // Manejar la selección de etiquetas
    const handleSelectEtiqueta = (e, etiquetaId) => {
        e.preventDefault();
        if (!selectedIds.includes(etiquetaId)) {
            setSelectedIds([...selectedIds, etiquetaId]);
        } else {
            setSelectedIds(selectedIds.filter(id => id !== etiquetaId));
        }
    };

    // Manejar la creación de una nueva etiqueta
    const handleCreateEtiqueta = async (e) => {
        e.preventDefault();
        if (newEtiquetaName.trim() === '') return;

        setLoadingCreation(true);
        try {
            const response = await axios.post('http://localhost:4000/etiquetas', {
                nombre_etiqueta: newEtiquetaName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAvailableEtiquetas([...availableEtiquetas, response.data]);
            setNewEtiquetaName('');
        } catch (error) {
            console.error('Error al crear la etiqueta:', error);
        } finally {
            setLoadingCreation(false);
        }
    };

    // Etiquetas disponibles
    const renderAvailableEtiquetas = () => (
        <div>
            <h5>Seleccionar Etiquetas</h5>
            <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                {availableEtiquetas.map(etiqueta => (
                    <button 
                        key={etiqueta.id_etiqueta} 
                        className={`btn ${selectedIds.includes(etiqueta.id_etiqueta) ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={(e) => handleSelectEtiqueta(e, etiqueta.id_etiqueta)}
                    >
                        {etiqueta.nombre_etiqueta}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="mb-3">
            {loading && <p>Cargando etiquetas...</p>}
            {error && <p>Error al cargar etiquetas: {error.message}</p>}
            {!loading && !error && (
                <>
                    {renderAvailableEtiquetas()}
                    <div className="mt-3" style={{ width: '340px' }}>
                        <div className="input-group d-flex flex-nowrap" style={{ width: '100%' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nueva etiqueta"
                                value={newEtiquetaName}
                                onChange={(e) => setNewEtiquetaName(e.target.value)}
                                style={{ width: '100%' }} // Asegurarse de que el input ocupe todo el espacio disponible
                            />
                            <button className="btn btn-success" onClick={handleCreateEtiqueta} disabled={loadingCreation}>
                                {loadingCreation ? 'Creando...' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Etiquetas;
