import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios'
import { useParams, Link } from "react-router-dom"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfileFollowing() {
  const appState = useContext(StateContext)
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [following, setFollowing] = useState([])

  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchFollowing() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, {
          signal : ourRequest.signal
        })
      //  console.log(response)
        if(response.data) {
          setIsLoading(false)
          setFollowing(response.data)
        }
      } catch (e) {
        console.log(e)
      } 
    }
    fetchFollowing()
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
      {following.map(function(user, index) {
        return (
          <Link key={index} to={`/profile/${user.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={user.avatar} />
            <strong className="mr-2">{user.username}</strong>
          </Link>
        )
      })}
      {!Boolean(following.length) &&
        <p className="text-muted ml-4 font-italic">
          {isOwnProfile() ? "You are not following anyone yet." : 
                            "User is not following anyone yet."}
        </p>
      }
    </div>
  )
}

export default ProfileFollowing