import React from "react"

import Page from "./Page"

function ViewSinglePost() {
  return (
    <Page title = 'Post Title'>
      <main className="py-5 behind">
      <div className="container container--narrow py-md-5">
        <div className="content-card">
          <div className="d-flex justify-content-between">
            <h2>Example Post Title</h2>
            {/** improvised UI section */}
            <div className="post-actions">
            {/**  Show only if current user is the author */}
                <a href="#" className="action-btn action-edit mr-2" title="Edit">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="#" className="action-btn action-delete" title="Delete">
                  <i className="fas fa-trash"></i>
                </a>
              </div>
            </div>

          <p className="text-muted small mb-4">
            <a href="#">
              <img className="avatar-tiny" src="https://gravatar.com/avatar/bbf83f8935b4d8c70600975d96ac33b9?s=128" />
            </a>
            Posted by <a href="#">anil</a> on 2/10/2025
          </p>

          <div className="body-content">
            <p>Lorem ipsum dolor sit <strong>example</strong> post adipisicing elit. Iure ea at esse, tempore qui possimus soluta impedit natus voluptate, sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat asperiores at.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quod asperiores corrupti omnis qui, placeat neque modi, dignissimos, ab exercitationem eligendi culpa explicabo nulla tempora rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea at esse, tempore qui possimus soluta impedit natus voluptate, sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat asperiores at.</p>
          </div>
       </div>
      </div>
    </main>
    </Page>
  )
}

export default ViewSinglePost