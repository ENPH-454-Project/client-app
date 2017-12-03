import React from 'react'
import GraphContainer from './containers/GraphContainer'
import View from './containers/View'



export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
		}
	}

  render() {
    return(
      <div>
        <h1 className="Header">Laser Microphone</h1>
        <View />
      </div>
    )
  }
}
