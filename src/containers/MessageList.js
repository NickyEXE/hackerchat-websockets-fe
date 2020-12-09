import React from 'react'
import Message from '../components/Message'

function MessageList(props){
  console.log(props.messages)
  return (
  <>
    <ol>
      {props.messages.map(message => <Message updateStateFromJSON={props.updateStateFromJSON} {...message} key={message.id}/>)}
    </ol>
  </>
  )
}


export default MessageList
