import React from "react"
import styled from "styled-components"
import "./BottomFloater.css"

export default function BottomFloater(props) {
  return (
    <DIV
      role="dialog"
      aria-live="polite"
      aria-label="cupcakeconsent"
      aria-describedby="cupcakeconsent:desc"
      className={`bottom-float-window bottom-float-banner bottom-float-type-info bottom-float-theme-block bottom-float-bottom ${
        props.error ? "bottom-float-is-danger" : ""
      }`}
    >
      {props.child && props.child}
    </DIV>
  )
}

const DIV = styled.div`
  background-color: #62ace0;
  color: #ffffff;
  text-align: center;

  .button {
    background-color: #ffffff;
    border-color: transparent;
    color: #000000;
    font-weight: 600;
    box-shadow: 0 1px 1px 0 rgba(33, 33, 33, 0.05),
      0 1px 1px 0 rgba(33, 33, 33, 0.05);
  }
  .button:hover {
    background-color: #ffffffe1;
    border-color: transparent;
    color: #000000;
    font-weight: 600;
  }
`
