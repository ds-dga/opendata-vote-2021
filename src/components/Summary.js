import React, { useState } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie"
import { gql, useMutation } from "@apollo/client"
import { Button, H4 } from "../utils/typography"
import BottomFloater from "./BottomFloater"
import Modal from "./Modal"
import TrashIcon from "../icons/TrashIcon"
import "./First.css"

export default function Summary({
  Mode,
  HandleModeChange,
  Selected,
  ToggleItem,
  ErrMsg,
  SetErrMsg,
}) {
  const [ModalVisible, SetModalVisible] = useState(false)
  const [sendResult] = useMutation(UPSERT_RESULT)
  const { register, handleSubmit } = useForm({ mode: "onChange" })
  const [cookies, setCookie] = useCookies(["mode", "email", "phone"])
  const total = Object.keys(Selected).length
  const maximum = 20

  const categories = Object.keys(Selected).map((k) => Selected[k].category)
  const distinctCategory = Array.from(new Set(categories))

  const onSubmit = async (data) => {
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
      email: `anonymous-${+new Date()}`,
      phone: "-",
      timestamp: new Date().toISOString(),
    }
    console.log(body)
    if (cookies.mode === "lottery") {
      body["email"] = cookies.email
      body["phone"] = cookies.phone
      body["facebook"] = cookies.facebook
    }
    console.log("onSubmit result: ", body)
    // TODO: add mutation here

    try {
      const resp = await sendResult({ variables: body })
      if (resp.data) {
        setCookie("mode", "confirm")
        HandleModeChange({ ...Mode, mode: "confirm" })
      }
    } catch (e) {
      SetErrMsg(e)
    }
  }

  return (
    <>
      <Modal
        handleClose={() => SetModalVisible(false)}
        isActive={ModalVisible}
        footer={<></>}
        content={
          <Container>
            <H4 fontWeight={600} className="title is-5">
              ประเภทข้อมูล
            </H4>
            <FlexBox className="category">
              {distinctCategory.map((cat) => (
                <div key={`dc-${cat}`} className="card">
                  {cat} #{categories.filter((c) => c === cat).length}
                </div>
              ))}
            </FlexBox>
            <br />
            <H4 fontWeight={600} className="title is-5">
              รายการข้อมูลที่เลือก
            </H4>
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
              <FlexBox>
                {total > 0 && (
                  <Button
                    fontWeight={600}
                    className="button is-mushy-blue"
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
                  </Button>
                )}
                <Button
                  fontWeight={600}
                  className="button is-light-gray"
                  type="button"
                  onClick={() => {
                    SetModalVisible(false)
                    return
                  }}
                >
                  Back
                </Button>
                <Button
                  fontWeight={600}
                  className="button is-warning is-blank"
                  type="button"
                  onClick={() => {
                    setCookie("mode", "")
                    setCookie("email", "")
                    setCookie("phone", "")
                    setCookie("facebook", "")
                    HandleModeChange({
                      mode: "",
                      email: "",
                      phone: "",
                      facebook: "",
                    })
                  }}
                >
                  เริ่มต้นใหม่
                </Button>
              </FlexBox>

              {ErrMsg.length > 0 && (
                <div className="bottom-float-error-message">{ErrMsg}</div>
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
                  className={"button"}
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
      flex: 1;
      margin-left: 0.9rem;
      div:first-child {
        margin-top: 0.5rem;
      }
      div {
        margin-bottom: 0.7rem;
      }
    }

    span {
      margin-left: 0.5rem;
    }
  }
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
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
const UPSERT_RESULT = gql`
  mutation UPSERT_RESULT(
    $email: String!
    $phone: String!
    $facebook: String
    $result: json!
    $timestamp: timestamptz!
  ) {
    insert_opendata_popular_vote_one(
      object: {
        email: $email
        phone: $phone
        facebook: $facebook
        result: $result
        timestamp: $timestamp
      }
      on_conflict: {
        constraint: popular_vote_email_key
        update_columns: [phone, facebook, result, timestamp]
      }
    ) {
      id
      created_at
    }
  }
`
