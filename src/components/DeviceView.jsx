import { useEffect } from 'react'
import DataView from './Graph'
import useGetDevices from '../hooks/getAllDevices'

export default function DeviceView(){
    
    const {loading, devices} = useGetDevices();
    
    let cardDisplay = <div></div>;

    if(!loading){
        cardDisplay = devices.map((item, index)=>{
            return (
                <div key={index}>
                    <h3>{item.device_name}</h3>
                    <DataView/>
                </div>
            )
        })
    }

    useEffect(()=>{
        console.log(devices);
    })

    if(loading){
        return <>
            Loading....
        </>
    }

    return (
        <>
            <div className='w-full grid-cols-3'>
                {cardDisplay}
            </div>
        </>
    )
}