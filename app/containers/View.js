import React from 'react'
import axios from 'axios'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ReactAudioPlayer from 'react-audio-player';

const files = require('../fakeFiles.json')

export default class View extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      audio:[]
    }
    this.loadFiles = this.loadFiles.bind(this)
    this.play = this.play.bind(this)
  }
  loadFiles() {
    console.log('LoadFiles')
    const self = this
    axios.post('http://localhost:3000/file',{
      key: "rec2.wav"
    }).then((data)=>{
      console.log(data)
      // var context = new AudioContext()
      // context.decodeAudioData(data, function(buffer) {
      //     buf = buffer;
      //     play();
      // });
      self.setState({
        audio:data
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  play(){

  }

  render() {
    return(
      <Card className="view">
        <h1>Recordings</h1>
        {files.files.map((file,index)=>{
          return <Card className="file" key={index}>
                    <h4>{file}</h4>
                    <ReactAudioPlayer src={"Python/" + file} autoPlay={false} controls={true}/>
                 </Card>
        })}
        <RaisedButton label="Load Files" className="button" primary={true} onClick={this.loadFiles} />
        <RaisedButton label="Play" primary={true} onClick={this.play} />

      </Card>
    )
  }
}
