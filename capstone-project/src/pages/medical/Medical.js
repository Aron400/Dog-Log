import React from "react";
import Notes from "./Notes";
// import VaccineInfo from "./VaccineInfo";
import "./medical.css";
import VaccinePage from "./VaccinePage";

function Medical() {
  return (
    <div className="medical">
      <h1>Medical</h1>
      {/* <VaccineInfo /> */}
      <VaccinePage />
      <Notes />
    </div>
  );
}

export default Medical;
