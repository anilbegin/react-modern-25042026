import React, {useState, useContext, useMemo} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

import Page from './Page'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const navigate = useNavigate()

  // Optional: Configure the toolbar buttons
  const editorOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
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

  async function handlePost(e) {
    e.preventDefault()
    try {
      const response = await Axios.post('/create-post', {
        title : title, 
        body : body,
        token: appState.user.token
      })
      console.log(response.data) // id of the new post
      if(response.data) {
        appDispatch({type: 'flashMessage', value: 'New Post Created.'})
        navigate(`/post/${response.data}`)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Page title='Create New Post'>
      <main className="py-5 behind">
        <div className="container container--narrow py-md-5">
          <form onSubmit={handlePost}>
            <div className="form-group">
              <label htmlFor="post-title" className="text-muted mb-1">
                <small>Title</small>
              </label>
              <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="post-body" className="text-muted mb-1 d-block">
                <small>Body Content</small>
              </label>
            {/*  <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea> */}
              {/* <SimpleMDE value={body} onChange={setBody} /> // cleaner */}
              <SimpleMDE value={body} onChange={value => setBody(value)} options={editorOptions} />
            </div>
          
            <button className="btn btn-success">Save New Post</button>
          </form>
        </div>
      </main>
    </Page>
  )
}

export default CreatePost