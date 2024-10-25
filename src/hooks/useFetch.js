import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, token = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const config = {};
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`
                    };
                }
                
                const response = await axios.get(url, config);
                setData(response.data); // Suponiendo que la respuesta es un objeto con los datos
            } catch (err) {
                setError(err.response?.data?.mensaje || 'Error al obtener datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, token]);

    return { data, loading, error };
};

export default useFetch;
