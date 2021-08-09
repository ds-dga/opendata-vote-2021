import React, { Fragment, useEffect, useRef, useState } from "react"
import * as _ from "lodash"
import { H4, Label } from "../utils/typography"
import AvailableDataset from "../utils/dataset.json"
import SearchIcon from "../icons/SearchIcon"
import styled from "styled-components"
import Summary from "./Summary"
import { Container } from "./First"
import { LogoContainer } from "./Thanks"
import LogoDataGo from "../logo/data-go-th.png"
import LogoDGA from "../logo/dga.png"
import LogoDigi from "../logo/digi.png"

/*
no,name,frequency,topic,category
no,ชื่อชุดข้อมูลที่จะสำรวจ,ความละเอียดข้อมูล,C_เรื่องที่เกี่ยวกับข้อมูล,ประเภทข้อมูล
*/

export default function DatasetPicker({ HandleModeChange, Mode }) {
  const [Q, SetQ] = useState("")
  const [ErrMsg, SetErrMsg] = useState("")
  const [SelCat, SetCat] = useState("")
  const [Selected, SetSelection] = useState({})
  const searchInput = useRef(null)
  const [FilteredData, SetFilteredData] = useState(
    _.sortBy(AvailableDataset, ["category", "frequency"])
  )
  const [Category, SetCategory] = useState([])

  const reachMaxSelection = () => {
    if (Object.keys(Selected).length >= 20) {
      SetErrMsg("เลือกได้สูงสุด 20 รายการ")
      alert("เลือกได้สูงสุด 20 รายการ")
      return true
    }
    SetErrMsg("")
    return false
  }

  const addSelection = (item) => {
    if (reachMaxSelection()) return
    let a = {}
    a[item.no] = item
    SetSelection({
      ...Selected,
      ...a,
    })
  }
  const removeSelection = (item) => {
    SetErrMsg("")
    let a = { ...Selected }
    delete a[item.no]
    SetSelection({
      ...a,
    })
  }
  const ToggleItem = (item, checked) => {
    if (checked === undefined) {
      if (Selected[item.no] === undefined) {
        addSelection(item)
      } else {
        removeSelection(item)
      }
      return
    } else if (checked) {
      addSelection(item)
    } else {
      removeSelection(item)
    }
  }

  useEffect(() => {
    SetCategory(Array.from(new Set(FilteredData.map((i) => i.category))))
  }, [FilteredData])

  useEffect(() => {
    const catData = AvailableDataset.filter(
      (i) => `${i.category} ${i.name}`.indexOf(Q) > -1
    )
    SetFilteredData(_.sortBy(catData, ["category", "frequency"]))
  }, [Q])

  return (
    <Container className="container">
      <div className="columns">
        <Label className="column">
          <h2 className="title is-3">ร่วมกิจกรรมสำรวจชุดข้อมูล Open data</h2>
        </Label>
      </div>

      <Summary
        Selected={Selected}
        ToggleItem={ToggleItem}
        Mode={Mode}
        HandleModeChange={HandleModeChange}
        ErrMsg={ErrMsg}
      />

      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            defaultValue={Q}
            placeholder="ค้นหา..."
            onChange={(e) => {
              const v = e.target.value.trim()
              SetCat("")
              SetQ(v)
            }}
            autoComplete="off"
            ref={searchInput}
          />
          <span className="icon is-small is-left">
            <SearchIcon />
          </span>
        </p>
        <br />
        <p>
          คำอธิบาย:
          กรุณาเลือกประเภทข้อมูลและรายชื่อชุดข้อมูลที่ท่านสนใจในการนำมาเปิดเผยต่อสาธารณะ
        </p>
      </div>

      <H4 className="title is-5" fontWeight={600}>
        ประเภทข้อมูล
      </H4>
      <FlexBox>
        {Category.length === 0 && <p>ไม่พบข้อมูล</p>}
        {SelCat !== "" && (
          <>
            <nav
              className="breadcrumb has-arrow-separator"
              aria-label="breadcrumbs"
            >
              <ul>
                <li>
                  <a onClick={() => SetCat("")}>ย้อนกลับ</a>
                </li>
                <li className="is-active">
                  <a aria-current="page">{SelCat}</a>
                </li>
              </ul>
            </nav>
          </>
        )}
        {SelCat === "" &&
          Category.map((currCat, ind) => {
            return (
              <div
                key={`tile-${ind}`}
                className={`box ${SelCat === currCat ? "is-selected" : ""}`}
                onClick={() => {
                  SetCat(SelCat === currCat ? "" : currCat)
                }}
              >
                {/* <p className="title">{currCat}</p> */}
                {/* <p className="subtitle">{currCat}</p> */}
                <div className="content">{currCat}</div>
              </div>
            )
          })}
      </FlexBox>

      {/* {ErrMsg.length > 0 && (
        <article className="message is-danger">
          <div className="message-body">{ErrMsg}</div>
        </article>
      )} */}

      <Blocker height={"2rem"} />

      {SelCat.length !== 0 && (
        <OneCategoryList
          SelCat={SelCat}
          FilteredData={FilteredData}
          ToggleItem={ToggleItem}
          Selected={Selected}
        />
      )}

      <Blocker height={"3rem"} />
      <footer className="has-text-centered">
        <p>สนับสนุนกิจกรรมโดย</p>
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
      </footer>
      <Blocker height={"9rem"} />
    </Container>
  )
}

