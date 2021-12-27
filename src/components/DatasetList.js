import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import th from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import SearchField from "./SearchField";
import Vote from "./Vote";

dayjs.extend(buddhistEra);
dayjs.locale(th);

export default function DatasetList({ IP }) {
  const [Query, SetQuery] = useState("");
  const { data, loading, error, fetchMore } = useQuery(DATASET_QUERY, {
    variables: {
      offset: 0,
      limit: 7,
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
  });
  const count = (data && data.total.aggregate.count) || 0;
  const currTotal = (data && data.items.length) || 0;
  // const eof = count == 0 || (count > 0 && currTotal === count)
  return (
    <CardBox>
      {error && <p>Err! {error}...</p>}
      {loading && <p>Loading...</p>}
      <SearchField currentQuery={Query} handleQueryChange={SetQuery} />
      {data &&
        data.items.map((ele) => (
          <DatasetItem key={ele.id} item={ele} IP={IP} />
        ))}
      {/* {!eof && ( */}
      <LoadMoreComponent
        loading={loading}
        fetchMore={fetchMore}
        count={count}
        currentTotal={currTotal}
      />
      {/* )} */}
    </CardBox>
  );
}

export const LoadMoreComponent = ({
  loading,
  fetchMore,
  count,
  currentTotal,
}) => {
  if (loading) return <></>;
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
          fetchMore({ variables: { offset: currentTotal } });
        }}
      >
        Load more
      </div>
    );
  }
  return <></>;
};

function DatasetItem({ item, IP }) {
  const initPoint = item.points_aggregate.aggregate.sum.point || 0;
  let latestTmsp = null;
  if (item.points.length > 0) {
    latestTmsp = dayjs(item.points[0].day).format("DD MMM BBBB");
  }
  return (
    <div className="card">
      <div className="card-content">
        <Vote initialValue={initPoint} datasetID={item.id} IP={IP} />
        <div style={{ marginLeft: "1rem" }}>
          <div className="category">{item.category.name}</div>
          {item.name}
          {latestTmsp && (
            <div className="timestamp">โหวตล่าสุด {latestTmsp}</div>
          )}
        </div>
      </div>
    </div>
  );
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
`;

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
`;
