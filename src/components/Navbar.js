import React, { useState } from "react"
import digi from "../logo/digi.png"

export default function Navbar() {
  const [isExpanded, SetExpand] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://data.go.th">
          <img src={digi} height="28" alt="DIGI" />
        </a>

        <span
          role="button"
          className={`navbar-burger ${isExpanded ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          onClick={() => {
            SetExpand(!isExpanded)
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div
        id="navbar"
        className={`navbar-menu  ${isExpanded ? "is-active" : ""}`}
      >
        {/*  <div className="navbar-start">
         <span className="navbar-item">Home</span>
          <div className="navbar-item has-dropdown is-hoverable">
            <span className="navbar-link">More</span>
            <div className="navbar-dropdown">
              <span className="navbar-item">About</span>
              <span className="navbar-item">Jobs</span>
              <span className="navbar-item">Contact</span>
              <hr className="navbar-divider" />
              <span className="navbar-item">Report an issue</span>
            </div>
          </div>
        </div> */}

        {/* <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <span className="button is-primary">
                <strong>Sign up</strong>
              </span>
              <span className="button is-light">Log in</span>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  )
}
