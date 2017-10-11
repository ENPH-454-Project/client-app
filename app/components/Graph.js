import React from 'react'
import {Line} from 'react-chartjs-2'

const Graph = ({title, data, newData, test, width, height}) => (
  <div>
    <p> Graph </p>
    <Line  data={data} options={{animation:false}}/>
    <button onClick={()=>{newData()}}>Next</button>
  </div>

)

export default Graph
