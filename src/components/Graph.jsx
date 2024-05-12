import { useState, useEffect } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { LineChart, Line } from 'recharts'
import { BarChart, Bar, Rectangle } from 'recharts'
import { ScatterChart, Scatter } from 'recharts'
import useGetDeviceData from '../hooks/getDeviceData'

export default function DataView(props) {

  const {loading, deviceData} = useGetDeviceData(); 
  

  console.log(props.dataNeeded)
  let data
  if (props.dataNeeded) {
    data = props.dataNeeded.map((item) => {
      return { datum: item }
    })
  }


  if(loading){
    return <>
      Loading....
    </>
  }

  return (
    <>
      <div className=''>
        {props.graphNeeded === 'LineChart' && (
          <LineChart
            // className='w-96 h-96'
            width={600}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='datum'
              stroke='#82ca9d'
            />
          </LineChart>
        )}

        {props.graphNeeded === 'BarChart' && (
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey='datum'
              fill='#82ca9d'
              shape={
                <Rectangle
                  fill='gold'
                  stroke='purple'
                />
              }
            />
          </BarChart>
        )}
      </div>
    </>
  )
}
