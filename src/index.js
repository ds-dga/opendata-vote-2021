import React from "react"
import ReactDOM from "react-dom"
import ReactGA from "react-ga4"
import { CookiesProvider } from "react-cookie"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "../node_modules/bulma/css/bulma.css"
// import reportWebVitals from "./reportWebVitals";

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
