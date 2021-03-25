import React from 'react'
import MessageList from './MessageList'
import MessageForm from '../components/MessageForm'
// import { ActionCableConsumer } from 'react-actioncable-provider'

const socket = new WebSocket("ws://localhost:3000/cable");
     // When the connection is first created, this code runs subscribing the client to a specific chatroom stream in the ChatRoomChannel.
    // socket.onopen = function(event) {
    //     console.log('WebSocket is connected.');
    //     const msg = {
    //         command: 'subscribe',
    //         identifier: JSON.stringify({
    //             id: chatRoomId,
    //             channel: 'ChannelChannel'
    //         }),
    //     };
    //     socket.send(JSON.stringify(msg));
    // };

    // // When the connection is closed, this code will run.
    // socket.onclose = function(event) {
    //      console.log('WebSocket is closed.');
    // };
    // // When a message is received through the websocket, this code will run.
    // socket.onmessage = function(event) {
    //     const response = event.data;
    //     const msg = JSON.parse(response);

    //     // Ignores pings.
    //     if (msg.type === "ping") {
    //         return;
    //     }
    //     console.log("FROM RAILS: ", msg);

    //     // Renders any newly created messages onto the page.
    //     if (msg.message) {
    //         renderMessage(msg.message)
    //     }

    // };

    // // When an error occurs through the websocket connection, this code is run printing the error message.
    // socket.onerror = function(error) {
    //     console.log('WebSocket Error: ' + error);
    // };


class MessageContainer extends React.Component {

  state = {
    name: null,
    messages: [],
    acc: null,
  }

  getMessages = () => {
    fetch(`http://localhost:3000/channels/${this.props.channel}`)
    .then(res => res.json())
    .then(this.updateStateFromJSON)
  }

  updateStateFromJSON = json => this.setState({messages: json.messages, name: json.name})

  componentDidMount(){
    this.getMessages()
  }

  componentDidUpdate(prevProps){
    if (prevProps.channel !== this.props.channel){
      this.getMessages()
    }
  }

  subscribe = () => {
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
          id: this.props.channel,
          channel: 'ChannelChannel'
      }),
    };
    socket.send(JSON.stringify(msg));
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
        <ActionCableConsumer channel={{channel: "ChannelChannel", id: this.props.channel}} onReceived={this.onReceived}>
        <h3>#{this.state.name}</h3>
        <MessageForm addMessage={this.addMessage}/>
        <MessageList messages={this.state.messages} updateStateFromJSON={this.updateStateFromJSON}/>
      </ActionCableConsumer>
    )
  }
}

export default MessageContainer
