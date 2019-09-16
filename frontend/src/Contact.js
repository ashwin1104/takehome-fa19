import React, { Component } from 'react'

class App extends Component {
  // YOUR CODE GOES BELOW
  constructor(props, id, name, nickname, hobby) {
    super(props)
    this.id = id
    this.name = name
    this.nickcname = nickname
    this.hobby = hobby
}
  render() {
    return (
      <div>{this.props.name}
      </div> 
    )
  }
}

export default App
