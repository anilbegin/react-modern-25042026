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
    <form onSubmit={handleLogin} className="header-login">
      <input onChange={e => setUsername(e.target.value)} name="username" className="form-control"
        type="text"
        placeholder="Username"
        autoComplete="off"
      //  required
      />
      
      <input onChange={e => setPassword(e.target.value)} name="password"
        className="form-control"
        type="password"
        placeholder="Password"
      />
          
          <button className="btn btn-success">Sign In</button>
    </form>
  )
}

export default HeaderLoggedOut