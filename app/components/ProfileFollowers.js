import React, { useEffect, useState } from "react"
import Axios from 'axios'
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfileFollowers() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchFollowers() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, {
          signal : ourRequest.signal
        })
      //  console.log(response)
        if(response.data) {
          setIsLoading(false)
          setFollowers(response.data)
        }
      } catch (e) {
        console.log(e)
      } 
    }
    fetchFollowers()
    return () => ourRequest.abort()
  } , [username])

  if(isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {followers.map(function(user, index) {
        return (
          <Link key={index} to={`/profile/${user.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={user.avatar} />
            <strong className="mr-2">{user.username}</strong>
          </Link>
        )
      })}
      
    </div>
  )
}

export default ProfileFollowers