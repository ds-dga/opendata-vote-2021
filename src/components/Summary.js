import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../utils/typography"
import BottomFloater from "./BottomFloater"
import Modal from "./Modal"
import TrashIcon from "../icons/TrashIcon"

export default function Summary({ Selected, ToggleItem }) {
  const [ModalVisible, SetModalVisible] = useState(false)
  const total = Object.keys(Selected).length
  const maximum = 20
  return (
    <>
      <Modal
        handleClose={() => SetModalVisible(false)}
        isActive={ModalVisible}
        footer={
          <button className="button" onClick={() => SetModalVisible(false)}>
            Close
          </button>
        }
        content={
          <>
            <UL>
              {total === 0 && <p>ยังไม่ได้เลือกรายการใดๆ</p>}
              {Object.keys(Selected).map((k, ind) => (
                <li key={`sel-${k}`}>
                  <Button
                    className={"button is-danger is-light is-normal"}
                    onClick={() => {
                      ToggleItem(Selected[k], false)
                    }}
                  >
                    <TrashIcon />
                  </Button>{" "}
                  <span>
                    {ind + 1}. {Selected[k].name}
                  </span>
                </li>
              ))}
            </UL>
          </>
        }
      />
      <BottomFloater
        child={
          <>
            <div className="bottom-float-message">
              จำนวนที่เลือก
              <Number>
                {total} / {maximum}
              </Number>
              <Small>
                <Button
                  className={"button is-small is-outlined is-link"}
                  onClick={() => {
                    SetModalVisible(true)
                  }}
                >
                  ดูรายการที่เลือกแล้ว
                </Button>
              </Small>
            </div>
            <div className="bottom-float-compliance"></div>
          </>
        }
      />
    </>
  )
}

const Number = styled.span`
  font-size: 2rem;
  margin-inline-start: 1rem;
  margin-inline-end: 1rem;
`

const Small = styled.span`
  display: block;
  font-size: 0.8rem;
`

const UL = styled.ul`
  li {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      margin-left: 0.5rem;
    }
  }
`
