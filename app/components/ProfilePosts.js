import React, { useEffect, useState } from "react"
import Axios from 'axios'
import { useParams, Link } from "react-router-dom"

import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
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
  } , [])

  if(isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {posts.map(function(post) {
        const date = new Date(post.createdDate) 
        const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <strong className="mr-2">{post.title}</strong>
            <span className="text-muted small">on {dateFormatted} </span>
          </Link>
        )
      })}
      
    </div>
  )
}

export default ProfilePosts