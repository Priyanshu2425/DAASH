import { useState, useEffect } from 'react'
// import "../assets/view.css"

export default function View(props) {
  const [clicked, setClicked] = useState(false)
  const [deviceName, setDeviceName] = useState()
  function handleChange(event) {
    setDeviceName(event.target.value)
  }

  const [res, setRes] = useState([])
  const [display, setDisplay] = useState([])

  async function addDevice(event) {
    if (event) event.preventDefault()

    let response = await fetch('http://localhost:3000/devices/addDevice', {
      method: 'POST',
      headers: {
        'authorization': localStorage.getItem('auth_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: deviceName }),
    })

    let data = await response.json()

    if (response.status === 200) {
      setRes(data.message)
      getAllDevices()
      setTimeout(() => {
        setRes('')
      }, 1500)
    }
    console.log(data)
  }

  function handleClick(deviceId, deviceName) {
    props.setDevice({ id: deviceId, name: deviceName })
    // setClicked((prev
    closeMenu()
  }

  async function getAllDevices() {
    let response = await fetch('http://localhost:3000/devices', {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('auth_token'),
      },
    })

    let data = await response.json()

    let devices = data.devices.map((item) => {
      let deviceId = item.device_id
      let deviceName = item.device_name
      return (
        <div
          onClick={(event) => {
            handleClick(deviceId, deviceName)
          }}
          key={deviceId}
          id={deviceId}
          name={deviceName}
          className='deviceItems cursor-pointer bg-white p-2 rounded-xl text-center'
        >
          {deviceName}
        </div>
      )
    })
    setDisplay(devices)
  }

  function closeMenu() {
    setClicked((prev) => !prev)
  }
  useEffect(() => {
    getAllDevices()
  }, [])

  return (
    <>
      <div className=' w-max px-2 bg-[#f6f5f7]  h-1/3  flex flex-col gap-4 items-start  '>
        {clicked ? (
          <button onClick={closeMenu}>Close</button>
        ) : (
          <button onClick={closeMenu}>Menu</button>
        )}
        {clicked ? (
          <>
            <div className='add-device-form'>
              <form onSubmit={addDevice}>
                <input
                  className='inputField device-input w-[80%]'
                  type='text'
                  placeholder='Name of device'
                  onChange={handleChange}
                />
                <button className='btn view-btn'>Add Device</button>
              </form>
            </div>

            <div className='h-96 overflow-y-scroll scrollbar-hide'>
              <div className='flex flex-col gap-2 w-max '>{display}</div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
