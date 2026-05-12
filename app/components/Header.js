import React,{useState, useContext} from "react"
import { Link } from "react-router-dom"

import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"
import ExampleContext from "../ExampleContext"

function Header() {
  const { loggedIn } = useContext(ExampleContext)
  return (
    <header className="header-bar" id="top">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            WriteSpace
            <i className="fas fa-feather-alt"></i>
          </Link>
        </h4>
        {loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </header>
  )
}

export default Header