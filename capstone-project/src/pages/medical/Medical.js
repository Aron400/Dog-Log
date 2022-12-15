import React from "react";
import Notes from "./Notes";
import VaccineInfo from "./VaccineInfo";
import "./medical.css";

function Medical() {
  return (
    <div className="medical">
      <h1>Medical</h1>
      <VaccineInfo />
      <Notes />
    </div>
  );
}

export default Medical;
