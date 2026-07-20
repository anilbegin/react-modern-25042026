import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { Tooltip } from "react-tooltip"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function HeaderLoggedIn() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogout() {
    appDispatch({type: 'flashMessage', value: 'You have logged out.'})
    appDispatch({type: 'logout'})
  }

  function handleSearchIcon(e) {
    e.preventDefault()
    appDispatch({type: 'openSearch'})
  }

  return (
      <div className="flex-row my-3 my-md-0">
          <a onClick={handleSearchIcon} data-tooltip-auto-close='2000' data-tooltip-id="search" data-tooltip-place="bottom-start" data-tooltip-offset="19" data-tooltip-content="Search" href="#" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
          </a>
          <Tooltip id="search" />
          {" "}
          <span onClick={() => appDispatch({type: 'toggleChat'})} 
          data-tooltip-auto-close='2000' data-tooltip-id="chat" data-tooltip-content="Chat" data-tooltip-place="bottom-start" data-tooltip-offset="19"  
          className={"mr-2 header-chat-icon " + (appState.unreadChatCount ? "text-danger" : "text-white")}>
            <i className="fas fa-comment"></i>
            <span className="chat-count-badge text-white">
              {appState.unreadChatCount > 9 ? "9+" : appState.unreadChatCount}
            </span>
          </span>
          <Tooltip id="chat" />
          {" "}
          <Link data-tooltip-auto-close='2000' data-tooltip-id="profile" data-tooltip-place="bottom-start" data-tooltip-offset="19" data-tooltip-content="My Profile" to={`/profile/${appState.user.username}`} className="mr-2">
            <img className="small-header-avatar" src={appState.user.avatar} />
          </Link>
          <Tooltip id="profile" />
          {" "}
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