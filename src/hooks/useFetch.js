import { useState, useEffect } from "react";

import axios from "../utils/axios"

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [callback, setCallback] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios({
                    method: "get",
                    url: url,
                    withCredentials: true
                });
                setCallback(true)
                setData(data)
                setLoading(false)

            } catch (err) {
                // setError here
                setError(err);
                setLoading(false)
            }
        }

        fetchData();

    }, [url, callback]);

    const reFetch = async () => {
        setLoading(true);

        try {
            const { data } = await axios({
                method: "get",
                url: url
            });
            setData(data)


        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetch, setCallback };
}

export default useFetch;