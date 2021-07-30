import React, { useEffect, useState } from "react";
import { Label } from "../utils/typography";
import AvailableDataset from "../utils/dataset.json";

export default function DatasetPicker() {
  console.log(AvailableDataset.length)
  return (
    <div className="container">
      <div className="columns">
        <Label className="column">
          <h2 className="title is-3">ร่วมกิจกรรมสำรวจชุดข้อมูล Open data</h2>
        </Label>
      </div>
    </div>
  );
}
