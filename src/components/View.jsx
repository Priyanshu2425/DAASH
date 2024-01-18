import {useState, useEffect} from 'react'
import "../assets/view.css"

export default function View(props){

    const [deviceName, setDeviceName] = useState({
        deviceName: ""
    });

    const [res, setRes] = useState([]);
    const [display, setDisplay] = useState([]);
    let displayRes = [];

    function handleChange(event){
        const name = event.target.value;
        setDeviceName(prevData=>(
            {
                ...prevData,
                deviceName: name
            }
        ))
    }

    function addDevice(event){
        if(event) event.preventDefault()

        fetch('https://deadpool2411.pythonanywhere.com/api/add-device',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(deviceName)
        }).then((res) => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        }).then((data) => {
            if(data[0].devices){
                setRes(data[0].devices);
            }
            else setRes(data[0].failure)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    function handleClick(event){
        let deviceID = event.target.id;
        let deviceName;
        let id;
        for(let i = 0; i < res.length; i++){
            for (let j in res[i]){
                if(res[i][j] == deviceID){
                    deviceName = j;
                    id = res[i][j];
                } 
            }
        }

        let device = {
            currDevice: deviceName,
            deviceID: id
        }

        console.log(device, res)
        props.setDevice(device);
    }

    useEffect(()=>{
    
        fetch('https://deadpool2411.pythonanywhere.com/api/get-devices')
        .then((res) => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        }).then((data) => {
            if(data[0].devices){
                setRes(()=>data[0].devices);
                // setDeviceName("");
            }
            else setRes(data[0].failure)
            // console.log(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });

    }, [])

    useEffect(()=>{
        let displayRes = [];
        for(let i = 0; i < res.length; i++){
            for (let j in res[i]){
                displayRes.push(<div onClick={handleClick} id={res[i][j]} className="deviceItems">{j}</div>);
            }
        }
        setDisplay(displayRes);
    }, [res])

    return (
        <>     
            <div>
                <div className='add-device-form'>
                    <form onSubmit={addDevice}>
                        <input className="inputField device-input" type='text' placeholder="Name of device"  value={deviceName.deviceName} onChange={handleChange}/>
                        <button className="btn view-btn">Add Device</button>
                    </form>
                </div>
                
                <div className='scroll-parent'>
                    <div className="deviceContainer">
                        {display}
                    </div>
                </div>
                
            </div>
        </>
    )
}