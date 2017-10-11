import React from 'react'
import GraphContainer from './containers/GraphContainer'
import DataCollection from './containers/DataCollection'


export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
		}
	}


  render() {
    return(
      <div>
        <h1>Hello World</h1>
        <DataCollection />
      </div>
    )
  }
}
