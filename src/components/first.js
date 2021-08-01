import React from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { useCookies } from "react-cookie"
import EmailIcon from "../icons/EmailIcon"
import TelephoneIcon from "../icons/TelephoneIcon"
import { Button, Label } from "../utils/typography"
import { LogoContainer } from "./Thanks"

export default function First({ HandleModeChange }) {
  const [cookies, setCookie] = useCookies(["mode", "email", "phone"])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" })
  const onSubmit = (data) => {
    setCookie("mode", "lottery")
    setCookie("email", data.email)
    setCookie("phone", data.phone)
    HandleModeChange({ mode: "lottery", ...data })
  }
  return (
    <Container className="container">
      <Intro />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="columns">
          <div className="column is-narrow">
            <Label>เข้าร่วมกิจกรรม</Label>
          </div>
          <div className="column is-narrow">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^([\w_.+]+)@(.*?)\.(.*?)[.\w]+$/i,
                  })}
                />
                <span className="icon is-small is-left">
                  <EmailIcon />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
              {errors.email?.type === "required" && (
                <p className="has-text-danger is-size-7">
                  Email เป็นฟิลด์จำเป็น
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="has-text-danger is-size-7">
                  Email format is not correct.
                </p>
              )}
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="เบอร์โทรศัพท์มือถือ"
                  {...register("phone", {
                    required: true,
                    pattern: /^0\d\d\d\d\d\d\d\d\d?$/i,
                  })}
                />
                <span className="icon is-small is-left">
                  <TelephoneIcon />
                </span>
              </p>
              {errors.phone?.type === "required" && (
                <p className="has-text-danger is-size-7">
                  โทรศัพท์เป็นฟิลด์จำเป็น
                </p>
              )}
              {errors.phone?.type === "pattern" && (
                <p className="has-text-danger is-size-7">
                  ตัวอย่าง 081 123 4567
                </p>
              )}
            </div>
          </div>
          {/* <div className="column"></div> */}
          <div className="column">
            <ButtonContainer className="buttons are-medium is-centered">
              <Button
                className="button is-primary"
                type="submit"
                disabled={Object.keys(errors).length > 0}
              >
                ลงทะเบียนเข้าร่วม
                <br />
                กิจกรรมและรับรางวัล
              </Button>
              <Button
                className="button is-link"
                onClick={async () => {
                  if (!window.confirm("ท่านไม่ประสงค์จะรับรางวัลนะครับ?"))
                    return

                  setCookie("mode", "anonymous")
                  setCookie("email", "")
                  setCookie("phone", "")
                  HandleModeChange({ mode: "anonymous" })
                }}
              >
                ลงทะเบียนเข้าร่วม
                <br />
                ไม่ประสงค์รับรางวัล
              </Button>
            </ButtonContainer>
          </div>
        </div>
      </form>
    </Container>
  )
}

function Intro() {
  return (
    <>
      <div className="columns">
        <Label className="column">
          <h2 className="title is-3">ร่วมกิจกรรมสำรวจชุดข้อมูล Open data</h2>
        </Label>
        <div className="column">
          <LogoContainer>
            <figure className="image is-96x96">
              <img
                className="is-rounded"
                src="https://static.10ninox.com/goth/android-chrome-512x512.png"
              />
            </figure>
            <figure className="image is-96x96">
              <img
                className="is-rounded"
                src="https://static.10ninox.com/goth/android-chrome-512x512.png"
              />
            </figure>
            <figure className="image is-96x96">
              <img
                className="is-rounded"
                src="https://static.10ninox.com/goth/android-chrome-512x512.png"
              />
            </figure>
          </LogoContainer>
        </div>
      </div>
      <div className="columns">
        <Label className="column has-text-right is-narrow">ที่มา</Label>
        <div className="column is-three-quarters">
          จากการรวบรวมความต้องการ Open data ในหน่วยงานราชการ
          แสดงให้เห้นถึงรายการข้อมูล Open data
          ที่สามารถใช้ประกอบการทำงานและนำไปใช้วิเคราะห์ต่อยอดในการทำงานของหน่วยงานราชการอื่นๆ
          ได้ สำนักพัฒนารัฐบาลดิจิทัล (องค์การมหาชน) ในฐานะผู้ผลักดันการนำข้อมูล
          Open data ไปใช้ประโยชน์ จึงจัดกิจกรรมนี้ขึ้น
          เพื่อให้ประชาชนมีส่วนร่วมในการแสดงความเห็นรายชื่อชุดข้อมูลที่ควรค่าในการนำมาเปิดเผยต่อสาธารณะ
          และเป็นส่วนหนึ่งในการผลักดันการพัฒนาอย่างยั่งยืน
        </div>
      </div>
      <div className="columns">
        <Label className="column has-text-right is-narrow">กติกา</Label>
        <div className="column is-three-quarters">
          <ul>
            <li>ให้ Vote คนละ 20 รายการ</li>
            <li>สามารถแสดงความเห็นได้อย่างเต็มที่</li>
            <li>
              ระยะเวลาสำรวจ 1 เดือนตั้งแต่วันที่ * สิงหาคม - ** กันยายน 2564
            </li>
            <li>
              จับรางวัลจากการสุ่ม โดยจะจับจาก email
              และเบอร์โทรศัพท์ที่ลงทะเบียนเท่านั้น
            </li>
            <li>ประกาศผลการจับฉลากที่ data.go.th ในวันที่ *** กันยายน 2564</li>
            <li>เจ้าหน้าที่ทำการติดตามเพื่อส่งของรางวัล (กรณีเป็นสิ่งของ)</li>
          </ul>
        </div>
      </div>
    </>
  )
}

const ButtonContainer = styled.div`
  button {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`

export const Container = styled.div`
  @media screen and (max-width: 1024px) {
    padding-right: 5px;
    padding-left: 5px;
  }
`
