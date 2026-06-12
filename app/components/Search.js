import React, {useContext, useEffect} from 'react'
import {useImmer} from 'use-immer'
import Axios from 'axios'

import DispatchContext from '../DispatchContext'

function Search() {
  const appDispatch = useContext(DispatchContext)
  const [state, setState] = useImmer({
    searchTerm: '',
    results: [],
    show: 'neither',
    requestCount: 0
  })

  useEffect(() => {
    document.addEventListener('keyup', searchKeyPressHandler)

    return () => document.removeEventListener('keyup', searchKeyPressHandler)
  } , [])

  // collect the final Search Term, trigger another useEffect
  useEffect(() => {
   if(state.searchTerm.trim()) {
      setState(draft => {
        draft.show = 'loading'
      })  

      const delay = setTimeout(() => {
       setState(draft => {
        draft.requestCount++
       })
      }, 2000)

      return () => clearTimeout(delay)
    } else {
      setState(draft => {
        draft.show = 'neither'
      })
    }
  }, [state.searchTerm])

  // send an Axios request from here
  useEffect(() => {
    if(state.requestCount) {
      const ourRequest = new AbortController()
      async function fetchResults() {
        try {
          const response = await Axios.post('/search', {
            searchTerm: state.searchTerm
          }, {
            signal: ourRequest.signal
          })
          setState(draft => {
            draft.results = response.data
            draft.show = 'results'
          })
        } catch (e) {
          console.log(e)
        }
      }
      fetchResults()
      return () => ourRequest.abort() 
    }
  }, [state.requestCount])

  function searchKeyPressHandler(e) {
    if(e.key == "Escape") {
      appDispatch({type: 'closeSearch'})
    }
  }

  function handleSearch(e) {
    const value = e.target.value
    setState(draft => {
      draft.searchTerm = value
    })
  }

  return (
    <>
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input onChange={handleSearch} autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
          <span onClick={() => appDispatch({type: 'closeSearch'})} className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">

          <div className={"circle-loader " + 
            (state.show == 'loading' ? "circle-loader--visible" : "")}></div>

          <div className={"live-search-results " + 
            (state.show == 'results' ? "live-search-results--visible" : "")}>

            <div className="list-group shadow-sm">
              <div className="list-group-item active"><strong>Search Results</strong> <span className="small">(3 items)</span></div>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/bbf83f8935b4d8c70600975d96ac33b9?s=128" /> <strong>Example Post #1</strong>
                <span className="text-muted small">by anil on 12/01/2026 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" /> <strong>Example Post #2</strong>
                <span className="text-muted small">by barksalot on 22/01/2026 </span>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/bbf83f8935b4d8c70600975d96ac33b9?s=128" /> <strong>Example Post #3</strong>
                <span className="text-muted small">by anil on 21/01/2026 </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search