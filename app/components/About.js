import React from "react"
import { Link } from "react-router-dom"
import Page from "./Page"

function About() {
  return (
  <Page title='About Us'>
    <main className="py-5 behind">
      <div className="container container--narrow">
        <div className="modern-card no-hover text-center">

          <div className="mb-3 generic-logo-size">
            <i className="fas fa-feather-alt"></i>
          </div>

          <h1 className="mb-2">About WriteSpace</h1>
          <p className="text-muted mb-4">Why we built this platform</p>

          <p className="lead mx-auto mb-4 about-p-1">
            We believe getting back to actually writing is the key to enjoying the internet again.
          </p>

          <div className="body-content text-left">
            <p>
              WriteSpace was created to bring back clarity in a noisy digital world.
              Instead of endless scrolling and distractions, we focus on meaningful writing
              and thoughtful ideas.
            </p>

            <p>
              Whether you're sharing insights, telling stories, or exploring new perspectives,
              WriteSpace gives you a clean environment to express yourself and connect with
              others who value substance over noise.
            </p>
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="btn btn-success mr-2">
              <i className="fas fa-pen mr-1"></i> Start Writing
            </Link>
          </div>

        </div>
      </div>
    </main>
  </Page>
 
  )
}

export default About