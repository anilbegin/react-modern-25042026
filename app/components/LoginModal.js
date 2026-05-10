import React, { useEffect, useState } from "react"
import Axios from 'axios'

function LoginModal({ show, onClose, setLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await Axios.post('/login', {username, password})
      if(response.data) {
        setLoggedIn(true)
      //  console.log(response.data)
        localStorage.setItem('xAvatar', response.data.avatar)
        localStorage.setItem('xToken', response.data.token)
        localStorage.setItem('xUsername', response.data.username)
        onClose()
      } else {
        alert('Invalid Username/Password')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // ESC key close
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose()
    }

    if (show) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden" // prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h3 className="mb-3">Sign In</h3>

        <form onSubmit={handleLogin}>
          <input onChange={e => setUsername(e.target.value)} autoFocus type="text" placeholder="Username"
            className="form-control mb-2"
          />

          <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"
            className="form-control mb-3"
          />

          <button className="btn btn-success btn-block">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal