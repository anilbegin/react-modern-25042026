import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios'
import { useParams, Link } from "react-router-dom"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfileFollow(props) {
  const appState = useContext(StateContext)
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [follow, setFollow] = useState([])

  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchFollow() {
      try {
        const response = await Axios.get(`/profile/${username}/${props.tab}`, {
          signal : ourRequest.signal
        })
      //  console.log(response)
        if(response.data) {
          setIsLoading(false)
          setFollow(response.data)
        }
      } catch (e) {
        console.log(e)
      } 
    }
    fetchFollow()
    return () => ourRequest.abort()
  } , [props.tab])

  function isOwnProfile() {
    if(appState.loggedIn) {
      return appState.user.username == username
    }
    return false
  }

  if(isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {follow.map(function(user, index) {
        return (
          <Link key={index} to={`/profile/${user.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={user.avatar} />
            <strong className="mr-2">{user.username}</strong>
          </Link>
        )
      })}
      {!Boolean(follow.length) &&
        <p className="text-muted ml-4 font-italic">
          {props.tab == 'followers' ? 
          (isOwnProfile() ? "You don\'t have any followers yet." :
                             "User does not have any followers yet.") : ''}
          {props.tab == 'following' ? 
          (isOwnProfile() ? "You are not following anyone yet." :
                             "User has not followed anyone yet.") : ''}
        </p>
      }
    </div>
  )
}

export default ProfileFollow