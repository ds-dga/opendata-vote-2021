import React from "react"
import { Routes, Route } from "react-router-dom"
import CategoryList from "../components/CategoryList"
import DatasetList from "../components/DatasetList"

export default function Category({ IP }) {
  return (
    <div className="columns">
      <div className="column is-full">
        <Title />
        <div className="content">
          <Routes>
            <Route path={""} element={<CategoryList />} />
            <Route path={":listID"} element={<DatasetList IP={IP} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function Title() {
  return (
    <section className="hero is-small">
      <div className="hero-body">
        <p className="title">รายการข้อมูลเปิดที่ประชาชนต้องการจากภาครัฐ</p>
        <p className="subtitle">ด้วยความร่วมมือจาก DIGI, DGA</p>
      </div>
    </section>
  )
}
