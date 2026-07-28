import React, {useState} from "react"
import Axios from 'axios'
import {useImmerReducer} from 'use-immer'

import Page from "./Page"

function HomeGuest() {
  const initialState = {
    username: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  }

  function ourReducer(draft, action) {
    switch(action.type) {
      case "usernameImmediately":
        draft.username.hasErrors = false
        draft.username.value = action.value
        return
      case "usernameAfterDelay":
        return
      case "usernameUniqueResults":
        return
      case "emailImmediately":
        return
      case "emailAfterDelay":
        return
      case "emailUniqueResults":
        return
      case "passwordImmediately":
        return
      case "passwordAfterDelay":
        return
      case "submitForm":
        return               
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

 function handleRegister(e) {
    e.preventDefault()
    
  }
  return (
    <Page title='Home'>
      { /** hero Section */ }
      <div className="hero">
        <div className="container hero-inner">
          
         {  /** LEFT CONTENT */ }
          <div className="hero-text">
            <h1>Write like it matters.</h1>
            <p>
              Slow down. Think clearly. Share ideas that actually mean something.  
              This is a place for real writing — not noise.
            </p>
          </div>
          
        {  /** RIGHT FORM */ }
           
          <div className="hero-card">
            <h4>Create your account</h4>
            
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <input onChange={e => dispatch({type: "usernameImmediately", value: e.target.value})} 
                className="form-control" type="text" placeholder="Username" />
              </div>

              <div className="form-group">
                <input onChange={e => dispatch({type: "emailImmediately", value: e.target.value})} 
                className="form-control" type="text" placeholder="Email" />
              </div>

              <div className="form-group">
                <input onChange={e => dispatch({type: "passwordImmediately", value: e.target.value})} 
                className="form-control" type="password" placeholder="Password" />
              </div>

              <button className="btn btn-success btn-block btn-lg mt-3">
                Get Started
              </button>
            </form>
          </div>

        </div>
      </div>
      { /** End of New Hero Section */ }
      
      {  /** SOCIAL PROOF */ }
      <section className="py-5 text-center bg-white">
        <div className="container">
          <p className="text-muted mb-4">Trusted by writers worldwide</p>

          
          <div className="d-flex justify-content-center flex-wrap">
            <span className="text-muted mx-3">Medium</span>
            <span className="text-muted mx-3">Substack</span>
            <span className="text-muted mx-3">Dev.to</span>
          </div>
        </div>
      </section>

      { /** FEATURES */ }
      <section className="py-5 features-section">
        <div className="container">
          <div className="text-center mb-5">
            
            <h2 className="font-weight-bold">Why WriteSpace?</h2>
            <p className="text-muted">Built for clarity, not noise.</p>
          </div>

          
          <div className="row">
        {    /** feature cards */ }
            <div className="col-md-4 mb-4">
              <div className="modern-card h-100">
                <h5>Distraction Free</h5>
                <p>Focus on writing without clutter.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="modern-card h-100">
                <h5>Real Audience</h5>
                <p>Reach readers who care about depth.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="modern-card h-100">
                <h5>Clean Design</h5>
                <p>Minimal UI that puts content first.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      { /** START - Why we exist section /* a short summary from About-us page  */  }
      <section className="py-5" id="bottom">
        <div className="container text-center">

          <div className="mb-3 generic-logo-size">
            <i className="fas fa-feather-alt"></i>
          </div>

          <h2 className="font-weight-bold mb-3">Our Philosophy</h2>

          <p className="lead text-muted mx-auto max-content">
            We believe getting back to actually writing is the key to enjoying the internet again.
          </p>

          <div className="mx-auto mt-4 max-content-2">
            <p className="text-muted">
              In a world filled with noise, endless scrolling, and distractions,
              WriteSpace brings the focus back to meaningful writing and thoughtful ideas.
            </p>

            <p className="text-muted">
              Whether you're sharing insights or telling stories, this is a place where
              your words matter more than algorithms.
            </p>
          </div>

        </div>
      </section>  
      { /** END - of Why we exist section  */ }
      { /** CTA */ }
      <section className="cta-section text-center">
        <div className="container">
          <h2 className="font-weight-bold mb-3">Start writing today</h2>
          <p className="mb-4">Join a platform that values thoughtful content.</p>
          { /**  <button className="btn btn-success btn-lg">Create Account</button> */ }
          <a href="#top" className="btn btn-success btn-lg">Create Account</a>
        </div>
      </section> 
    </Page>
  )
}

export default HomeGuest