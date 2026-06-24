import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios'
import { useParams, Link } from "react-router-dom"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfileFollowers() {
  const appState = useContext(StateContext)
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

  function isOwnProfile() {
    if(appState.loggedIn) {
      return appState.user.username == username
    }
    return false
  }

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
      {!Boolean(followers.length) &&
        <p className="text-muted ml-4 font-italic">
          {isOwnProfile() ? "You don\'t have any followers yet." :
                             "User does not have any followers yet."}
        </p>
      }
    </div>
  )
}

export default ProfileFollowers