import { useState, useEffect } from "react";

import axios from "../utils/axios"

const useFetchUsers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios({
                    method: "get",
                    url: "/users",
                    withCredentials: true
                });
                setData(data)

            } catch (err) {
                // setError here
                setError(err)
            }
            setLoading(false)
        }

        fetchData();

    }, []);


    return { data, loading, error };
}

export default useFetchUsers;