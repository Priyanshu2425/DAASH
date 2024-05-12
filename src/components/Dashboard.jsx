import { useState, useEffect } from 'react'
import View from './View'
import DataView from './Graph'
import Navbar from './Navbar'
import '../assets/dashboard.css'
import Header from '../components/Header'

export default function Dashboard() {
  const [copied, setCopied] = useState(false)
  //   const [btnClicked , setbtnClicked] = useState('')
  const [currDeviceDetails, setCurrDeviceDetails] = useState({
    name: 'Select a device',
    id: null,
  })

  const [graph, setGraph] = useState('LineChart')

  function handleGraphs(event) {
    let graphNeeded = event.target.id
    setGraph(graphNeeded)
  }

  const [data, setData] = useState()
  async function getData() {
    let response = await fetch(
      `http://localhost:3000/devices/data/${currDeviceDetails.id}`
    )
    let data = await response.json()
    if (response.status === 200) {
      setData(data.data)
    }
  }

  const handleClick = () => {
    const linkText = `http://localhost:3000/devices/addData/${currDeviceDetails.id}/<value>`
    navigator.clipboard
      .writeText(linkText)
      .then(() => setCopied(true))
      .catch((err) => console.error('Failed to copy:', err))

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  useEffect(() => {
    getData()
    // let interval = setInterval(()=>{
    //     getData();
    // }, 1000);

    // return ()=>{
    //     clearInterval(interval);
    // }
  }, [currDeviceDetails])

  if (!localStorage.getItem('auth_token')) {
    return <h1>User not logged in</h1>
  }

  return (
    

      <div className='grid-container'>
        <div className='item item-buttons-1'>
          <Header />
        </div>
        <div className='item item-devices-2'>
          <View/>
        </div>
        <div className='item item-deviceinfo-3'>
          <p>{currDeviceDetails.name}</p>
        </div>

        <div className='item item-graph-4'>
          {currDeviceDetails.id && <h1>Device Data & Controls </h1>}

          <div className='data-view'>
            {currDeviceDetails.id && (
              <div className='data-view-component'>
                <div className='graph-buttons'>
                  <div
                    id='LineChart'
                    onClick={handleGraphs}
                  >
                    {' '}
                    Line Chart
                  </div>
                  <div
                    id='BarChart'
                    onClick={handleGraphs}
                  >
                    {' '}
                    Bar Chart{' '}
                  </div>
                </div>
                <DataView
                  graphNeeded={graph}
                  dataNeeded={data}
                />
              </div>
            )}

            <div className='deviceDetails'>
              Device Status: Connected
              <br />
              <br />
              Connection Link: <br /> <br />
              {`http://localhost:3000/devices/addData/${currDeviceDetails.id}/<value>`}
            </div>
          </div>
        </div>
      </div>
    
  )
}
