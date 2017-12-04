import React from 'react'
import axios from 'axios'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ReactAudioPlayer from 'react-audio-player'
import Waveform from '../components/Waveform'

const files = require('../fakeFiles.json')

export default class View extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      audio:[],
      files: files.files
    }
    this.loadFiles = this.loadFiles.bind(this)
    this.refresh = this.refresh.bind(this)
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

  refresh(){
    const self = this
    setTimeout(function(){
      console.log("Loaded");
      var newFiles = self.state.files.push("demo.wav")
      self.setState({
        files: newFiles
      })
    }, 1000);

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
        <Waveform src="Python/you-need-to-grow-up.wav" />
        <RaisedButton label="Load Files" className="button" primary={true} onClick={this.loadFiles} />
        <RaisedButton label="Refresh" primary={true} onClick={this.refresh} />

      </Card>
    )
  }
}
