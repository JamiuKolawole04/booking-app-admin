import { useState, useEffect } from "react";

import axios from "../utils/axios"

const useFetchHotels = () => {
    const [hotelData, setHotelData] = useState([]);
    const [loadingHotels, setLoadingHotels] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoadingHotels(true);
            try {
                const { data } = await axios({
                    method: "get",
                    url: "/hotels",
                    withCredentials: true
                });
                setHotelData(data)

            } catch (err) {
                // setError here
                setError(err)
            }
            setLoadingHotels(false)
        }

        fetchData();

    }, []);


    return { hotelData, loadingHotels, error };
}

export default useFetchHotels;