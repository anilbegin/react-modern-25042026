import React from "react"

function HeaderLoggedIn(props) {
  function handleLogout() {
    props.setLoggedIn(false)
  }

  return (
      <div class="flex-row my-3 my-md-0">
          <a href="#" class="text-white mr-2 header-search-icon">
            <i class="fas fa-search"></i>
          </a>
          <span class="mr-2 header-chat-icon text-danger">
            <i class="fas fa-comment"></i>
            <span class="chat-count-badge text-white">3</span>
          </span>
          <a href="#" class="mr-2">
            <img class="small-header-avatar" src="https://gravatar.com/avatar/bbf83f8935b4d8c70600975d96ac33b9?s=128" />
          </a>
          <a class="btn btn-sm btn-success mr-2" href="/create-post">
            Create Post
          </a>
          <button onClick={handleLogout} class="btn btn-sm btn-secondary">
            Sign Out
          </button>
      </div>
    )
}

export default HeaderLoggedIn