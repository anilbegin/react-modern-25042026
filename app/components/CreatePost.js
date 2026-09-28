import React, {useState, useContext, useMemo, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useImmerReducer } from 'use-immer'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

import Page from './Page'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'

function CreatePost() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const navigate = useNavigate()

  const initialState = {
    title : {
      value: '',
      hasErrors: false,
      message: ''
    },
    body : {
      value: '',
      hasErrors: false,
      message: ''
    },
    sendCount: 0,
    isSaving: false
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function ourReducer(draft, action) {
    switch(action.type) {
      case 'titleChange':
        draft.title.hasErrors = false
        draft.title.value = action.value
        return
      case 'titleCheck':
        if(!draft.title.value.trim()) {
          draft.title.hasErrors = true
          draft.title.message = 'Please enter valid title'
        }
        return  
      case 'bodyChange':
        draft.body.hasErrors = false
        draft.body.value = action.value
        return
      case 'bodyCheck':
        if(!draft.body.value.trim()) {
          draft.body.hasErrors = true
          draft.body.message = "Body field cannot be left blank"
        }
        return  
      case 'saveChanges':
        if(!draft.title.hasErrors && !draft.body.hasErrors) {
          draft.sendCount++
        }          
        return  
      case 'saveRequestStarted' :
        draft.isSaving = true
        return
      case 'saveRequestFinished' :
        draft.isSaving = false
        return      
    }
  }

  useEffect(() => {
    if(state.sendCount > 0) {
      dispatch({type: 'saveRequestStarted'})
      async function createPost() {
        try {
          const response = await Axios.post('/create-post', {
            title : state.title.value, 
            body : state.body.value,
            token: appState.user.token
          })
          dispatch({type: 'saveRequestFinished'})
        //  console.log(response.data) // id of the new post
        //  console.log(typeof response.data) // is "string" if post ID
          // is "object" if server returns Array of Error Messages
          if(typeof response.data == "string") {
            appDispatch({type: 'flashMessage', value: 'Congrats! New Post Created.'})
            navigate(`/post/${response.data}`)
          } else {
            appDispatch({type: 'flashMessage', 
              value: 'Error! Please try again later.', 
              error: true})
            console.log('There was a problem')
          }
        } catch (e) {
          // Faulty Network Connection
          dispatch({type: 'saveRequestFinished'})
          appDispatch({type: 'flashMessage',
            value: 'Network Error! Please try again later.',
            error: true
          })
          console.log(e)
        }
      }
      createPost()
    }
  }, [state.sendCount])

  function handlePost(e) {
    e.preventDefault()
    dispatch({type: "titleCheck"})
    dispatch({type: "bodyCheck"})
    dispatch({type: "saveChanges"})
  }

  // Optional: Configure the toolbar buttons
  const editorOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      status: false, // line and word counter (on bottom right) disabled
      placeholder: "Type your post content here...",
      toolbar : [
        "bold",
        "italic",
        "heading",
        "|",
        "unordered-list",
        "ordered-list",
        "|",
        "undo",
        "redo"
      ]
    }
  }, [])

  // Choice of tools that can be added to the "toolbar" Array - below.
  // "bold", "italic", "heading", "quote", "unordered-list", "ordered-list", "clean-block", 
  // "link", "image", "table", "horizontal-rule", "preview", "side-by-side", "fullscreen", "guide".  

  return (
    <Page title='Create New Post'>
      <main className="py-5 behind">
        <div className="container container--narrow py-md-5">
          <form onSubmit={handlePost}>
            <div className="form-group">
              <label htmlFor="post-title" className="text-muted mb-1">
                <small>Title</small>
              </label>
              <input value={state.title.value} 
              onChange={e => dispatch({type: "titleChange", value: e.target.value})} 
              onBlur={e => dispatch({type: "titleCheck"})}
              autoFocus name="title" id="post-title" 
              className={"form-control form-control-lg form-control-title " + 
              (state.title.hasErrors ? "is-invalid" : "")} 
              type="text" placeholder="" autoComplete="off" />

              {state.title.hasErrors && (
                <div className="invalid-feedback">{state.title.message}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="post-body" className="text-muted mb-1 d-block">
                <small>Body Content</small>
              </label>
            {/*  <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea> */}
              {/* <SimpleMDE value={body} onChange={setBody} /> // cleaner */}
              <div className={state.body.hasErrors ? "editor-invalid" : ""}>  
                <SimpleMDE 
                value={state.body.value} 
                onChange={value => dispatch({type: "bodyChange", value: value})}
                onBlur={() => dispatch({type: "bodyCheck"})} 
                options={editorOptions} 
                className="body-content"
                />

                {state.body.hasErrors && (
                    <div className="invalid-feedback d-block">
                      {state.body.message}
                    </div>
                  )}
              </div>     
            </div>
          
            <button className="btn btn-success"
              disabled={state.isSaving}>
              {state.isSaving ? 'Saving...':'Save New Post'}
            </button>
          </form>
        </div>
      </main>
    </Page>
  )
}

export default CreatePost