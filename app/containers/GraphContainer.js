import React from 'react'
import Graph from '../components/Graph'

// load your general data
var chartData = [{test:1}]
var loopData = [{uv:Math.random()}]

for(var i=0;i<50;i++){
  loopData.push({uv:Math.random()})
}

var width = 800,
  height = 500,
  margins = {left: 100, right: 100, top: 50, bottom: 50},
  title = "User sample",
  // chart series,
  // field: is what field your data want to be selected
  // name: the name of the field that display in legend
  // color: what color is the line
  chartSeries = [
    {
      field: 'BMI',
      name: 'BMI',
      color: '#ff7f0e'
    }
  ],
  // your x accessor
  x = function(d) {
    return d.index;
  }

export default class GraphContainer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:loopData
    }
    this.newData = this.newData.bind(this)
  }

  newData() {
    self = this;
    window.setInterval(()=>{
      var newArray = this.state.data.slice()
      newArray.shift()
      newArray.push({uv:Math.random()})
      this.setState({
        data: newArray
      })
      console.log(this.state.data)
    }, 500);

  }

  render() {

    return <Graph title="test" data={this.state.data} newData={this.newData} width={width} height={height}/>
  }
}
