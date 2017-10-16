import React from 'react'
import {Line} from 'react-chartjs-2'


const Graph = ({title, data, newData, test, width, height, serverRes, testServer}) => (
  <div>
    <p> Graph </p>
    <Line  data={data} options={{animation:false}}/>
    <h4>{serverRes}</h4>
    <button onClick={()=>{newData()}}>Next</button>
  </div>

)

export default Graph
