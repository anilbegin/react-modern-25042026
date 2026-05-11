import React, {useContext} from "react"
import { Link } from "react-router-dom"
import ExampleContext from "../ExampleContext"

function HeaderLoggedIn(props) {
  const appState = useContext(ExampleContext)

  function handleLogout() {
    localStorage.removeItem('xAvatar')
    localStorage.removeItem('xToken')
    localStorage.removeItem('xUsername')
    props.addFlashMessage('You have Logged Out!')
    appState.setLoggedIn(false)
  }

  return (
      <div className="flex-row my-3 my-md-0">
          <a href="#" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
          </a>
          <span className="mr-2 header-chat-icon text-danger">
            <i className="fas fa-comment"></i>
            <span className="chat-count-badge text-white">3</span>
          </span>
          <a href="#" className="mr-2">
            <img className="small-header-avatar" src="https://gravatar.com/avatar/bbf83f8935b4d8c70600975d96ac33b9?s=128" />
          </a>
          <Link className="btn btn-sm btn-success mr-2" to ="/create-post">
            Create Post
          </Link>
          <button onClick={handleLogout} className="btn btn-sm btn-secondary">
            Sign Out
          </button>
      </div>
    )
}

export default HeaderLoggedIn