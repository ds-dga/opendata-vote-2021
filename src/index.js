import React from "react"
import ReactDOM from "react-dom"
import ReactGA from "react-ga"
import { CookiesProvider } from "react-cookie"
import App from "./App"
// import reportWebVitals from "./reportWebVitals";
import "../node_modules/bulma/css/bulma.css"

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
  debug: process.env.NODE_ENV !== "production",
})

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
