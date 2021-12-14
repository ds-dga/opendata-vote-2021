import { gql, useMutation } from "@apollo/client"
import dayjs from "dayjs"
import React, { useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import ArrowDown from "../icons/ArrowDown"
import ArrowUp from "../icons/ArrowUp"

export default function Vote({ initialValue, datasetID, IP }) {
  const maxAge = 60 * 60 * 24 // 1 day in seconds
  const vID = `vote-${datasetID}`
  const timer = useRef()
  const [Point, setPoint] = useState(initialValue)
  const [Cookies, setCookies] = useCookies([vID])
  const [Action, setAction] = useState(null) // 3 states: up, down, -
  const [upsertVote, { data, loading }] = useMutation(
    MUTATE_DATASET_POINTS
  )

  useEffect(() => {
    // initial value translate --> Cookies to Action (UI) if applicant
    if (Action === null) {
      // only in initial state
      const val = +Cookies[vID] || 0
      switch (val) {
        case 1:
          setAction("up")
          break
        case -1:
          setAction("down")
          break
        default:
          setAction("-")
          break
      }
    }
  }, [Cookies, Action, vID])

  useEffect(() => {
    if (!data) return

    // confirm with mutation result -- change if needed
    try {
      const {
        insert_dataset_points: { returning },
      } = data
      const confirmObj = returning[0]
      if (confirmObj.point !== Point) {
        alert("IP ของคุณได้มีการโหวดแล้ววันนี้")
        setPoint(confirmObj.point)
      }
    } catch (e) {
      console.log("error: ", e)
    }
    // console.log("data changed: ", data)
    // console.log(" >>    point: ", Point)
  }, [data, Point])

  function calcVote(action) {
    const prevValue = +Cookies[vID] || 0
    let currValue = Point
    switch (action) {
      case "up":
        currValue = currValue + 1 + (prevValue === -1 ? 1 : 0)
        setCookies(vID, "1", { maxAge, sameSite: true })
        break
      case "down":
        currValue = currValue - 1 - (prevValue === 1 ? 1 : 0)
        setCookies(vID, "-1", { maxAge, sameSite: true })
        break
      default:
        if (prevValue > 0) {
          currValue--
        } else if (prevValue < 0) {
          currValue++
        }
        setCookies(vID, "0", { maxAge, sameSite: true })
    }
    setPoint(currValue)
    setAction(action)
    saveVote(action)
  }

  function saveVote(action) {
    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      // update vote to timer
      const today = dayjs().format("YYYY-MM-DD")
      const ownVal = action === "up" ? 1 : action === "down" ? -1 : 0
      const result = await upsertVote({
        variables: {
          votedBy: IP,
          point: ownVal,
          day: today,
          datasetID,
        },
      })
      console.log(` --> save ${action} by ${IP}`)
      console.log(" --> mutation result", Point, result)
    }, 2000)
  }

  const noActionAllowed = Action === null || loading

  return (
    <VoteBox>
      <div
        className={`arrow ${Action === "up" ? "up" : ""}`}
        onClick={() => {
          if (noActionAllowed) {
            alert("no action allow :", loading, Action)
            return
          }
          calcVote(Action === "up" ? "-" : "up")
        }}
      >
        <ArrowUp fill={""} />
      </div>
      <div className={`vote-number ${Action}`}>{Point}</div>
      <div
        className={`arrow ${Action === "down" ? "down" : ""}`}
        onClick={() => {
          if (noActionAllowed) {
            alert("no action allow :", loading, Action)
            return
          }
          calcVote(Action === "down" ? "-" : "down")
        }}
      >
        <ArrowDown fill={""} />
      </div>
    </VoteBox>
  )
}

const MUTATE_DATASET_POINTS = gql`
  mutation MUTATE_DATASET_POINTS(
    $votedBy: String!
    $point: Int!
    $day: date!
    $datasetID: uuid!
  ) {
    insert_dataset_points(
      objects: {
        voted_by: $votedBy
        point: $point
        day: $day
        dataset_id: $datasetID
      }
      on_conflict: {
        constraint: dataset_points_voted_by_day_dataset_id_key
        update_columns: point
      }
    ) {
      returning {
        point
        day
      }
    }
  }
`

const VoteBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 4ex;
  align-items: center;

  div.vote-number {
    font-size: 1.5rem;
    line-height: 1;
    color: #989898;
  }
  div.vote-number.up {
    color: #04ce2f;
  }
  div.vote-number.down {
    color: #ce0469;
  }
  div.arrow {
    font-size: 1.25rem;
    line-height: 1.25;
    color: #989898;
  }
  div.arrow.up {
    color: #04ce2f;
  }
  div.arrow.down {
    color: #ce0469;
  }
`
