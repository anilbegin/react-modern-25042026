import React, { useEffect } from "react"

function Chat() {
  return (
    <div id="chat-wrapper" className="chat-wrapper chat-wrapper--is-visible shadow-lg">
      <div className="chat-title-bar">Chat 
        <span className="chat-title-bar-close">
          <i className="fas fa-times-circle"></i>
          </span>
      </div>
      <div id="chat-log" className="chat-log">
            <div className="chat-self">
              <div className="chat-message">
                <div className="chat-message-inner">Hey, how are you?</div>
              </div>
              <img className="chat-avatar avatar-tiny" src="https://gravatar.com/avatar/bbf83f8935b4d8c70600975d96ac33b9?s=128" />
            </div>

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
      </div>
          
      <form id="chatForm" className="chat-form border-top p-2">
        <div className="d-flex">
          <input type="text" className="chat-field flex-grow-1" placeholder="Type a message…" autoComplete="off" />
          <button className="btn btn-primary ml-2">
            <i className="fas fa-paper-plane fa-sm"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat