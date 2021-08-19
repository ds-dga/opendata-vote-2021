import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { useCookies } from "react-cookie"
import ReactGA from "react-ga4"
import EmailIcon from "../icons/EmailIcon"
import TelephoneIcon from "../icons/TelephoneIcon"
import FacebookIcon from "../icons/FacebookIcon"
import { Button, Label } from "../utils/typography"
import { LogoContainer } from "./Thanks"
import LogoDataGo from "../logo/data-go-th.png"
import LogoDGA from "../logo/dga.png"
import LogoDigi from "../logo/digi.png"
import "./First.css"

export default function First({ HandleModeChange }) {
  const [cookies, setCookie] = useCookies([
    "mode",
    "email",
    "phone",
    "facebook",
  ])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: cookies.email || "",
    },
  })

  const onSubmit = (data) => {
    ReactGA.event({
      category: "interaction",
      action: "register",
      label: "lottery",
    })
    setCookie("mode", "lottery", { sameSite: "Strict" })
    setCookie("email", data.email, { sameSite: "Strict" })
    setCookie("phone", data.phone, { sameSite: "Strict" })
    setCookie("facebook", data.facebook, { sameSite: "Strict" })
    HandleModeChange({ mode: "lottery", ...data })
  }

  useEffect(() => {
    ReactGA.pageview("/")
  }, [])

  return (
    <Container className="container">
      <Intro />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="columns">
          <div className="column is-1">
            <Label fontWeight={600}>เข้าร่วมกิจกรรม</Label>
          </div>
          <div className="column">
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
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="ชื่อใน Facebook"
                  {...register("facebook", {
                    required: false,
                  })}
                />
                <span className="icon is-small is-left">
                  <FacebookIcon />
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* <div className="column"></div> */}
        <div className="columns">
          <div className="column">
            <ButtonContainer className="buttons are-medium is-centered">
              <Button
                className="button is-mushy-blue"
                fontWeight={600}
                type="submit"
                disabled={Object.keys(errors).length > 0}
              >
                ลงทะเบียน
                <br />
                รับของรางวัล
              </Button>
              <Button
                className="button is-light-gray"
                fontWeight={600}
                onClick={async () => {
                  // if (!window.confirm("ท่านไม่ประสงค์จะรับรางวัลนะครับ?"))
                  //   return
                  ReactGA.event({
                    category: "interaction",
                    action: "register",
                    label: "anonymous",
                  })
                  setCookie("mode", `anonymous`, { sameSite: "Strict" })
                  setCookie("email", "", { sameSite: "Strict" })
                  setCookie("phone", "", { sameSite: "Strict" })
                  HandleModeChange({ mode: "anonymous" })
                }}
              >
                โหวตเลย
                <br />
                โดยไม่รับของรางวัล
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
      <div className="columns">
        <Label className="column is-1" fontWeight={600}>
          ที่มา
        </Label>
        <div className="column is-three-quarters">
          <p>
            จากการรวบรวมความต้องการ Open data ในหน่วยงานราชการ
            แสดงให้เห็นถึงรายการข้อมูล Open data
            ที่สามารถใช้ประกอบการวิเคราะห์และต่อยอดในการทำงานของหน่วยงานราชการอื่นๆ
            ได้
          </p>
          <p>
            สำนักพัฒนารัฐบาลดิจิทัล (องค์การมหาชน) ในฐานะผู้ผลักดันการนำข้อมูล
            Open data ไปใช้ประโยชน์ จึงจัดกิจกรรมนี้ขึ้น
            เพื่อให้ประชาชนมีส่วนร่วมในการแสดงความเห็นรายชื่อชุดข้อมูลที่ควรค่าในการนำมาเปิดเผยต่อสาธารณะ
            และเป็นส่วนหนึ่งในการผลักดันการพัฒนาอย่างยั่งยืน
          </p>
        </div>
      </div>
      <div className="columns">
        <Label className="column is-1" fontWeight={600}>
          กติกา
        </Label>
        <div className="column is-three-quarters">
          <ul>
            <li>สามารถโหวตได้ท่านละไม่เกิน 20 รายการ</li>
            <li>เริ่มสำรวจตั้งแต่วันที่ 16 สิงหาคม - 27 กันยายน 2564</li>
            <li>
              สุ่มจับรางวัลจาก email และเบอร์โทรศัพท์ที่ท่านลงทะเบียนเท่านั้น
            </li>
            <li>
              ประกาศผลรางวัลที่{" "}
              <a href="https://data.go.th">https://data.go.th</a> ในวันที่ 30
              กันยายน 2564
            </li>
            <li>
              กรณีที่ท่านเป็นผู้โชคดี
              เจ้าหน้าที่จะทำการติดต่อกลับไปเพื่อนำส่งของรางวัล
            </li>
          </ul>
        </div>
      </div>
      <div className="columns">
        <Label className="column is-narrow" fontWeight={600}>
          รางวัล
        </Label>
        <div className="column is-three-quarters">
          <p>Voucher แทนเงินสด Big C : 200 บาท 25 รางวัล 1 ท่านต่อ 1 สิทธิ์</p>
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
  padding-top: 10px;

  @media screen and (max-width: 1024px) {
    padding-right: 5px;
    padding-left: 5px;
  }
`
