import React from "react"

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map(function(msg, index) {
        return (
          <div key={index} className="floating-alert alert alert-success">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages