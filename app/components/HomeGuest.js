import React, {useState, useEffect, useContext} from "react"
import Axios from 'axios'
import {useImmerReducer} from 'use-immer'
import Page from "./Page"
import DispatchContext from '../DispatchContext'

function HomeGuest() {
  const appDispatch = useContext(DispatchContext)

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
      message: "",
      isValid: false
    },
    submitCount: 0
  }

  function ourReducer(draft, action) {
    switch(action.type) {
      case "usernameImmediately":
        draft.username.hasErrors = false
        draft.username.value = action.value
        draft.username.isUnique = false
        if(draft.username.value.length > 20) {
          draft.username.hasErrors = true
          draft.username.message = "Username cannot exceed 20 characters"
        }
        if(draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasErrors = true
          draft.username.message = "Username can only contain letters and numbers"
        }
        return
      case "usernameAfterDelay":
        if(draft.username.value.length < 4) {
          draft.username.hasErrors = true
          draft.username.message = "Username should be atleast 4 characters"
        }
        if(!draft.username.hasErrors) {
          draft.username.checkCount++
        }
        return
      case "usernameUniqueResults":
        if(action.value) {
          draft.username.hasErrors = true
          draft.username.isUnique = false
          draft.username.message = "This username is already taken"
        } else {
          draft.username.isUnique = true
          draft.username.message = "This username is available"
        }
        return
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.isUnique = false
        draft.email.value = action.value
        return
      case "emailAfterDelay":
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "Please provide a valid email address"
        }
        if(!draft.email.hasErrors) {
          draft.email.checkCount++
        }
        return
      case "emailUniqueResults":
        if(action.value) {
          draft.email.hasErrors = true
          draft.email.isUnique = false
          draft.email.message = "This email is already in use"
        } else {
          draft.email.isUnique = true
          draft.email.message = "This email is available"
        }
        return
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.value = action.value
        draft.password.isValid = false
        if(draft.password.value.length > 20) {
          draft.password.hasErrors = true
          draft.password.message = "Password cannot exceed 20 characters"
        }
        return
      case "passwordAfterDelay":
        if(draft.password.value.length < 6) {
          draft.password.hasErrors = true
          draft.password.message = "Password cannot be less then 6 characters"
        }
        if(!draft.password.hasErrors) 
          draft.password.isValid = true
        
        return
      case "submitForm":
        if(!draft.username.hasErrors && draft.username.isUnique &&
          !draft.email.hasErrors && draft.email.isUnique &&
          !draft.password.hasErrors
        ) {
        //  console.log("Form submit!!")
          draft.submitCount++
        }
        // else { // Used for Debugging
        //   console.log(`usernameErrors: ${draft.username.hasErrors}\n
        //     usernameisUnique: ${draft.username.isUnique}\n
        //     emailErrors: ${draft.email.hasErrors}\n
        //     emailisUnique: ${draft.email.isUnique}\n
        //     passwordErrors: ${draft.password.hasErrors}\n`)
        // }
        return               
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  // WAIT 800ms after the user types to check char length
  useEffect(() => {
    if(state.username.value) {
        const delay = setTimeout(() => {
        dispatch({type: "usernameAfterDelay"})
      }, 800)

      return () => clearTimeout(delay)
    }
  }, [state.username.value])

  // WAIT 800ms after the user types into the EMAIL field
  useEffect(() => {
    if(state.email.value) {
      const delay = setTimeout(() => {
        dispatch({type: "emailAfterDelay"})
      }, 800)

      return () => clearTimeout(delay)
    }
  }, [state.email.value])  

  // WAIT 1000s before checking If PASSWORD is atleast 6 characters
  useEffect(() => {
    if(state.password.value) {
      const delay = setTimeout(() => {
        dispatch({type: "passwordAfterDelay"})
      }, 1000)

      return () => clearTimeout(delay)
    }
  }, [state.password.value])

  // CHECK if a USERNAME already EXISTS in Database
  useEffect(() => {
    if(state.username.checkCount) {
      const ourRequest = new AbortController()
      async function checkUsernameExists() {
        try {
          const response = await Axios.post('/doesUsernameExist', {
            username: state.username.value
          }, {
            signal: ourRequest.signal
          })
          //console.log(response)
          dispatch({type: "usernameUniqueResults", value: response.data})
        } catch (e) {
          console.log('there was a problem')
        }
      }
      checkUsernameExists()
      return () => ourRequest.abort()
    }
  }, [state.username.checkCount])

  // CHECK if the EMAIL already EXISTS in Database
  useEffect(() => {
    if(state.email.checkCount) {
      const ourRequest = new AbortController()
      async function checkEmailExists() {
        try {
          const response = await Axios.post('/doesEmailExist', {
            email: state.email.value
          }, {
            signal: ourRequest.signal
          })
          //console.log(response)
          dispatch({type: "emailUniqueResults", value: response.data})
        } catch (e) {
          console.log('there was a problem')
        }
      }
      checkEmailExists()
      return () => ourRequest.abort()
    }
  }, [state.email.checkCount])

  // FINAL REGISTER USER, SEND REQUEST TO BACKEND
  useEffect(() => {
    if(state.submitCount) {
      const ourRequest = new AbortController()
      async function registerUser() {
        try {
          const response = await Axios.post("/register", {
            username: state.username.value,
            email: state.email.value,
            password: state.password.value
          }, {
            signal: ourRequest.signal
          })
          console.log(response) // check console OP
          appDispatch({type: "login", data: response.data})
          appDispatch({type: "flashMessage", value: "Congrats! Welcome to your new Account."})

        } catch (e) {
          console.log('there was a problem')
        }
      }
      registerUser()

      return () => ourRequest.abort()
    }
  }, [state.submitCount])

 function handleRegister(e) {
    e.preventDefault()
    dispatch({type: "usernameAfterDelay"})
    dispatch({type: "emailAfterDelay"})
    dispatch({type: "passwordAfterDelay"})
    dispatch({type: "submitForm"})
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
                className={"form-control " + 
                (state.username.hasErrors 
                      ? "is-invalid"
                      : state.username.isUnique
                      ? "is-valid"
                      : "")}
                      type="text" placeholder="Username" />
                {state.username.hasErrors && (
                  <div className="invalid-feedback">
                  {state.username.message}
                  </div>
                )}
                {!state.username.hasErrors && state.username.isUnique && (
                  <div className="valid-feedback">
                   {state.username.message}
                  </div>   
                )}
              </div>

              <div className="form-group">
                <input onChange={e => dispatch({type: "emailImmediately", value: e.target.value})} 
                className={"form-control " + (state.email.hasErrors 
                  ? "is-invalid"
                  : state.email.isUnique
                  ? "is-valid" 
                  : "")} type="text" placeholder="Email" />
                {state.email.hasErrors && (
                  <div className="invalid-feedback">
                    {state.email.message}
                  </div>
                )}  
                {!state.email.hasErrors && state.email.isUnique && (
                  <div className="valid-feedback">
                   {state.email.message}
                  </div>   
                )}
              </div>

              <div className="form-group">
                <input onChange={e => dispatch({type: "passwordImmediately", value: e.target.value})} 
                className={"form-control " + (
                  state.password.hasErrors ? "is-invalid" 
                  : state.password.isValid ? "is-valid" : "")}
                type="password" placeholder="Password" />
                {state.password.hasErrors && (
                  <div className="invalid-feedback">
                    {state.password.message}
                  </div>
                )}
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