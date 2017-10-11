import React from 'react'
import Graph from '../components/Graph'

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
      data:chartData
    }
    this.newData = this.newData.bind(this)
  }

  newData() {
    self = this;
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

  render() {
    console.log(this.state.data)
    return <Graph title="test" data={this.state.data} newData={this.newData} width={width} height={height}/>
  }
}
