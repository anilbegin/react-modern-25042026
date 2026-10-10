import React, { useEffect } from "react"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | WriteSpace`
    window.scrollTo(0, 0)
  }, [props.title])
  return (
    <div className="main">
     {props.children} 
    </div>
  )
}

export default Page