import React from "react";
// import Notes from "./Notes";
// import VaccineInfo from "./VaccineInfo";
import NotesPage from "./NotesPage";
import "./medical.css";
import VaccinePage from "./VaccinePage";

function Medical() {
  return (
    <div className="medical">
      <h1>Medical</h1>
      {/* <VaccineInfo /> */}
      <VaccinePage />
      {/* <Notes /> */}
      <NotesPage />
    </div>
  );
}

export default Medical;
