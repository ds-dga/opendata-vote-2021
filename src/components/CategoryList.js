import React, { useState } from "react"
import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export default function CategoryList() {
  let navigate = useNavigate()
  const { data, loading } = useQuery(CATEGORY_QUERY)

  return (
    <CardBox>
      <CardTitle>กลุ่มข้อมูล</CardTitle>
      {data &&
        data.items.map((ele) => (
          <div
            className="card"
            key={`cat-${ele.id}`}
            onClick={() => {
              navigate(`/list/${ele.id}`)
            }}
          >
            <div className="card-content">
              <div style={{ marginLeft: "1rem" }}>{ele.name}</div>
            </div>
          </div>
        ))}
    </CardBox>
  )
}

const CATEGORY_QUERY = gql`
  query CATEGORY_QUERY {
    items: dataset_category {
      id
      name
    }
  }
`

const CardTitle = styled.div`
  padding-left: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  font-style: italic;
  border-bottom: 2px solid #ccc;
  margin-bottom: 5px;
  background: rgba(183, 183, 183, 0.3);
`

const CardBox = styled.div`
  display: flex;
  flex-direction: column;

  div.card {
    margin-bottom: 0.3rem;

    div.card-content {
      display: flex;
      padding: 0.4rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 1.05rem;
      cursor: pointer;

      div.timestamp {
        margin-top: 5px;
        color: #aaaaaa;
        font-style: italic;
        font-size: 0.85rem;
      }
    }

    :hover {
      background: rgba(204, 238, 252, 0.5);
      transition: background-color 200ms linear;
    }
  }
`
