import React, { useEffect, useContext, useRef } from "react"
import {useImmer} from 'use-immer'
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import {io} from 'socket.io-client'
const socket = io("http://localhost:8080")

function Chat() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const chatField = useRef(null)
  const chatLog = useRef(null)
  const [state, setState] = useImmer({
    fieldValue: '',
    chatMessages: []
  })
  
  // FOCUS on chat INPUT FIELD when chat Window opens
  // also clear the unread chat count from header, if any
  useEffect(() => {
    if(appState.isChatOpen) {
      chatField.current.focus()
      appDispatch({type: 'clearUnreadChatCount'})
    }
     

  }, [appState.isChatOpen])

  // begin LISTENING for messages sent from Server
  useEffect(() => {
    socket.on('chatFromServer', message => {
      setState(draft => {
        draft.chatMessages.push(message)
      })
    })
  }, [])  

  // PULL THE SCROLL BAR to the bottom of the chat window, on every message
  useEffect(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight
    // increment unread chat count only if..
    if(state.chatMessages.length && !appState.isChatOpen) {
      appDispatch({type: 'incrementUnreadChatCount'})
    }
  }, [state.chatMessages])

  function handleChatField(e) {
    const value = e.target.value
    setState(draft => {
      draft.fieldValue = value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // SEND CHAT message to Server
    socket.emit("chatFromBrowser", {
      message: state.fieldValue,
      token: appState.user.token
    })

    setState(draft => {
      draft.chatMessages.push({message: draft.fieldValue, 
        username: appState.user.username,
        avatar: appState.user.avatar
      })
      draft.fieldValue = ""
    })
  }

  return (
    <div id="chat-wrapper" 
    className={"chat-wrapper shadow-lg " + 
    (appState.isChatOpen ? "chat-wrapper--is-visible" : "")}>
      <div onClick={() => appDispatch({type: 'toggleChat'})} 
       className="chat-title-bar">Chat 
        <span className="chat-title-bar-close">
          <i className="fas fa-times-circle"></i>
          </span>
      </div>
      <div ref={chatLog} id="chat-log" className="chat-log">
        {/* First Welcome Message shown to user, when the Chat Window is empty */}
          {state.chatMessages.length === 0 && (
            <div className="chat-welcome">
              <b>Welcome to the Public Chat!</b>
              <p>
                Connect with other members who are online right now.
                Introduce yourself, ask questions, share ideas, and
                join the conversation.
              </p> 
            </div>
          )}  
            {state.chatMessages.map(function(message, index) {
              if(message.username == appState.user.username) {
                return (
                  <div key={index} className="chat-self">
                    <div className="chat-message">
                      <div className="chat-message-inner">{message.message}</div>
                    </div>
                    <img className="chat-avatar avatar-tiny" src={message.avatar} />
                  </div>
                )
              }

              return (
              <div key={index} className="chat-other">
                <Link to={`/profile/${message.username}`}>
                  <img className="avatar-tiny" src={message.avatar} />
                </Link>
                <div className="chat-message">
                  <div className="chat-message-inner">
                    <Link to={`/profile/${message.username}`}>
                      <strong>{message.username}</strong>
                    </Link>
                    {message.message}
                  </div>
                </div>
              </div>  
              )
            })}
            
            
        </div>
          
      <form onSubmit={handleSubmit} id="chatForm" className="chat-form border-top p-2">
        <div className="d-flex">
          <input value={state.fieldValue} onChange={handleChatField} ref={chatField} type="text" className="chat-field flex-grow-1" placeholder="Type a message…" autoComplete="off" />
          <button className="btn btn-primary ml-2">
            <i className="fas fa-paper-plane fa-sm"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat