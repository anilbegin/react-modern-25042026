import React, {useEffect, useContext} from 'react'
import Page from './Page'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import ProfilePosts from './ProfilePosts'
import StateContext from '../StateContext'

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsername: "...",
      profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
      isFollowing: false,
      counts: {
        followerCount: '..', followingCount: '..', postCount: '..'
      }
    }
  })
  
  // Profile Data fetch
  useEffect(() => {
    const ourRequest = new AbortController()
    async function loadProfile() {
      try {
        const response = await Axios.post(`/profile/${username}`, {
          token: appState.user.token
        }, { signal : ourRequest.signal })

        if(response.data) {
        //  console.log(response.data)
        //  setProfileData(response.data)
        setState(draft => {
          draft.profileData = response.data
        })
        } else {
          console.log('Invalid Username')
        }
      } catch (e) {
        console.log(e)
      }
    }
    loadProfile()
    return () => ourRequest.abort()
  } , [username])

  function showFollowButton() {
    if(appState.loggedIn &&
      appState.user.username != state.profileData.profileUsername &&
      !state.profileData.isFollowing &&
      state.profileData.profileUsername != '...'
    ) {
      return true
    }
    return false
  }

  return (
    <Page title={state.profileData.profileUsername == '...' ?
     'Profile..' : appState.user.username == state.profileData.profileUsername ?
      'Your Profile' : (state.profileData.profileUsername + ('\'s Profile'))}>
      <main className="py-5 behind">
        <div className="container container--narrow py-md-5">
          <div className="modern-card no-hover">
            <h2>
              <img className="avatar-small" src={state.profileData.profileAvatar} /> {state.profileData.profileUsername}
              {showFollowButton() && (
                <button className="btn btn-primary btn-sm ml-2">
                Follow 
                <i className="fas fa-user-plus"></i>
              </button>)}
            </h2>

            <div className="profile-nav nav nav-tabs pt-2 mb-4 nav-fill">
              <a href="#" className="nav-item nav-link active">
                Posts: {state.profileData.counts.postCount}
              </a>
              <a href="#" className="nav-item nav-link">
                Followers: {state.profileData.counts.followerCount}
              </a>
              <a href="#" className="nav-item nav-link">
                Following: {state.profileData.counts.followingCount}
              </a>
            </div>

          <ProfilePosts />  
          </div>  
        </div>
      </main>
    </Page>
  )
}

export default Profile