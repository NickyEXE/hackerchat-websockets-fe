import React from 'react'
import LikeButton from './LikeButton'

class Message extends React.Component {

  // constructor(){
  //   super()
  //   this.onClick = this.onClick.bind(this)
  // }

  onClick = () => {
    fetch(`http://localhost:3000/messages/${this.props.id}/likes`, {
      method: "POST"
    })
    .then(res => res.json())
    .then(this.props.updateStateFromJSON)
  }

  render(){
    return (
      <li>
        <div className="username">
          <strong>{this.props.username}: </strong>
        </div>
        <div className="message">
          { this.props.content }
        </div>
        <LikeButton onClick={this.onClick} numberOfLikes={this.props.like_count}/>
      </li>
      )
  }
}

export default Message
