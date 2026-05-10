import React, { useState } from "react"
import Axios from 'axios'

function HeaderLoggedOut(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await Axios.post('/login', {
          username: username, 
          password: password
        })
      if(response.data) {
        console.log(response.data)
        alert('Congrats, you logged in successfully')
      } else {
        alert('invalid username/password')
      }
    } catch (e) {
      console.log(e)
    }
    
  }
  return (
    <div className="d-flex align-items-center guest my-3 my-md-0">
        <a href="#bottom" className="btn btn-link text-white mr-3">About</a>
        <button onClick={props.onOpenModal} className="btn btn-outline-light mr-2">
          Sign In
        </button>
    </div>
  )
}

export default HeaderLoggedOut