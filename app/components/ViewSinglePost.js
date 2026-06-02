import React, {useState, useEffect, useContext} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Tooltip } from "react-tooltip"

import LoadingDotsIcon from "./LoadingDotsIcon"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import NotFound from "./NotFound"
import Page from "./Page"

function ViewSinglePost() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          signal : ourRequest.signal
        })
        setPost(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPost()
    // cancelling Axios request
    return () => ourRequest.abort() 
  } , [])

  if(!post && !isLoading  ) return <NotFound />
  
  if(isLoading) return (
    <Page title='...'>
      <LoadingDotsIcon />
    </Page>
  )

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

  function isOwner() {
    if(appState.loggedIn) {
      return appState.user.username == post.author.username
    }
    return false
  }

  async function deleteHandler() {
    const areYouSure = window.confirm("Do you really want to delete this post ?")
    if(areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`, {data: {
            token: appState.user.token
          }
        })
        if(response.data == "Success") {
          appDispatch({type: 'flashMessage', value: 'Post was successfully deleted.'})
          navigate(`/profile/${appState.user.username}`)          
        }
      } catch (e) {
        console.log("There was a problem.")
      }
    }
  }

  return (
    <Page title = {post.title}>
      <main className="py-5 behind">
      <div className="container container--narrow py-md-5">
        <div className="content-card">
          <div className="d-flex justify-content-between">
            <h2>{post.title}</h2>
            {isOwner() && (
              <div className="post-actions">
                {/**  Show only if current user is the author */}
                <Link to={`/post/${post._id}/edit`} data-tooltip-id="edit" data-tooltip-place="top-start" data-tooltip-variant="dark" data-tooltip-content='Edit'  className="action-btn action-edit mr-2">
                  <i className="fas fa-edit"></i>
                </Link>
                <Tooltip id="edit" />
                <a onClick={deleteHandler} data-tooltip-id="delete" data-tooltip-place="top-start" data-tooltip-variant="dark" data-tooltip-content="Delete" href="#" className="action-btn action-delete">
                  <i className="fas fa-trash"></i>
                </a>
                <Tooltip id="delete" />
              </div>
            )}
          </div>

          <p className="text-muted small mb-4">
            <Link to={`/profile/${post.author.username}`}>
              <img className="avatar-tiny" src={post.author.avatar} />
            </Link>
            Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
          </p>

          <div className="body-content">
            <ReactMarkdown children={post.body} allowedElements={['h1', 'h2', 'h3', 'h4',
              'h5', 'h6', 'strong', 'em', 'p', 'br', 'ol', 'ul', 'li']} />
          </div>
       </div>
      </div>
    </main>
    </Page>
  )
}

export default ViewSinglePost