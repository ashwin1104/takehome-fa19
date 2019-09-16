import React, { Component } from 'react'
import Instructions from './Instructions'
import Contact from './Contact'
import Counter from './Counter'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [
        {id: 1, name: "Angad", nickname: "greg", hobby: "dirty-ing"},
        {id: 2, name: "Roy", nickname: "uwu", hobby: "weeb"},
        {id: 3, name: "Daniel", nickname: "oppa", hobby: "losing money with options trading"},
      ], idCount: 3, newName: ' ', newNickname: ' ', newHobby: ' ', newAge: 0, newGender: ' '
    }
    this.handleNameChange = this.handleNameChange.bind(this)   
    this.handleNicknameChange = this.handleNicknameChange.bind(this)
    this.handleHobbyChange = this.handleHobbyChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(event) {
    this.setState({newName: event.target.value})
  }
  handleNicknameChange(event){
    this.setState({newNickname: event.target.value})
  }
  handleHobbyChange(event){
    this.setState({newHobby: event.target.value})
  }
  handleAgeChange(event){
    this.setState({newAge: event.target.value})
  } 
  handleGenderChange(event){
    this.setState({newGender: event.target.value})
  } 
  handleSubmit(event) {
    if (this.state.newName != ' ') {
      this.setState({idCount: this.state.idCount + 1})
      this.state.contacts.push({id: this.state.idCount, name: this.state.newName, nickname: this.state.newNickname, hobby: this.state.newHobby, age: this.state.newAge, gender: this.state.newGender})
      }
    event.preventDefault()
  }
   render() {
     return (
      <div className="App">
        <Instructions complete={true} />
	    <form onSubmit={this.handleSubmit}>
	    <label>Name</label>
	    <input
	      type="text"
	      name="name"
	      value={this.state.newName}
	      onChange={this.handleNameChange}
	    />
	    <label>Nickname</label>                                                                                                                                                                        <input
	      type="text"
	      name="nickname"
	      value={this.state.newNickname}
	      onChange={this.handleNicknameChange}
	    />
	    <label>Hobby</label>
            <input
	      type="text"                                                                                                                                                                                       name="hobby"                                                                                                                                                                                   value={this.state.newHobby}                                                                                                                                                                    onChange={this.handleHobbyChange}                                                                                                                                                            />
	    <label>Age</label>
	     <input
	     type="text"
	     name="age"
	     value={this.state.newAge}
	     onChange={this.handleAgeChange}
            /> 
	    <label>Gender</label>
	     <input
	      type="text"
	      name="gender"
	      value={this.state.newGender}
	      onChange={this.handleGenderChange}
	     />

	    <input type="submit" value="Submit" />
	     </form>

	    <h3> ID: {this.state.idCount} </h3>
	    <h3> Name: {this.state.newName} </h3>
	    <h3> Nickname: {this.state.newNickname} </h3>
            <h3> Hobby: {this.state.newHobby} </h3>
	    <h3> Age: {this.state.newAge} </h3>
	    <h3> Gender: {this.state.newGender} </h3>
	     {this.state.contacts.map(x => (
	     <Contact id={x.id} name={x.name} nickcname={x.nickname} hobby={x.hobby} />
        ))}
      </div>
    )
  }
}

export default App
