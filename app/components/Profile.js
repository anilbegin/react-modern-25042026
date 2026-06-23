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
        followerCount: 0, followingCount: 0, postCount: 0
      }
    }
  })
  
  // FETCH PROFILE DATA
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
  } , [username, appState.user.token])

  // FOLLOW USER
  useEffect(() => {
    if(state.startFollowingRequestCount) {
      setState(draft => {
        draft.followActionLoading = true
      })

      const ourRequest = new AbortController()

      async function followRequest() {
        try {
          const response = await Axios.post(`/addFollow/${state.profileData.profileUsername}`, {
            token: appState.user.token
          }, {
            signal: ourRequest.signal
          })
          setState(draft => {
            draft.profileData.isFollowing = true
            draft.profileData.counts.followerCount++
            draft.followActionLoading = false
          })
        } catch (e) {
          console.log('there was a problem.')
        }
      }
      followRequest()

      return () => ourRequest.abort()
    }
  }, [state.startFollowingRequestCount])

  // UNFOLLOW USER
  useEffect(() => {
    if(state.stopFollowingRequestCount) {
      setState(draft => {
        draft.followActionLoading = true
      })

      const ourRequest = new AbortController()

      async function unfollowRequest() {
        try {
          const response = await Axios.post(`/removeFollow/${state.profileData.profileUsername}`, {
            token: appState.user.token
          }, {
            signal: ourRequest.signal
          })
          setState(draft => {
            draft.profileData.isFollowing = false
            draft.profileData.counts.followerCount--
            draft.followActionLoading = false
          })
        } catch (e) {
          console.log('there was a problem.')
        }
      }
      unfollowRequest()

      return () => ourRequest.abort()
    }
  }, [state.stopFollowingRequestCount])

  // show the follow button Conditions that should to be TRUE
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

  // show the Unfollow button Conditions that should to be TRUE
  function showUnfollowButton() {
    if(appState.loggedIn &&
      appState.user.username != state.profileData.profileUsername &&
      state.profileData.isFollowing &&
      state.profileData.profileUsername != '...'
    ) {
      return true
    }
    return false
  }

  // trigger useEffect for Axios request - Start following User
  function startFollowing() {
    setState(draft => {
      draft.startFollowingRequestCount++
    })
  }

  // trigger useEffect for Axios request -  Unfollow User/Stop following User
  function stopFollowing() {
    setState(draft => {
      draft.stopFollowingRequestCount++
    })
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
                <button onClick={startFollowing}
                      disabled={state.followActionLoading}
                      className="btn btn-primary btn-sm ml-2">
                Follow 
                <i className="fas fa-user-plus"></i>
              </button>)}
              {showUnfollowButton() && (
                <button onClick={stopFollowing}
                      disabled={state.followActionLoading}
                      className="btn btn-danger btn-sm ml-2">
                Stop Following {' '}
                <i className="fas fa-user-times"></i>
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