import React,{useContext, useReducer, useEffect} from "react"
import { Link } from "react-router-dom"
import Page from "./Page"
import { useImmer } from 'use-immer'
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"  
import LoadingDotsIcon from "./LoadingDotsIcon"

function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [state, setState] = useImmer({
    isLoading: true,
    feed: []
  })

  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchPosts() {
      try {
        const response = await Axios.post('/getHomeFeed', {
          token: appState.user.token
        }, {
          signal: ourRequest.signal
        })
        //console.log(response.data)
        setState(draft => {
          draft.isLoading = false
          draft.feed = response.data
        })
      } catch (e) {
        console.log(e)
      }
    }
    fetchPosts()
    
    return () => ourRequest.abort() 
  }, [])

  function handleSearchIcon(e) {
    e.preventDefault()
    appDispatch({type: 'openSearch'})
  }

  if(state.isLoading) {
    return (
      <Page title='Loading..'>
        <LoadingDotsIcon />
      </Page>
    )
  }

  return (
    <Page title='Homepage'>
      <main className="py-5 behind">
      <div className="container container--narrow py-md-5">
        
        {Boolean(state.feed.length) && 
        <>
          <div className="modern-card no-hover">
            <h3 className="text-center mb-4">Hello <strong>{appState.user.username}</strong>, latest posts from those you follow</h3>
            <div className="list-group">
              {state.feed.map(function(post) {
                const date = new Date(post.createdDate) 
                const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                return (
                  <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
                    <img className="avatar-tiny" src={post.author.avatar} />{' '}
                    <strong className="mr-2">{post.title}</strong>
                    <span className="text-muted small">by {post.author.username} on {dateFormatted} </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </>}
        {!Boolean(state.feed.length) && 
        <>
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
        </>}  
        
      </div>
    </main>
    </Page>
  )
}

export default Home