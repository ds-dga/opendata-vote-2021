import React, { useEffect } from "react"
import styled from "styled-components"
import ReactGA, { OutboundLink } from "react-ga4"
import { Button } from "../utils/typography"
import { Container } from "./First"
import ThanksJpeg from "../logo/thanks.jpg"
import "./First.css"

export default function Thanks({ HandleModeChange, setCookie }) {
  useEffect(() => {
    ReactGA.pageview("/thanks")
  }, [])
  return (
    <Container className="container">
      <div className="columns">
        <div className="column">
          <figure className="image">
            <img src={ThanksJpeg} alt="Thank you" />
          </figure>
          <br />
          <p>
            ทีมงานขอขอบคุณการมีส่วนร่วมของท่านเป็นอย่างยิ่ง
            ความเห็นของท่านในครั้งนี้จะนำไปผลักดันการพัฒนาข้อมูลเปิดภาครัฐต่อไป
          </p>
          <p>
            ท่านสามารถเข้าเยี่ยมชม และใช้งานศูนย์กลางข้อมูลเปิดภาครัฐได้ที่{" "}
            <OutboundLink eventLabel="data.go.th" to="https://data.go.th">
              data.go.th
            </OutboundLink>
          </p>
        </div>
      </div>
      <div className="columns">
        <div className="column is-narrow has-text-centered">
          <Button
            fontWeight={600}
            className="button is-warning is-blank"
            onClick={() => {
              ReactGA.event({
                category: "interaction",
                action: "reset",
                label: "start over",
              })
              setCookie("mode", "", { sameSite: "Strict" })
              setCookie("email", "", { sameSite: "Strict" })
              setCookie("phone", "", { sameSite: "Strict" })
              setCookie("facebook", "", { sameSite: "Strict" })
              HandleModeChange({ mode: "", email: "", phone: "", facebook: "" })
            }}
          >
            เริ่มต้นใหม่
          </Button>
        </div>
      </div>
    </Container>
  )
}

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  figure.image {
    display: grid;
    align-content: center;
  }
`
