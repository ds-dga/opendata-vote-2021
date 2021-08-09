import React from "react"
import styled from "styled-components"
import { Label } from "../utils/typography"
import { Container } from "./First"
import LogoDataGo from "../logo/data-go-th.png"
import LogoDGA from "../logo/dga.png"
import LogoDigi from "../logo/digi.png"

export default function Thanks({ HandleModeChange }) {
  return (
    <Container className="container">
      <div className="columns">
        <Label className="column">
          <h2 className="title is-3">กิจกรรมสำรวจชุดข้อมูล Open data</h2>
        </Label>
        <div className="column"></div>
      </div>

      <div className="columns">
        <div className="column">
          <p>
            ทีมงานขอขอบคุณการมีส่วนร่วมของท่านเป็นอย่างยิ่ง
            ความเห็นของท่านในครั้งนี้จะนำไปผลักดันการพัฒนาข้อมูลเปิดภาครัฐต่อไป
          </p>
          <p>
            ท่านสามารถเข้าเยี่ยมชม และใช้งานศูนย์กลางข้อมูลเปิดภาครัฐได้ที่{" "}
            <a href="https://data.go.th">data.go.th</a>
          </p>
        </div>
      </div>
      <div className="columns">
        <div className="column is-narrow has-text-centered">
          <button
            className="button is-small is-warning is-light"
            onClick={() => {
              HandleModeChange({ mode: "", email: "", phone: "" })
            }}
          >
            เริ่มต้นใหม่
          </button>
        </div>
        <div className="column">
          <LogoContainer>
            <figure className="image is-128x128">
              <img alt="DGA" src={LogoDGA} />
            </figure>
            <figure className="image is-128x128">
              <img alt="Digi" src={LogoDigi} />
            </figure>
            <figure className="image is-128x128">
              <img alt="Data.go.th" src={LogoDataGo} />
            </figure>
          </LogoContainer>
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
