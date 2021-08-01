import React from "react"
import styled from "styled-components"
import { Label } from "../utils/typography"

export default function Thanks({ HandleModeChange }) {
  return (
    <div className="container">
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
              <img
                className="is-rounded"
                src="https://static.10ninox.com/goth/android-chrome-512x512.png"
              />
            </figure>
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src="https://static.10ninox.com/goth/android-chrome-512x512.png"
              />
            </figure>
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src="https://static.10ninox.com/goth/android-chrome-512x512.png"
              />
            </figure>
          </LogoContainer>
        </div>
      </div>
    </div>
  )
}

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`