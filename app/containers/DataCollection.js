import React from 'react'
import SPI from 'spi'


var spi = SPI.initialize("/dev/spidev0.0")

var data = [0,1,2,3,4]
var buff = new Buffer(8)

var spi = new SPI.Spi('/dev/spidev0.0', {
    'mode': SPI.MODE['MODE_0'],  // always set mode as the first option
    'chipSelect': SPI.CS['none'] // 'none', 'high' - defaults to low
  }, function(s){s.open();});

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
    spi.read(buff, function(device, buf2){
      this.setState({
        data:buf2
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
