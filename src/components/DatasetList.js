import React, { useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import SearchField from "./SearchField"
import DatasetItem from "./DatasetItem"

export default function DatasetList({ IP }) {
  let { listID } = useParams()
  const navigate = useNavigate()
  const [GlobalLoading, SetGlobalLoading] = useState(false)
  const [Query, SetQuery] = useState("")
  let where = {}
  if (listID) {
    where =
      Query.length === 0
        ? { category: { id: { _eq: listID } } }
        : {
            _and: [
              { name: { _ilike: `%${Query}%` } },
              { category: { id: { _eq: listID } } },
            ],
          }
  } else {
    where =
      Query.length === 0
        ? {}
        : {
            _or: [
              { name: { _ilike: `%${Query}%` } },
              { category: { name: { _ilike: `%${Query}%` } } },
            ],
          }
  }
  const { data, loading, error, fetchMore } = useQuery(DATASET_QUERY, {
    variables: { offset: 0, limit: 10, where },
  })

  useEffect(() => {
    SetGlobalLoading(loading)
  }, [loading])

  const count = (data && data.total.aggregate.count) || 0
  const currTotal = (data && data.items.length) || 0
  return (
    <CardBox>
      {error && <div>Err! {error}...</div>}
      <SearchField
        loading={loading}
        handleGlobalLoading={SetGlobalLoading}
        currentQuery={Query}
        handleQueryChange={SetQuery}
      />
      {listID && data && (
        <span className="tag is-warning is-medium">
          {data.items[0].category.name}
          <button
            className="delete is-small"
            onClick={() => {
              navigate("/")
            }}
          ></button>
        </span>
      )}
      {data &&
        data.items.map((ele) => (
          <DatasetItem
            key={ele.id}
            item={ele}
            IP={IP}
            query={Query}
            loading={GlobalLoading}
          />
        ))}
      <LoadMoreComponent
        loading={loading}
        fetchMore={fetchMore}
        count={count}
        currentTotal={currTotal}
      />
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
          // width: "90%",
          marginBottom: 5,
          padding: 10,
          textAlign: "center",
          backgroundColor: "#e8fcfc",
        }}
        onClick={() => {
          fetchMore({ variables: { offset: currentTotal } })
        }}
      >
        แสดงเพิ่มเติม
      </div>
    )
  }
  return (
    <div
      style={{
        marginBottom: 5,
        padding: 5,
        textAlign: "center",
        background: "transparent",
        color: "#bbbbbb",
        fontSize: "3rem",
      }}
    >
      ~
    </div>
  )
}

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  div.card {
    margin-bottom: 0.5rem;

    div.card-content {
      display: flex;
      padding: 0.4rem;

      div.category {
        color: #aaaaaa;
        font-style: italic;
        font-size: 0.95rem;
      }

      div.timestamp {
        margin-top: 5px;
        color: #aaaaaa;
        font-style: italic;
        font-size: 0.85rem;
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
        { points_aggregate: { sum: { point: desc_nulls_last } } }
        { id: asc }
      ]
    ) {
      id
      name
      category {
        id
        name
      }
      points(order_by: [{ day: desc }], limit: 1) {
        day
      }
      possible_matches(
        limit: 2
        order_by: [{ feedbacks_aggregate: { sum: { point: desc_nulls_last } } }]
      ) {
        name
        package_id
      }
      matches_agg: possible_matches_aggregate {
        aggregate {
          count
        }
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
