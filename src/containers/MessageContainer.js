import React from 'react'
import MessageList from './MessageList'
import MessageForm from '../components/MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'

class MessageContainer extends React.Component {

  state = {
    name: null,
    messages: [],
  }

  getMessages = () => {
    fetch(`http://localhost:3000/channels/${this.props.channel}`)
    .then(res => res.json())
    .then(this.updateStateFromJSON)
  }

  updateStateFromJSON = json => this.setState({messages: json.messages, name: json.name})

  componentDidMount(){
    this.getMessages()
    // const interval = setInterval(this.getMessages, 3000)
    // this.setState({ interval })
  }

  componentDidUpdate(prevProps){
    if (prevProps.channel !== this.props.channel){
      this.getMessages()
    }
  }

  componentWillUnmount(){
    // clearInterval(this.state.interval)
  }

  onReceived = (message) => {
    console.log(message)
    this.setState({messages: [...this.state.messages, message]})}

  addMessage = (message) => {
    // const newMessage = {...message, id: uuidv4()}
    fetch(`http://localhost:3000/channels/${this.props.channel}/messages`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // {...message, channel_id: this.props.channel}
      // message: {username: "Terminator", content: "Hello World"}
      // {     username: "Terminator", content: "Hello World", channel_id: this.props.channel                   }
      body: JSON.stringify(message),
    })
  }

  render(){
    return(
      <ActionCableConsumer channel={{channel: "ChannelChannel", id: this.props.channel}} onReceived={this.onReceived}>
        <h3>#{this.state.name}</h3>
        <MessageForm addMessage={this.addMessage}/>
        <MessageList messages={this.state.messages} updateStateFromJSON={this.updateStateFromJSON}/>
      </ActionCableConsumer>
    )
  }
}

export default MessageContainer
