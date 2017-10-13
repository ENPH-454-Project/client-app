import React from 'react'
//import {SoftSPI} from 'rpi-softspi'

let client = new SoftSPI({
   clock: 15,     // pin number of SCLK
   mosi: 11,      // pin number of MOSI
   miso: 13,      // pin number of MISO
   client: 16,    // pin number of CS
   clientSelect: rpio.LOW, // trigger signal for the client
   mode: 0,                // clock mode (0 - 3)
   bitOrder: SoftSPI.MSB   // bit order in communication
})

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
    let bytes = client.read(5)
    console.log(bytes)
    this.setState({
      data:bytes
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
