import { useState, useEffect } from 'react'
import View from './View'
import DataView from './DataView'
import Navbar from './Navbar'
// import '../assets/dashboard.css'

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
    <div className='flex flex-col gap-4'>
      <Navbar />
      {/* <div> */}
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 '>
        <View setDevice={setCurrDeviceDetails} />
        {/* </div> */}
        <div className='flex flex-col gap-4 px-2'>
          <div className='deviceDetails'>
            <p className='flex gap-2 text-nowrap'>
              Device Status:{' '}
              {currDeviceDetails.id ? (
                <p className='text-green-500'>Connected</p>
              ) : (
                <p className='text-red-500'>Disconnected</p>
              )}
            </p>
            <br />
            <br />
            Connection Link: <br /> <br />
            <div>
              {/* <p>{`http://localhost:3000/devices/addData/${currDeviceDetails.id}/<value>`}</p> */}
              <button
                className='px-4 py-2 bg-[#FF4B2B] text-white rounded-2xl text-nowrap'
                onClick={handleClick}
              >
                {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
          {currDeviceDetails.id && (
            <div className='flex flex-col gap-4 justify-start overflow-x-scroll scrollbar-hide'>
              <div className='graph-buttons flex w-max gap-4  '>
                <div
                  id='LineChart'
                  className='cursor-pointer px-4 py-2 border-[1px] border-gray-400 rounded-xl hover:bg-[#FF4B2B] hover:text-white'
                  onClick={handleGraphs}
                >
                  Line Chart
                </div>
                <div
                  id='BarChart'
                  className='cursor-pointer px-4 py-2 border-[1px] border-gray-400 rounded-xl hover:bg-[#FF4B2B] hover:text-white'
                  onClick={handleGraphs}
                >
                  Bar Chart
                </div>
              </div>
              <DataView
                graphNeeded={graph}
                dataNeeded={data}
              />
            </div>
          )}
        </div>
      </div>

      {/* <div className='grid-container'>
        <div className='item item-buttons-1'>
          <Header />
        </div>
        <div className='item item-devices-2'></div>
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
      </div> */}
    </div>
  )
}
