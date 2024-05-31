import { useState, useEffect } from 'react'

export default function useGetDeviceData(deviceId){
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Not");
    const [deviceData, setDeviceData] = useState([]);

    async function getData() {
        let response = await fetch(
        `https://daash-express-backend.vercel.app/devices/data/${deviceId}`
        )

        let data = await response.json()
        if (response.status === 200) setDeviceData(data.data);
        else{
            console.log('Error fetching data in getDeviceData.js/useGetDeviceData hook');
            setDeviceData("Error fetching data");
        }

        setLoading(false);
    }

    useEffect(()=>{
        getData();
    }, [])

    return {loading, message, deviceData}
}