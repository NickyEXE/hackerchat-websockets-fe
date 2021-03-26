import React from 'react'
import MessageList from './MessageList'
import MessageForm from '../components/MessageForm'
import Socket from '../services/Socket'

// const socket = new Socket("ws://localhost:3000/cable");

class MessageContainer extends React.Component {

  state = {
    name: null,
    messages: [],
    socket: null
  }

  getMessages = () => {
    fetch(`http://localhost:3000/channels/${this.props.channel}`)
    .then(res => res.json())
    .then(this.updateStateFromJSON)
  }

  // used for initial fetch and for likes
  updateStateFromJSON = json => {
    this.setState({messages: json.messages, name: json.name})
  }

  componentDidMount(){
    this.getMessages()
    this.subscribe()
  }

  componentDidUpdate(prevProps){
    if (prevProps.channel !== this.props.channel){
      this.state.socket && this.state.socket.unsubscribe()
      this.getMessages()
      this.subscribe()
    }
  }

  componentWillUnmount(){
    this.state.socket && this.state.socket.unsubscribe()
  }

  subscribe = () => {
    if (this.props.channel){
      const socket = new Socket("ws://localhost:3000/cable", this.props.channel, this.onReceived);
      this.setState({socket: socket})
    }
  }

  onReceived = (message) => this.setState({messages: [...this.state.messages, message]})

  addMessage = (message) => {
    fetch(`http://localhost:3000/channels/${this.props.channel}/messages`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }

  render(){
    return(
      <>
        <h3>#{this.state.name}</h3>
        <MessageForm addMessage={this.addMessage}/>
        <MessageList messages={this.state.messages} updateStateFromJSON={this.updateStateFromJSON}/>
      </>
    )
  }
}

export default MessageContainer
