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
    this.playSound = this.playSound.bind(this)
  }

  stream(){
    console.log('Stream Start')
    const socket = openSocket('http://localhost:3000')
    socket.on('timer', timestamp => {
      this.setState({
        data:timestamp
      })
    })
    socket.emit('callback', 'TEST', (data)=>{
      console.log(data)
    })
    socket.emit('subscribeToTimer',1000)
  }

  playSound(){
    // Audio Context
    var audioContext = new AudioContext();
    var osc = audioContext.createOscillator();
    var length = 10000
    var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]);

    var imag = new Float32Array(real.length);
    var hornTable = audioContext.createPeriodicWave(real, imag);

    osc = audioContext.createOscillator();
    osc.setPeriodicWave(hornTable);
    osc.frequency.value = 160;
    osc.connect(audioContext.destination);
    osc.start(0);
    setTimeout(length, ()=>{
      osc.stop()
      console.log('stop')
    })

  }

  render() {
    return(
      <div>
        <h4>Test</h4>
        {this.state.data}
        <br></br>
        <button onClick={()=>this.stream()}>Stream</button>
        <button onClick={()=>this.playSound()}>Play Sound</button>
      </div>
    )
  }
}