function OneCategoryList({ SelCat, FilteredData, ToggleItem, Selected }) {
  const items = _.sortBy(
    FilteredData.filter((i) => i.category === SelCat),
    ["frequency"]
  )
  return (
    <div className="columns">
      <div className="column">
        <div className="table-container">
          <table className="table is-narrow is-fullwidth is-hoverable is-bordered">
            <thead>
              <tr>
                <th>ชื่อชุดข้อมูล</th>
                <th>ความละเอียดข้อมูล</th>
                <th>Vote</th>
              </tr>
            </thead>
            <TBODY>
              {items.map((r) => (
                <tr
                  className={`${Selected[r.no] !== undefined ? "active" : ""}`}
                  key={`tr-${SelCat}-${r.no}`}
                  onClick={() => {
                    ToggleItem(r)
                  }}
                >
                  <td>{r.name}</td>
                  <td>{r.frequency}</td>
                  <td>
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={Selected[r.no] !== undefined}
                        onChange={(evt) => {
                          ToggleItem(r, evt.target.checked)
                        }}
                      />
                    </label>
                  </td>
                </tr>
              ))}
            </TBODY>
          </table>
        </div>
      </div>
    </div>
  )
}

/* function TableList({ Category, FilteredData, ToggleItem, Selected }) {
  return (
    <div className="columns">
      <div className="column">
        <div className="table-container">
          <table className="table is-narrow is-fullwidth is-hoverable is-bordered">
            <thead>
              <tr>
                <th>ประเภทข้อมูล</th>
                <th>ชื่อชุดข้อมูล</th>
                <th>ความละเอียดข้อมูล</th>
                <th>Vote</th>
              </tr>
            </thead>
            <tbody>
              {Category.map((currCat) => {
                const items = _.sortBy(
                  FilteredData.filter((i) => i.category === currCat),
                  ["frequency"]
                )
                if (items.length === 0) {
                  return <></>
                }
                const first = items[0]
                const firstRow = (
                  <tr
                    key={`tr-${currCat}-${first.no}`}
                    onClick={() => {
                      ToggleItem(first)
                    }}
                  >
                    <td rowSpan={items.length}>{first.category}</td>
                    <td>{first.name}</td>
                    <td>{first.frequency}</td>
                    <td>
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={Selected[first.no] !== undefined}
                          onChange={(evt) => {
                            ToggleItem(first, evt.target.checked)
                          }}
                        />
                      </label>
                    </td>
                  </tr>
                )

                return (
                  <Fragment key={`f-${currCat}`}>
                    {firstRow}
                    {items.splice(1).map((r) => (
                      <tr
                        key={`tr-${currCat}-${r.no}`}
                        onClick={() => {
                          ToggleItem(r)
                        }}
                      >
                        <td>{r.name}</td>
                        <td>{r.frequency}</td>
                        <td>
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              checked={Selected[r.no] !== undefined}
                              onChange={(evt) => {
                                ToggleItem(r, evt.target.checked)
                              }}
                            />
                          </label>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} */

const Blocker = styled.div`
  height: ${(props) => props.height || "7rem"};
`

export const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;

  div.box {
    flex: 1 1 200px;
    margin: 0.2rem;
    cursor: pointer;
  }

  div.box.is-selected {
    background-color: #fffaeb !important;
  }
`

const TBODY = styled.tbody`
  tr {
    cursor: pointer;
  }

  tr.active {
    background-color: #fffaeb;
  }
`
