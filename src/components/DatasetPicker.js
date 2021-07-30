import React, { useEffect, useRef, useState } from "react";
import * as _ from "lodash";
import { Label } from "../utils/typography";
import AvailableDataset from "../utils/dataset.json";
import SearchIcon from "../icons/SearchIcon";

/*
no,name,frequency,topic,category
no,ชื่อชุดข้อมูลที่จะสำรวจ,ความละเอียดข้อมูล,C_เรื่องที่เกี่ยวกับข้อมูล,ประเภทข้อมูล
*/

export default function DatasetPicker() {
  const [Q, SetQ] = useState("");
  const [selected, SetSelected] = useState({});
  const searchInput = useRef(null);
  const [FilteredData, SetFilteredData] = useState(
    _.sortBy(AvailableDataset, ["category", "frequency"])
  );
  const [Category, SetCategory] = useState([]);

  useEffect(() => {
    SetCategory(Array.from(new Set(FilteredData.map((i) => i.category))));
  }, [FilteredData]);

  function handleFilter() {
    console.log("filter search ", Q);
    const catData = AvailableDataset.filter(
      (i) => `${i.category} ${i.name}`.indexOf(Q) > -1
    );

    SetFilteredData(_.sortBy(catData, ["category", "frequency"]));
  }

  useEffect(() => {
    console.log("input search ", Q);
    handleFilter();
  }, [Q]);

  return (
    <div className="container">
      <div className="columns">
        <Label className="column">
          <h2 className="title is-3">ร่วมกิจกรรมสำรวจชุดข้อมูล Open data</h2>
        </Label>
      </div>

      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input is-large"
            type="text"
            defaultValue={Q}
            placeholder="ค้นหา..."
            onChange={(e) => {
              const v = e.target.value.trim();
              SetQ(v);
            }}
            autoComplete="off"
            ref={searchInput}
          />
          <span className="icon is-small is-left">
            <SearchIcon />
          </span>
        </p>
      </div>

      <div className="columns">
        <div className="column">
          <div className="table-container">
            <table className="table is-narrow is-fullwidth is-hoverable is-bordered">
              <thead>
                <tr>
                  <th>ประเภทข้อมูล</th>
                  <th>ชื่อชุดข้อมูล</th>
                  <th>ความละเอียดข้อมูล</th>
                  <th>Vote</th>
                </tr>
              </thead>
              <tbody>
                {Category.map((currCat) => {
                  const items = _.sortBy(
                    FilteredData.filter((i) => i.category === currCat),
                    ["frequency"]
                  );
                  if (items.length === 0) {
                    return <></>;
                  }
                  const firstRow = (
                    <tr key={`tr-${currCat}-${items[0].no}`}>
                      <td rowSpan={items.length}>{items[0].category}</td>
                      <td>{items[0].name}</td>
                      <td>{items[0].frequency}</td>
                      <td></td>
                    </tr>
                  );

                  return (
                    <>
                      {firstRow}
                      {items.splice(1).map((r) => (
                        <tr key={`tr-${currCat}-${r.no}`}>
                          <td>{r.name}</td>
                          <td>{r.frequency}</td>
                          <td></td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
