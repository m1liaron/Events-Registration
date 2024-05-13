import {useEffect, useState} from 'react';
import axios from "axios";

const UseAxios = (url, options) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);

    const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios(url, options);
                setData(response.data);
            } catch (error) {
                setError(error.message)
                console.error(error.message);
            } finally {
                setLoading(false)
            }
        };

    useEffect(() => {
        fetchData()
    }, []);

    return { data, loading, error, fetchData };
};

export default UseAxios;