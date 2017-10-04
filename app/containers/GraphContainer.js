import React from 'react'
import Graph from '../components/Graph'

// load your general data
var chartData = [{test:1}]

var width = 700,
  height = 300,
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
  }

  render() {
    return <Graph title="test"/>
  }
}
