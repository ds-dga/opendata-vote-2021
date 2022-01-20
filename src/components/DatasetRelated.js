import { gql, useLazyQuery } from "@apollo/client"
import React from "react"
import styled from "styled-components"
import ArrowUp from "../icons/ArrowUp"
import Check from "../icons/Check"
import Stop from "../icons/Stop"

export default function DatasetRelated({ datasetID, count, items }) {
  const [loadRelatedItems, { called, loading, data }] = useLazyQuery(
    RELATED_ITEMS,
    { variables: { datasetID } }
  )
  return (
    <Box>
      {count > 0 && !called && (
        <div className="possible_matches">
          <div className="header">
            ข้อมูลที่ใกล้เคียงใน data.go.th
            {items.length == count && <> ({count} ชุดข้อมูล)</>}
          </div>
          <ul>
            {items.map((ele) => (
              <RelatedItem item={ele} key={ele.dataset_id} />
            ))}
          </ul>
          {items.length < +count && (
            <a
              className="moreItems"
              onClick={() => {
                loadRelatedItems()
              }}
            >
              <span>❖❖ </span>ดูข้อมูลใกล้เคียงทั้งหมด (รวม {count} ชุดข้อมูล)
            </a>
          )}
        </div>
      )}

      {called && (
        <>
          {loading && <p>Loading...</p>}
          {data && (
            <div className="possible_matches">
              <div className="header">
                ข้อมูลที่ใกล้เคียงใน data.go.th ({data.datago_link.length}{" "}
                ชุดข้อมูล)
              </div>
              <ul>
                {data.datago_link.map((ele) => (
                  <RelatedItem item={ele} key={ele.dataset_id} />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Box>
  )
}

function RelatedItem({ item }) {
  return (
    <li>
      <span className="good">
        <Check />
      </span>
      <span className="bad">
        <Stop />
      </span>
      <a href={`https://data.go.th/dataset/${item.package_id}`} target="_blank">
        {item.name}
      </a>
    </li>
  )
}

const RELATED_ITEMS = gql`
  query RELATED_ITEMS($datasetID: uuid!) {
    datago_link(
      where: { dataset_id: { _eq: $datasetID } }
      order_by: [{ feedbacks_aggregate: { sum: { point: desc_nulls_last } } }]
    ) {
      package_id
      name
      created_at
    }
  }
`

const Box = styled.div`
  .possible_matches {
    font-size: 0.85rem;
    margin-top: 1rem;

    border-left: 5px solid #ccc;
    padding-left: 0.5rem;

    ul {
      margin-top: 0;
      margin-bottom: 5;
    }
    li {
      margin-top: 0;
      transition: background-color 0.1s ease;
    }
    li > span {
      font-size: 1rem;
      margin: 0 5px;
    }
    li > span:hover {
      background: white;
    }
    li > span > svg {
      position: relative;
      // /* Adjust these values accordingly */
      top: 0.2rem;
    }
    li > span.good {
      color: rgba(1, 180, 20, 0.9);
    }
    li > span.bad {
      color: rgba(209, 20, 80, 0.9);
    }
    a {
      color: #333;
    }
    li:hover {
      background: rgba(65, 252, 127, 0.5);
    }

    .moreItems > span {
      color: #0982ed;
    }
  }
`
