import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"

function HeaderLoggedOut() {
  const appDispatch = useContext(DispatchContext)

  return (
    <div className="d-flex align-items-center guest my-3 my-md-0">
        <Link to="/about" className="btn btn-link text-white mr-3">About</Link>
        <button onClick={() => appDispatch({type: 'openModal'})} className="btn btn-outline-light mr-2">
          Sign In
        </button>
    </div>
  )
}

export default HeaderLoggedOut