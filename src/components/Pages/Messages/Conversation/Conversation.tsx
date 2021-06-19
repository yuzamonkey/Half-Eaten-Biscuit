import React from 'react'
import { useParams } from 'react-router-dom';

const Conversation = () => {
  const { id }: any = useParams();
  return (<div>Conversation {id}</div>)
}

export default Conversation