import React, {Component} from 'react'

export default class MessageForm extends Component {

  state = {
    username: "",
    content: ""
  }

  onChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addMessage(this.state)
    this.setState({
      username: "",
      content: ""
    })
  }

  render(){
    return(
    <form onSubmit={this.onSubmit}>
      <label>
        Username:
        <input type="content" name="username" value={this.state.username} onChange={this.onChange} />
      </label>
      <br/>
      <input type="content" name="content" value={this.state.content} onChange={this.onChange} />
      <br/>
      <input type="submit" value="Submit" />
    </form>
    )
  }

}
