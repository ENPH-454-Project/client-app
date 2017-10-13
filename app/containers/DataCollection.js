import React from 'react'
import SPI from 'pi-spi'
var SPI = require('pi-spi');


var spi = SPI.initialize("/dev/spidev0.0")

var data = [0,1,2,3,4]


var spi = SPI.initialize("/dev/spidev0.0")

export default class DataCollection extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:0
    }
    this.addData = this.addData.bind(this)
    this.readData = this.readData.bind(this)
  }

  addData(array) {
    var newArray = this.state.data.slice()
    newArray.push(array)
    this.setState({
      data:newArray
    })
  }
  readData() {
    spi.read(10, (data)=>{
      this.setState({
        data:data
      })
    })
  }
  render() {
    return (
      <div>
        <p>Data collection</p>
        <p>{this.state.data}</p>
        <button onClick={()=>this.readData()}>Add</button>
      </div>
    )
  }

}
