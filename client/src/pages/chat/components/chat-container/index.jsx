import React from 'react'
import MessageBar from './components/messge-bar'
import MessageContainer from './components/message-container'
import ChatHeader from './components/chat-header'

const Chatcontaier = () => {
  return (
    <div className='fixed top-0 h-screen w-screen bg-black flex flex-col md:static md:flex-1'>
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar />
    </div>
  )
}

export default Chatcontaier
