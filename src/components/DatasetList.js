import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import styled from "styled-components"
import ArrowDown from "../icons/ArrowDown"
import ArrowUp from "../icons/ArrowUp"

export default function DatasetList() {
  const [Query, SetQuery] = useState("")
  const { data, loading, error, fetchMore } = useQuery(DATASET_QUERY, {
    variables: {
      offset: 0,
      limit: 3,
      where:
        Query.length === 0
          ? {}
          : {
              _or: [
                { name: { _ilike: `%${Query}%` } },
                { category: { name: { _ilike: `%${Query}%` } } },
              ],
            },
    },
  })
  const count = (data && data.total.aggregate.count) || 0
  const currTotal = (data && data.items.length) || 0
  // const eof = count == 0 || (count > 0 && currTotal === count)
  return (
    <CardBox>
      {error && <p>Err! {error}...</p>}
      {loading && <p>Loading...</p>}
      {data && data.items.map((ele) => <DatasetItem key={ele.id} item={ele} />)}
      {/* {!eof && ( */}
      <LoadMoreComponent
        loading={loading}
        fetchMore={fetchMore}
        count={count}
        currentTotal={currTotal}
      />
      {/* )} */}
    </CardBox>
  )
}

export const LoadMoreComponent = ({
  loading,
  fetchMore,
  count,
  currentTotal,
}) => {
  if (loading) return <></>
  if (count > currentTotal) {
    return (
      <div
        className="card"
        style={{
          width: "90%",
          marginBottom: 5,
          padding: 10,
          textAlign: "center",
          backgroundColor: "#e8fcfc",
        }}
        onClick={() => {
          fetchMore({ variables: { offset: currentTotal + 1 } })
        }}
      >
        Load more
      </div>
    )
  }
  return <></>
}

function DatasetItem({ item }) {
  return (
    <div className="card">
      <div className="card-content">
        <VoteBox>
          <ArrowUp fill={"green"} height={"1.25rem"} width={"1.25rem"} />
          <div className="vote-number">5</div>
          <ArrowDown height={"1.25rem"} width={"1.25rem"} />
        </VoteBox>
        <div style={{ marginLeft: "1rem" }}>
          <div className="category">{item.category.name}</div>
          {item.name}
        </div>
      </div>
      {/* <div className="card-footer"></div> */}
    </div>
  )
}

const VoteBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 4ex;
  align-items: center;

  div.vote-number {
    font-size: 2rem;
    line-height: 1;
    color: #989898;
  }
`

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  div.card {
    margin-bottom: 0.5rem;

    div.card-content {
      display: flex;

      div.category {
        color: #aaaaaa;
        font-style: italic;
        font-size: 0.95rem;
      }
    }
  }
`

const DATASET_QUERY = gql`
  query DATASET_QUERY($where: dataset_bool_exp!, $offset: Int!, $limit: Int!) {
    items: dataset(
      limit: $limit
      offset: $offset
      where: $where
      order_by: [
        { points_aggregate: { sum: { point: desc } } }
        { created_at: desc }
      ]
    ) {
      id
      name
      category {
        id
        name
      }
      points_aggregate {
        aggregate {
          sum {
            point
          }
        }
      }
    }
    total: dataset_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`
