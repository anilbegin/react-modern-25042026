import React,{useContext, useReducer} from "react"
import { Link } from "react-router-dom"
import Page from "./Page"

import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"  

function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  function handleSearchIcon(e) {
    e.preventDefault()
    appDispatch({type: 'openSearch'})
  }

  return (
    <Page title='Homepage'>
      <main className="py-5 behind">
      <div className="container container--narrow py-md-5">
        <div className="modern-card no-hover text-center">
          <div className="mb-3 generic-logo-size">
            <i className="fas fa-inbox"></i>
          </div>
          <h2 className="text-center mb-3">Hello <strong>{appState.user.username}</strong>, your feed is empty.</h2>
          <p className="lead text-muted text-center mx-auto">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
          { /** new actions */ } 
          <div className="mt-4">
            <a onClick={handleSearchIcon} href="#" className="btn btn-success mr-2">
             <i className="fas fa-search mr-1"></i> Search Posts
            </a>
            <Link to="/create-post" className="btn btn-outline-secondary mt-2 mt-md-0">
              <i className="fas fa-pen mr-1"></i> Write Your First Post
            </Link>
          </div>
        </div>  
      </div>
    </main>
    </Page>
  )
}

export default Home