import {useState, useEffect} from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {LineChart, Line} from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';
import { ScatterChart, Scatter } from 'recharts';

export default function DataView(props){

    console.log(props.dataNeeded);

    return (
        <>
            <div className='theGraph'>
                
                {props.graphNeeded === 'LineChart' &&
                    <LineChart
                    width={600}
                    height={250}
                    data={props.dataNeeded}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="datetime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="datum" stroke="#82ca9d" />
                    </LineChart>
                }

                {props.graphNeeded === 'BarChart' && 
                    <BarChart
                        width={500}
                        height={300}
                        data={props.dataNeeded}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datum" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="datum" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                }

                {props.graphNeeded == 'ScatterPlot' &&     
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                        >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="A school" data={scatterdata} fill="#8884d8" />
                    </ScatterChart>
                }

            </div>
        </>
    )
}