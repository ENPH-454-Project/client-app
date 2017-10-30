import React from 'react'
import axios from 'axios'
import openSocket from 'socket.io-client'


export default class Test extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:0
    }
    this.stream = this.stream.bind(this)
  }

  stream(){
    console.log('Stream Start')
    const socket = openSocket('http://localhost:3000')
    socket.on('timer', timestamp => {
      this.setState({
        data:timestamp
      })
    })
    socket.emit('subscribeToTimer',1000)
  }

  render() {
    return(
      <div>
        <h4>Test</h4>
        {this.state.data}
        <br></br>
        <button onClick={()=>this.stream()}>Stream</button>
      </div>
    )
  }
}
