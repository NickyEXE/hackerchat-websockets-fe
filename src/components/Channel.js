import React from 'react'

export default function Channel (props){

  return(<div onClick={ () => props.changeChannel(props.id) }>#{props.name}</div>)
}
