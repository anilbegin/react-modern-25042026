import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios'
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function LoginModal() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await Axios.post('/login', {username, password})
      if(response.data) {
        appDispatch({type: 'login', data: response.data})
      //  console.log(response.data)
        appDispatch({type: 'flashMessage', value: 'You logged in successfully!'})
        appDispatch({type: 'closeModal'})
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
      if (e.key === "Escape") appDispatch({type: 'closeModal'})
    }

    if (appState.showModal) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden" // prevent scroll
    }

    // to prevent the loginModal from re-using state data
    // also need to make the input fields controlled
    if(!appState.showModal) { 
      setUsername('')
      setPassword('')
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [appState.showModal])

  function handleOverlayMouseDown(e) {
    if(e.target === e.currentTarget) {
      appDispatch({type: "closeModal"})
    }
  }

  if (!appState.showModal) return null

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayMouseDown}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking anywhere inside modal
      >
        <button className="modal-close" onClick={() => appDispatch({type: 'closeModal'})}>
          &times;
        </button>

        <h3 className="mb-3">Sign In</h3>

        <form onSubmit={handleLogin}>
          <input value={username} onChange={e => setUsername(e.target.value)} autoFocus type="text" placeholder="Username"
            className="form-control mb-2"
          />

          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"
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