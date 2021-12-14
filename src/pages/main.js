import React from "react"
import DatasetList from "../components/DatasetList"

export default function Main({ IP }) {
  return (
    <div className="columns">
      <div className="column is-full">
        <section className="hero is-small">
          <div className="hero-body">
            <p className="title">รายการข้อมูลเปิดที่ประชาชนต้องการจากภาครัฐ</p>
            <p className="subtitle">ด้วยความร่วมมือจาก DIGI, DGA</p>
          </div>
        </section>
        <div className="content">
          <DatasetList IP={IP} />
        </div>
      </div>
    </div>
  )
}
