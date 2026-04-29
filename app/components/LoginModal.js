import React, { useEffect } from "react"

function LoginModal({ show, onClose }) {
  // ESC key close
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose()
    }

    if (show) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden" // prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h3 className="mb-3">Sign In</h3>

        <form>
          <input autoFocus
            type="text"
            placeholder="Username"
            className="form-control mb-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
          />

          <button className="btn btn-success btn-block">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal