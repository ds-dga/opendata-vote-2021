import React, { useState } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie"
import { Button } from "../utils/typography"
import BottomFloater from "./BottomFloater"
import Modal from "./Modal"
import TrashIcon from "../icons/TrashIcon"
import { FlexBox } from "./DatasetPicker"

export default function Summary({
  Mode,
  HandleModeChange,
  Selected,
  ToggleItem,
  ErrMsg,
}) {
  const [ModalVisible, SetModalVisible] = useState(false)
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" })
  const [cookies, setCookie] = useCookies(["mode", "email", "phone"])
  const total = Object.keys(Selected).length
  const maximum = 20

  const categories = Object.keys(Selected).map((k) => Selected[k].category)
  const distinctCategory = Array.from(new Set(categories))

  const onSubmit = (data) => {
    let result = []
    Object.keys(Selected).map((k) => {
      const t = data[`comment-${k}`]
      let o = {
        ...Selected[k],
        comment: t,
      }
      result.push(o)
      return o
    })
    let body = {
      result,
      email: "anonymous",
      phone: "-",
      timestamp: +new Date() / 1000,
    }
    if (cookies.mode === "lottery") {
      body["email"] = cookies.email
      body["phone"] = cookies.phone
    }
    console.log("onSubmit result: ", body)
    setCookie("mode", "confirm")
    // TODO: add mutation here
    HandleModeChange({ ...Mode, mode: "confirm" })
  }

  return (
    <>
      <Modal
        handleClose={() => SetModalVisible(false)}
        isActive={ModalVisible}
        footer={<></>}
        content={
          <Container>
            <h5 className="title is-5">ประเภทข้อมูล</h5>
            <FlexBox className="category">
              {distinctCategory.map((cat) => (
                <div key={`dc-${cat}`} className="card">
                  {cat} #{categories.filter((c) => c === cat).length}
                </div>
              ))}
            </FlexBox>
            <br />
            <h5 className="title is-5">รายการข้อมูลที่เลือก</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
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
                      </Button>
                      <div className="d">
                        <div>
                          {ind + 1}. {Selected[k].name}
                        </div>
                        <div className="field">
                          <div className="control">
                            <input
                              className="input"
                              type={`comment-${k}`}
                              placeholder={`ความเห็นเพิ่มเติม`}
                              {...register(`comment-${k}`)}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </UL>
              </div>

              <hr />
              <button
                className="button is-warning"
                type="button"
                onClick={() => {
                  setCookie("mode", "")
                  setCookie("email", "")
                  setCookie("phone", "")
                  HandleModeChange({ mode: "", email: "", phone: "" })
                }}
              >
                เริ่มต้นใหม่
              </button>
              <button
                className="button"
                type="button"
                onClick={() => {
                  SetModalVisible(false)
                  return
                }}
              >
                Back
              </button>
              {total > 0 && (
                <button
                  className="button is-success"
                  type="submit"
                  onClick={() => {
                    if (
                      !window.confirm(
                        "หลังจากยืนยันแล้ว หากต้องการเปลี่ยนแปลงจะต้องเริ่มต้นใหม่เท่านั้น \n\nยืนยันที่จะส่งความเห็นของท่าน?"
                      )
                    )
                      return
                  }}
                >
                  ส่งความเห็น
                </button>
              )}
            </form>
          </Container>
        }
      />
      <BottomFloater
        error={ErrMsg.length > 0}
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
                  {total > 0
                    ? "ตรวจสอบข้อมูลที่เลือกก่อนส่ง"
                    : "ดูรายการที่เลือกแล้ว"}
                </Button>
              </Small>
            </div>
            {ErrMsg.length > 0 && (
              <div className="bottom-float-error-message">{ErrMsg}</div>
            )}
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
    align-items: flex-start;

    div.d {
      margin-left: 0.5rem;
    }

    span {
      margin-left: 0.5rem;
    }
  }
`

const Container = styled.div`
  div.category {
    font-size: 0.8rem;
    display: flex;
    flex-wrap: wrap;
  }
  div.card {
    flex: 1 1 30%;
    margin: 3px;
    padding: 3px 10px;
    text-align: center;
    min-height: 2rem;
  }
`
