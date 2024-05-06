import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import View from './View'
import DataView from './DataView'
import '../assets/dashboard.css'

export default function Dashboard(){
    const navigate = useNavigate();

    const [currDeviceDetails, setCurrDeviceDetails] = useState({
        name: "Select a device",
        id: null
    });
       
    const [graph, setGraph] = useState("LineChart");

    function handleGraphs(event){
        let graphNeeded = event.target.id
        setGraph(graphNeeded);
    }

    const [data, setData] = useState();
    async function getData(){
        let response = await fetch(`http://localhost:3000/devices/data/${currDeviceDetails.id}`);
        let data = await response.json();
        if(response.status === 200){
            setData(data.data);
        }
    }

    function handleLogout(event){
        event.preventDefault();
        localStorage.removeItem('auth_token');
        navigate('/');
    }

    function openMenu(){
        let deviceView = document.getElementById('deviceView');
        deviceView.style.display = "block";
    }
    useEffect(()=>{
        getData();
        // let interval = setInterval(()=>{
        //     getData();
        // }, 1000);
        
        // return ()=>{
        //     clearInterval(interval);
        // }
        
    }, [currDeviceDetails]);

    
    if(!localStorage.getItem('auth_token')){
        return <h1>User not logged in</h1>
    }

    return (
        <>  
            <div id='header'> 
                <div className='oxanium-600'>
                    DAASH
                </div>
                <div>
                    <button id="logoutBtn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div>
                <button onClick={openMenu}>MENU</button>
            </div>
            <div id="deviceView">
                <View setDevice={setCurrDeviceDetails}/>
            </div>
            <div id="main">
                
                <div >

                    <div className='deviceDetails'>

                        <p>
                            Device Status: {currDeviceDetails.id ? <p>Connected</p> : <p>Disconnected</p>}
                        </p>
                        <br/>
                        <br/>
                        Connection Link: <br/> <br/>
                        <p>
                            {`http://localhost:3000/devices/addData/${currDeviceDetails.id}/<value>`}
                        </p>
                    </div>

                    { currDeviceDetails.id && 
                
                        <div className="data-view-component">
                            <div className='graph-buttons'>
                                <div id="LineChart" onClick={handleGraphs} > Line Chart</div>
                                <div id="BarChart" onClick={handleGraphs}> Bar Chart </div>
                            </div>
                            <DataView graphNeeded={graph} dataNeeded={data}/>
                        </div>

                        }

                        
                    </div>
            </div>

            {/* <div className='grid-container'>
                <div className='item item-buttons-1'>
                    <Header/>
                </div>
                <div className='item item-devices-2'>
                    
                </div>
                <div className='item item-deviceinfo-3'>
                    <p>{currDeviceDetails.name}</p>
                </div>

                <div className='item item-graph-4'>
                    { currDeviceDetails.id && <h1>Device Data & Controls </h1>}

                    <div className='data-view'>
                    { currDeviceDetails.id && 
                
                        <div className="data-view-component">
                            <div className='graph-buttons'>
                                <div id="LineChart" onClick={handleGraphs} > Line Chart</div>
                                <div id="BarChart" onClick={handleGraphs}> Bar Chart </div>
                            </div>
                            <DataView graphNeeded={graph} dataNeeded={data}/>
                        </div>

                        }

                        <div className='deviceDetails'>
                            Device Status: Connected
                            <br/>
                            <br/>
                            Connection Link: <br/> <br/>
                            {`http://localhost:3000/devices/addData/${currDeviceDetails.id}/<value>`}
                        </div>
                    </div>
                    
                </div>
            </div> */}
            
            
        </>
    )
}