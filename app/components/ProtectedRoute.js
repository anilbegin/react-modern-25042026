import React, {useContext, useEffect, useRef} from "react"
import { Navigate } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function ProtectedRoute({children}) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const wasLoggedIn = useRef(appState.loggedIn)

  useEffect(() => {
    if(!appState.loggedIn && !wasLoggedIn.current) {
      appDispatch({
        type: "flashMessage", 
        value: "You must be logged in to access that page!",
        error: true
      })
    }

    wasLoggedIn.current = appState.loggedIn
  }, [appState.loggedIn])

  if(!appState.loggedIn) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute