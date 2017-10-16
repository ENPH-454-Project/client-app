import React from 'react'
import Graph from '../components/Graph'
import axios from 'axios'

// load your general data
var loopData = [Math.random()]
for(var i=0;i<50;i++){
  loopData.push(Math.random())
}
var chartData = {
  labels: ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  datasets: [
    {
      label: 'Data',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: loopData
    }
  ]}




var width = 800,
  height = 500

export default class GraphContainer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:chartData,
      serverRes:''
    }
    this.newData = this.newData.bind(this)
    this.testServer = this.testServer.bind(this)
  }

  newData() {
    var self = this;
    window.setInterval(()=>{
      var newArray = this.state.data.datasets[0].data.slice()
      newArray.shift()
      newArray.push(Math.random())
      console.log(newArray)
      var newState = Object.assign({},chartData,{datasets:[Object.assign({},chartData.datasets[0],{data:newArray})]})
      this.setState({
        data: newState
      })
      //console.log(this.state.data)
    }, 100);

  }

  testServer() {
    var self = this;
    axios.post('https://vdlmikqfqd.execute-api.us-east-1.amazonaws.com/prod/test', {
      data:[1,2,3,4,5]
      })
      .then(function(res) {
        self.setState({
          serverRes: res.data
        })
        console.log(res.data)
      })
      .catch(function(error) {
        console.log(error.response.status + ', ' + error.response.statusText)
      })
  }

  render() {
    console.log(this.state.data)
    return <Graph title="test" data={this.state.data} newData={this.newData} serverRes={this.state.serverRes} width={width} height={height} testServer={this.testServer}/>
  }
}
