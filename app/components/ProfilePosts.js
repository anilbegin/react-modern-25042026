import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios'
import { useParams, Link } from "react-router-dom"
import StateContext from '../StateContext'
import LoadingDotsIcon from "./LoadingDotsIcon"
import Post from "./Post"

function ProfilePosts() {
  const appState = useContext(StateContext)
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {
          signal : ourRequest.signal
        })
      //  console.log(response)
        if(response.data) {
          setIsLoading(false)
          setPosts(response.data)
        }
      } catch (e) {
        console.log(e)
      } 
    }
    fetchPosts()
    return () => ourRequest.abort()
  } , [username])

  function isOwnProfile() {
    if(appState.loggedIn) {
      return appState.user.username == username
    }
    return false
  }

  if(isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {posts.map(function(post) {
        return <Post key={post._id} post={post} noAuthor={true} />
      })}
      {!Boolean(posts.length) &&
        <p className="text-muted ml-4 font-italic">
          {isOwnProfile() ? "You have not created any posts yet." : 
                              "User has not created any posts."}
        </p>
      }
    </div>
  )
}

export default ProfilePosts