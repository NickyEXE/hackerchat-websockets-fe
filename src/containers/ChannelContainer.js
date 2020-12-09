import React, { Component } from 'react'
import Channel from '../components/Channel'

export default class ChannelContainer extends Component {

  state = {
    channels: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/channels")
    .then(res=>res.json())
    .then(channels => this.setState({ channels }))
  }

  render(){
    const channels = this.state.channels.map(channel => <Channel key={channel.id} changeChannel={this.props.changeChannel} {...channel} />)
    return (
      <aside>{channels}</aside>
    )
  }
}
