import React from "react"
import { Link } from "react-router-dom"

import Page from "./Page"

function NotFound() {
  return (
    <Page title="Not Found">
      <main className="py-5 behind">
        <div className="container container--narrow py-md-5">
          <div className="text-center">
            <h2>Whoops, we cannot find that page.</h2>
            <p className="lead text-muted">You can always visit the <Link to="/">homepage</Link> to get a fresh start.</p>
          </div>
        </div>
      </main>
    </Page>
  )
}

export default NotFound