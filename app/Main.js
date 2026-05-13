import React, {useState, useReducer} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
import { useImmerReducer } from 'use-immer'
Axios.defaults.baseURL = 'http://localhost:8080'

// my components
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import HeaderLoggedIn from './components/HeaderLoggedIn'
import HeaderLoggedOut from './components/HeaderLoggedOut'
import LoginModal from './components/LoginModal'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

function Main() {
  const initalState = {
    loggedIn : Boolean(localStorage.getItem('xToken')),
    flashMessages : [],
    showModal : false
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initalState)

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login' :
        draft.loggedIn = true
        return
      case 'logout' :
        draft.loggedIn = false
        return
      case 'flashMessage' :
        draft.flashMessages.push(action.value)
        return
      case 'openModal' :
        draft.showModal = true
        return
      case 'closeModal' :
        draft.showModal = false
        return 
    }
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>  
        <BrowserRouter>
          <Header />
          <FlashMessages messages={state.flashMessages} />
          <Routes>
            <Route path='/' element={state.loggedIn ? <Home /> : <HomeGuest />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/post/:id' element={<ViewSinglePost />} />
            <Route path='/about' element={<About />} />
            <Route path='/terms' element={<Terms />} />
          </Routes>
          <LoginModal />
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>  
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<Main />)