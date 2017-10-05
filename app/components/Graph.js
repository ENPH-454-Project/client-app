import React from 'react'
import { LineChart, Line } from 'recharts';

const Graph = ({title, data, newData, test, width, height}) => (
  <div>
    <p> Graph </p>
    <LineChart width={width} height={height} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
    <button onClick={()=>{newData()}}>Next</button>
  </div>

)

export default Graph
