import React, {useRef, useState, useReducer, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
import { CSSTransition } from 'react-transition-group'
import { useImmerReducer } from 'use-immer'
Axios.defaults.baseURL = 'http://localhost:8080'

// my components
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import HeaderLoggedIn from './components/HeaderLoggedIn'
// import HeaderLoggedOut from './components/HeaderLoggedOut'
import LoginModal from './components/LoginModal'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import EditPost from './components/EditPost'
import Search from './components/Search'
//import Chat from './components/Chat'
const Chat = React.lazy(() => import("./components/Chat"))
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import FlashMessages from './components/FlashMessages'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

function Main() {
  const searchRef = useRef(null)

  const initalState = {
    loggedIn : Boolean(localStorage.getItem('xToken')),
    user : {
      avatar : localStorage.getItem('xAvatar'),
      token : localStorage.getItem('xToken'),
      username : localStorage.getItem('xUsername')
    },
    flashMessages : [],
    showModal : false,
    isSearchOpen : false,
    isChatOpen : false,
    unreadChatCount: 0
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initalState)

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login' :
        draft.loggedIn = true
        draft.user = action.data
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
      case 'openSearch' :
        draft.isSearchOpen = true
        return
      case 'closeSearch' :
        draft.isSearchOpen = false
        return    
      case 'toggleChat' :
        draft.isChatOpen = !draft.isChatOpen
        return
      case 'closeChat' :
        draft.isChatOpen = false
        return  
      case 'incrementUnreadChatCount':
        draft.unreadChatCount++
        return
      case 'clearUnreadChatCount':
        draft.unreadChatCount = 0
        return    
    }
  }

  useEffect(() => {
    if(state.loggedIn) {
      localStorage.setItem('xAvatar', state.user.avatar)
      localStorage.setItem('xToken', state.user.token)
      localStorage.setItem('xUsername', state.user.username)
    } else {
      localStorage.removeItem('xAvatar')
      localStorage.removeItem('xToken')
      localStorage.removeItem('xUsername')
    }
  } , [state.loggedIn])

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
            <Route path='/post/:id/edit' element={<EditPost />} />
            <Route path='/profile/:username/*' element={<Profile />} />
            <Route path='/about' element={<About />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <LoginModal />
          <CSSTransition nodeRef={searchRef} in={state.isSearchOpen} timeout={330} 
          classNames="search-overlay" unmountOnExit>
            <div ref={searchRef} className='search-overlay'>
              <Search />
            </div>
          </CSSTransition>
          {state.loggedIn && <Chat />}
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>  
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<Main />)