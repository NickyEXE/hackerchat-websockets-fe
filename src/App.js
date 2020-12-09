// import logo from './logo.svg';
import React, {Component} from 'react'
import './App.css';
import MessageContainer from './containers/MessageContainer'
import ChannelContainer from './containers/ChannelContainer'
import Welcome from './components/Welcome'

class App extends Component {

  state = {
    channel: null
  }

  changeChannel = (id) => this.setState({ channel: id })

  render(){
    return (<>
        <header>
        <h1 onClick={() => this.changeChannel(null)}>Welcome to Hacker Chat</h1>
        <h3>A place for hackers and slashers to cut loose and cut flesh</h3>
        </header>
        <ChannelContainer changeChannel={this.changeChannel}/>
      <main>{this.state.channel ? <MessageContainer channel={this.state.channel}/> : <Welcome/>}</main>
      </>
    );
  }
}

export default App;
