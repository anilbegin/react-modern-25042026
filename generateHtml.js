import React from "react"
import ReactDOMServer from "react-dom/server"
import fs from "fs"
import Footer from "./app/components/Footer"
import Header from "./app/components/Header"
import LoadingDotsIcon from "./app/components/LoadingDotsIcon"
import { StaticRouter as Router } from "react-router"
import StateContext from "./app/StateContext"

function Shell() {
  return (
    <StateContext.Provider value={{ loggedIn: false }}>
      <Router>
        <Header staticEmpty={true} />
        <div className="py-5 my-5 text-center">
          <LoadingDotsIcon />
        </div>
        <Footer />
      </Router>
    </StateContext.Provider>
  )
}

const startOfHTML = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>WriteSpace</title>
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300,400,400i,700,700i&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
      <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" integrity="sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0" crossorigin="anonymous"></script>
  
      <link rel="stylesheet" href="/main.css" />
    </head>
    <body>
      <div id="app">`

const endOfHTML = `</div>
    </body>
  </html>`

// Use Node tools to setup a ..
// stream we can write to that saves to a file on our hard drive

const fileName = "./app/index-template.html"
const writeStream = fs.createWriteStream(fileName)

const html = ReactDOMServer.renderToString(<Shell />)

// Add the start of our HTML template to the stream
writeStream.write(startOfHTML)
// Add the actual React generated HTML to the stream.
writeStream.write(html)
writeStream.end(endOfHTML)

console.log("HTML generated successfully")