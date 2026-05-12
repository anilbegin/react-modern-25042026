import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios'
import ExampleContext from "../ExampleContext"

function LoginModal() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { addFlashMessage, showModal, closeModal, setLoggedIn } = useContext(ExampleContext)
  
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
        addFlashMessage('Congrats, you logged in successfully!')
        closeModal()
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
      if (e.key === "Escape") closeModal()
    }

    if (showModal) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden" // prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [showModal, closeModal])

  if (!showModal) return null

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <button className="modal-close" onClick={closeModal}>
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