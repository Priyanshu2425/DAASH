import { useState, useEffect } from 'react'

export default function useGetDevices(){

    const [ loading, setLoading ] = useState(true);
    const [ devices, setDevices ] = useState([]);

    async function getAllDevices() {
        let response = await fetch('http://localhost:3000/devices', {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('auth_token'),
            },
        })

        let data = await response.json()
        setDevices(data.devices);
        setLoading(false)
    }

    useEffect(()=>{
        getAllDevices();
    }, [])

    return { loading, devices }

}