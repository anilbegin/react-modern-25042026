import React, {useState, useEffect, useContext} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import Axios from 'axios'

import LoadingDotsIcon from "./LoadingDotsIcon"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Page from "./Page"

function EditPost() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  const initialState = {
    title: {
      value: "",
      hasErrors: false,
      message: ""
    }, 
    body: {
      value: "",
      hasErrors: false,
      message: ""
    },
    isFetching: true, 
    isSaving: false,
    id: useParams().id,
    sendCount: 0
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function ourReducer(draft, action) {
    switch(action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title
        draft.body.value = action.value.body
        draft.isFetching = false
        return
      case "titleChange" :
        draft.title.value = action.value
        return
      case "bodyChange" :
        draft.body.value = action.value
        return
      case "saveChanges" :
        draft.sendCount++
        return
      case "saveRequestStarted" :
        draft.isSaving = true
        return
      case "saveRequestFinished" :
        draft.isSaving = false
        return          
    }
  }
    
  // fetching the post by ID on initial Page Load
  useEffect(() => {
    const ourRequest = new AbortController()
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, {
          signal : ourRequest.signal
        })
        if(response.data) {
          dispatch({type: 'fetchComplete', value: response.data})
        } else {
          console.log('There was a problem')
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchPost()
    // cancelling Axios request
    return () => ourRequest.abort() 
  } , [])

  // saveChanges - Send Request to Update the Post
  useEffect(() => {
    if(state.sendCount > 0) {
      dispatch({type: 'saveRequestStarted'})
      async function updatePost() {
        try {
          const response = await Axios.post(`/post/${state.id}/edit`, {
            title: state.title.value,
            body: state.body.value, 
            token: appState.user.token
          })
          dispatch({type: 'saveRequestFinished'})
          //  console.log(response) // response.data - success/failure
          if(response.data == 'success') {
            appDispatch({type: 'flashMessage', value: 'Post Updated Successfully.'})
          //  navigate(`/post/${state.id}`)
          } else {
            appDispatch({type: 'flashMessage', value: 'Update Failed! Please try again.'})
          }
        } catch (e) {
          console.log(e)
        }
      }
      updatePost()
    }
  } , [state.sendCount])

  function handleEdit(e) {
    e.preventDefault()
    dispatch({type: "saveChanges"})
  }

  if(state.isFetching) return (
    <Page title='...'>
      <LoadingDotsIcon />
    </Page>
  )

  return (
    <Page title='Edit Post'>
      <main className="py-5 behind">
        <div className="container container--narrow py-md-5">
          <form onSubmit={handleEdit}>
            <div className="form-group">
              <label htmlFor="post-title" className="text-muted mb-1">
                <small>Title</small>
              </label>
              <input value={state.title.value} onChange={e => dispatch({type:"titleChange", value: e.target.value})} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="post-body" className="text-muted mb-1 d-block">
                <small>Body Content</small>
              </label>
              <textarea value={state.body.value} onChange={e => dispatch({type: "bodyChange", value: e.target.value})} name="body" id="post-body" className="body-content tall-textarea form-control" type="text" />
            </div>
            <button className="btn btn-success" disabled={state.isSaving}>{state.isSaving ? 'Saving' : 'Save Changes'}</button>
          </form>
        </div>
      </main>
    </Page>
  )
}

export default EditPost