import React,{useContext, useReducer, useEffect} from "react"
import { Link } from "react-router-dom"
import Page from "./Page"
import { useImmer } from 'use-immer'
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"  
import LoadingDotsIcon from "./LoadingDotsIcon"
import Post from "./Post"

function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [state, setState] = useImmer({
    isLoading: true,
    feed: [],
    postsCount: 0
  })

  // fetch all the latest posts from all "Followings" of the Current loggedIn User 
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

  // retrieve the number of posts created by the Logged In User
  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${appState.user.username}/posts`, {
          signal : ourRequest.signal
        })
        //console.log(response.data)
        if(response.data) {
          setState(draft => {
            draft.postsCount = response.data.length
          })
        }
      } catch (e) {
        console.log(e)
      } 
    }
    fetchPosts()
    return () => ourRequest.abort()
  } , [])

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
                return <Post post={post} key={post._id} />
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
            { /** includes CTA for New Users */ } 
            <div className="mt-4">
              {(state.postsCount > 0 ? <p className="text-muted mb-3">
                <strong>{state.postsCount}</strong> posts published by you.
              </p> : "")}
              <a onClick={handleSearchIcon} href="#" className="btn btn-success mr-2">
              <i className="fas fa-search mr-1"></i> Search Posts
              </a>
              <Link to="/create-post" className="btn btn-outline-secondary mt-2 mt-md-0">
                <i className="fas fa-pen mr-1"></i> {state.postsCount > 0 ? "Create a New Post": "Write Your First Post"}
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