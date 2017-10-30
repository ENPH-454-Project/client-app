import React from 'react'
import GraphContainer from './containers/GraphContainer'
import Test from './containers/Test'



export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
		}
	}

  render() {
    return(
      <div>
        <h1>Laser Microphone</h1>
        <Test />
      </div>
    )
  }
}
