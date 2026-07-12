import React, { useEffect, useContext, useRef } from "react"
import {useImmer} from 'use-immer'
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function Chat() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const chatField = useRef(null)
  const [state, setState] = useImmer({
    fieldValue: '',
    chatMessages: []
  })

  useEffect(() => {
    if(appState.isChatOpen)
     chatField.current.focus()

  }, [appState.isChatOpen])

  function handleChatField(e) {
    const value = e.target.value
    setState(draft => {
      draft.fieldValue = value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
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
      <div className="chat-title-bar">Chat 
        <span onClick={() => appDispatch({type: 'closeChat'})} className="chat-title-bar-close">
          <i className="fas fa-times-circle"></i>
          </span>
      </div>
      <div id="chat-log" className="chat-log">
            {state.chatMessages.map(function(message, index) {
              if(message.username == appState.user.username) {
                return (
                  <div className="chat-self">
                    <div className="chat-message">
                      <div className="chat-message-inner">{message.message}</div>
                    </div>
                    <img className="chat-avatar avatar-tiny" src={message.avatar} />
                  </div>
                )
              }

              return (
              <div className="chat-other">
                <a href="#">
                  <img className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" />
                </a>
                <div className="chat-message">
                  <div className="chat-message-inner">
                    <a href="#">
                      <strong>barksalot:</strong>
                    </a>
                    Hey, I am good, how about you?
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