import React from "react"

export default function Modal({ isActive, handleClose, content, footer, header }) {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        {header && (
          <header className="modal-card-head">
            {header}
            {/* <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button> */}
          </header>
        )}
        <section className="modal-card-body">{content}</section>
        {footer && (
          <footer className="modal-card-foot">
            {footer}
            {/* <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button> */}
          </footer>
        )}
      </div>
      <button class="modal-close is-large" aria-label="close" onClick={() => handleClose()}></button>
    </div>
  )
}
