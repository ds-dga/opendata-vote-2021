import React from "react"
import { useNavigate } from "react-router-dom"
import parse from "html-react-parser"
import dayjs from "dayjs"
import th from "dayjs/locale/th"
import buddhistEra from "dayjs/plugin/buddhistEra"
import Vote from "./Vote"
import styled from "styled-components"
import DatasetRelated from "./DatasetRelated"

dayjs.extend(buddhistEra)
dayjs.locale(th)

export default function DatasetItem({ item, IP, query, loading }) {
  const navigate = useNavigate()
  const initPoint = item.points_aggregate.aggregate.sum.point || 0
  let latestTmsp = null
  if (item.points.length > 0) {
    latestTmsp = dayjs(item.points[0].day).format("DD MMM BBBB")
  }
  const regEx = new RegExp(query, "ig")
  const replacer = "<mark>$&</mark>"

  const {
    possible_matches,
    matches_agg: {
      aggregate: { count: matches_count },
    },
  } = item
  return (
    <Box className="card">
      <div className="card-content">
        <Vote initialValue={initPoint} datasetID={item.id} IP={IP} />
        <div style={{ marginLeft: "1rem" }}>
          <div
            className="category"
            onClick={() => {
              navigate(`/list/${item.category.id}`)
            }}
          >
            {parse(item.category.name.replace(regEx, replacer))}
          </div>
          {parse(item.name.replace(regEx, replacer))}
          {latestTmsp && (
            <div className="timestamp">โหวตล่าสุด {latestTmsp}</div>
          )}
          <DatasetRelated
            datasetID={item.id}
            items={possible_matches}
            count={matches_count}
          />
        </div>
      </div>
    </Box>
  )
}

const Box = styled.div``
