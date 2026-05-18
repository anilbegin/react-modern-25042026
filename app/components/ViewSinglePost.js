import React, {useState, useEffect} from "react"
import { useParams, Link } from "react-router-dom"
import Axios from 'axios'

import LoadingDotsIcon from "./LoadingDotsIcon"
import Page from "./Page"

function ViewSinglePost() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`)
        if(response.data) {
          setPost(response.data)
          setIsLoading(false)
        } else {
          console.log('There was a problem')
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchPost()
  } , [])

  if(isLoading) return (
    <Page title='...'>
      <LoadingDotsIcon />
    </Page>
  )

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

  return (
    <Page title = {post.title}>
      <main className="py-5 behind">
      <div className="container container--narrow py-md-5">
        <div className="content-card">
          <div className="d-flex justify-content-between">
            <h2>{post.title}</h2>
            {/** improvised UI section */}
            <div className="post-actions">
            {/**  Show only if current user is the author */}
                <a href="#" className="action-btn action-edit mr-2" title="Edit">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="#" className="action-btn action-delete" title="Delete">
                  <i className="fas fa-trash"></i>
                </a>
              </div>
            </div>

          <p className="text-muted small mb-4">
            <Link to={`/profile/${post.author.username}`}>
              <img className="avatar-tiny" src={post.author.avatar} />
            </Link>
            Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
          </p>

          <div className="body-content">
            {post.body}  
          </div>
       </div>
      </div>
    </main>
    </Page>
  )
}

export default ViewSinglePost