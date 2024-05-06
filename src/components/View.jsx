import {useState, useEffect} from 'react'
import "../assets/view.css"

export default function View(props){

    const [deviceName, setDeviceName] = useState();
    function handleChange(event){
        setDeviceName(event.target.value);
    }

    const [res, setRes] = useState([]);
    const [display, setDisplay] = useState([]);

    async function addDevice(event){
        if(event) event.preventDefault()

        let response = await fetch('http://localhost:3000/devices/addDevice',{
            method: "POST",
            headers: {
                'authorization': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({name: deviceName})
        })

        let data = await response.json();

        if(response.status === 200){
            setRes(data.message);
            getAllDevices();
            setTimeout(()=>{
                setRes("");
            }, 1500);

        }
        console.log(data);
    }

    function handleClick(deviceId, deviceName){
        props.setDevice({id: deviceId, name: deviceName})
    }


    async function getAllDevices(){
        let response = await fetch('http://localhost:3000/devices', {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('auth_token')
            }
        });

        let data = await response.json();

        let devices = data.devices.map((item)=>{
            let deviceId = item.device_id;
            let deviceName = item.device_name;
            return <div onClick={(event)=>handleClick(deviceId, deviceName)} key={deviceId} id={deviceId} name={deviceName} className="deviceItems">{deviceName}</div>
        })
        setDisplay(devices);
    }

    function closeMenu(){
        let deviceView = document.getElementById("deviceView");
        deviceView.style.display = 'none';
    }
    useEffect(()=>{
        getAllDevices();
    }, [])

    return (
        <>     
            <div id="mainDevices">
                <button onClick={closeMenu}>Close</button>
                <div className='add-device-form'>
                    <form onSubmit={addDevice}>
                        <input className="inputField device-input" type='text' placeholder="Name of device" onChange={handleChange}/>
                        <button className="btn view-btn">Add Device</button>
                    </form>
                </div>
                
                <div className='scroll-parent' >
                    <div className="deviceContainer">
                        {display}
                    </div>
                </div>
                
            </div>
        </>
    )
}