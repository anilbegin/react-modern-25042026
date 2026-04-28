import React from "react"
import { Link } from "react-router-dom"

import Page from "./Page"

function Terms() {
  return (
    <Page title='Terms'>
      <main className="py-5 behind">
        <div className="container container--narrow">
          <div className="modern-card no-hover">

            <h1 className="mb-2">Terms & Conditions</h1>
            <p className="text-muted mb-3">Please read these terms carefully before using WriteSpace.</p>
            <p className="small text-muted mb-4">Last updated: April 2026</p>

            <div className="body-content">

              <p>
                By using WriteSpace, you agree to use the platform responsibly and respectfully.
                You are responsible for the content you publish and the interactions you have with others.
              </p>

              <h4 className="mt-5 mb-3">User Responsibilities</h4>
              <p>
                You agree not to post harmful, abusive, or illegal content. Any misuse of the platform
                may result in account suspension or removal.
              </p>

              <h4 className="mt-4 mb-3">Content Ownership</h4>
              <p>
                You retain ownership of the content you create. However, by posting on WriteSpace,
                you grant us permission to display and distribute your content within the platform.
              </p>

              <h4 className="mt-4 mb-3">Account Security</h4>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>

              <h4 className="mt-4 mb-3">Changes to Terms</h4>
              <p>
                We may update these terms occasionally. Continued use of the platform means you accept
                the updated terms.
              </p>

            </div>

            <div className="text-center mt-5">
              <Link to ="/" className="btn btn-success">
                Agree & Get Started
              </Link>
            </div>

          </div>
        </div>
      </main>
    </Page>
  )
}

export default Terms