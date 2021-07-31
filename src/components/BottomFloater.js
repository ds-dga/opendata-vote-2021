import React from "react"
import "./BottomFloater.css"

export default function BottomFloater(props) {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="cupcakeconsent"
      aria-describedby="cupcakeconsent:desc"
      className="bottom-float-window bottom-float-banner bottom-float-type-info bottom-float-theme-block bottom-float-bottom "
    >
      {props.child && props.child}
    </div>
  )
}
