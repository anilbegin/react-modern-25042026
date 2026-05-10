import React, { useState, useContext } from "react"
import Axios from 'axios'
import ExampleContext from "../ExampleContext"

function HeaderLoggedOut() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const appState = useContext(ExampleContext)

  return (
    <div className="d-flex align-items-center guest my-3 my-md-0">
        <a href="#bottom" className="btn btn-link text-white mr-3">About</a>
        <button onClick={appState.openModal} className="btn btn-outline-light mr-2">
          Sign In
        </button>
    </div>
  )
}

export default HeaderLoggedOut