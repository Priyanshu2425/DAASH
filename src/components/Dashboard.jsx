import {useState, useEffect} from 'react'
import Header from './Header'
import View from './View'
import DataView from './DataView'
import '../assets/dashboard.css'

export default function Dashboard(props){
    const [currDeviceDetails, setCurrDeviceDetails] = useState({
        currDevice: "Select a Device", deviceID: 1
    })

    const [tableHtml, setTableHTML] = useState();

    const [data, setData] = useState([]);

    function setDevice(obj){
        console.log('here')
        setCurrDeviceDetails(()=>({
            ...obj
        }))
    }
    
    const [graph, setGraph] = useState("LineChart");

    function handleGraphs(event){
        let graphNeeded = event.target.id
        setGraph(graphNeeded);
    }

    useEffect(()=>{

        const getdata = () => {
            fetch(`https://deadpool2411.pythonanywhere.com/api/get-device-data/`+currDeviceDetails.deviceID)
            .then((res)=>{
                    if(!res.ok){
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                }).then((datum)=>{

                    setData(datum)
                    if(datum){

                        const table = document.createElement('table');
            
                        const headerRow = table.insertRow();
                        Object.keys(datum[0]).forEach(key => {
                            const th = document.createElement('th');
                            th.textContent = key;
                            headerRow.appendChild(th);
                        });
                        
                        for (let i = datum.length - 1; i >= 0; i--) {
                            const data = datum[i];
                            const row = table.insertRow();
                            Object.values(data).forEach(value => {
                            const cell = row.insertCell();
                            cell.textContent = value;
                            });
                        }
                        setTableHTML(table.outerHTML);
                    }    
                })
        }  

        const adddata = () => {
            fetch(`https://deadpool2411.pythonanywhere.com/api/add-data/`+currDeviceDetails.deviceID)
            .then((res)=>{
                    if(!res.ok){
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                }).then((datum)=>{
                    console.log(datum);   
                })
        } 
        adddata();
        if(currDeviceDetails.deviceID >= 0)
            adddata();
            getdata();
            const intervalId = setInterval(getdata, 2000);
            const intervalId_2 = setInterval(adddata, 2000);
        
            return () => {
                clearInterval(intervalId)
                clearInterval(intervalId_2)
            };
        
    }, [currDeviceDetails])

    

    return (
        <>  
            <div className='grid-container'>
                <div className='item item-buttons-1'>
                    <Header logout={props.logout} />
                </div>
                <div className='item item-devices-2'>
                    <View setDevice={setDevice}/>
                </div>
                <div className='item item-deviceinfo-3'>
                    <p>{currDeviceDetails.currDevice}</p>
                </div>

                <div className='item item-graph-4'>
                    { currDeviceDetails.currDevice != "Select a device" && <h1>Device Data & Controls </h1>}

                    <div className='data-view'>
                    { currDeviceDetails.currDevice != "Select a device" && 
                
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
                            {`https://deadpool2411.pythonanywhere.com/api/add-data/${currDeviceDetails.deviceID}/<value>`}
                        </div>
                    </div>
                    <div>
                        <div className="data-table" dangerouslySetInnerHTML={{ __html: tableHtml }} />
                    </div>
                </div>
            </div>
            
            
        </>
    )
}