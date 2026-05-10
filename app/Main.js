import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

// my components
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import HeaderLoggedIn from './components/HeaderLoggedIn'
import HeaderLoggedOut from './components/HeaderLoggedOut'
import LoginModal from './components/LoginModal'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('xToken')))
  // login modal
  const [showModal, setShowModal] = useState(false)
  return (
    <BrowserRouter>
    <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}
            onOpenModal={() => setShowModal(true)} />
      <Routes>
        <Route path='/' element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path='/about' element={<About />} />
        <Route path='/terms' element={<Terms />} />
      </Routes>
      <LoginModal show={showModal} onClose={() => setShowModal(false)}
        setLoggedIn={setLoggedIn} 
      />
      <Footer />
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<Main />)