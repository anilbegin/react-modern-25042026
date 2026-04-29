import React,{useState} from "react"
import { Link } from "react-router-dom"

import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"

function Header(props) {
  return (
    <header className="header-bar" id="top">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            WriteSpace
            <i className="fas fa-feather-alt"></i>
          </Link>
        </h4>
        {props.loggedIn ? <HeaderLoggedIn setLoggedIn={props.setLoggedIn} /> : 
                          <HeaderLoggedOut setLoggedIn={props.setLoggedIn} 
                                           onOpenModal={props.onOpenModal}/>}
      </div>
    </header>
  )
}

export default Header