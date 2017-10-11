import React from 'react'
import SPI from 'pi-spi'


var spi = SPI.initialize("/dev/spidev0.0")

var data = [0,1,2,3,4]

export default class DataCollection extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:data
    }
    this.addData = this.addData.bind(this)
  }

  addData(array) {
    var newArray = this.state.data.slice()
    newArray.push(array)
    this.setState({
      data:newArray
    })
  }
  render() {
    return (
      <div>
        <p>Data collection</p>
        <p>{this.state.data}</p>
        <button onClick={()=>this.addData([1,2,3,4])}>Add</button>
      </div>
    )
  }

}
