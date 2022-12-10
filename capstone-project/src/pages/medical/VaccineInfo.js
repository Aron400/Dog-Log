import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./vaccineInfo.css";
import ReadOnlyRow from "./ReadOnlyRow";
import EditVaccineRow from "./EditVaccineRow";

const VaccineInfo = () => {
  const [vaccines, setVaccines] = useState([
    {
      id: 1,
      vaccineName: "rabies",
      givenDate: "10/22/21",
      expireDate: "10/22/22",
    },
    {
      id: 2,
      vaccineName: "lepto",
      givenDate: "10/22/21",
      expireDate: "10/22/22",
    },
  ]);
  const [addFormData, setAddFormData] = useState({
    vaccineName: "",
    givenDate: "",
    expireDate: "",
  });

  const [editFormData, setEditFormData] = useState({
    vaccineName: "",
    givenDate: "",
    expireDate: "",
  });

  //used to map table / switch between edit and read only
  const [editVaccineId, setEditVaccineId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    //gets name attribute of input
    const inputName = event.target.getAttribute("name");
    const inputValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[inputName] = inputValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const inputName = event.target.getAttribute("name");
    const inputValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[inputName] = inputValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newVaccine = {
      id: nanoid(),
      vaccineName: addFormData.vaccineName,
      givenDate: addFormData.givenDate,
      expireDate: addFormData.expireDate,
    };

    const newVaccines = [...vaccines, newVaccine];
    setVaccines(newVaccines);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedVaccine = {
      id: editVaccineId,
      vaccineName: editFormData.vaccineName,
      givenDate: editFormData.givenDate,
      expireDate: editFormData.expireDate,
    };

    const newVaccines = [...vaccines];

    const index = vaccines.findIndex((vaccine) => vaccine.id === editVaccineId);

    newVaccines[index] = editedVaccine;

    setVaccines(newVaccines);
    setEditVaccineId(null);
  };

  const handleEditClick = (event, vaccine) => {
    event.preventDefault();
    setEditVaccineId(vaccine.id);

    const formValues = {
      vaccineName: vaccine.vaccineName,
      givenDate: vaccine.givenDate,
      expireDate: vaccine.expireDate,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditVaccineId(null);
  };

  const handleDeleteClick = (vaccineId) => {
    const newVaccines = [...vaccines];

    const index = vaccines.findIndex((vaccine) => vaccine.id === vaccineId);

    newVaccines.splice(index, 1);

    setVaccines(newVaccines);
  };

  return (
    <div className="vaccine-info">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Vaccine Name</th>
              <th>Given Date</th>
              <th>Expire Date</th>
            </tr>
          </thead>

          <tbody>
            {vaccines.map((vaccine) => (
              <Fragment>
                {editVaccineId === vaccine.id ? (
                  <EditVaccineRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    vaccine={vaccine}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Vaccine</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="vaccineName"
          required="required"
          placeholder="Enter the vaccine name"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="givenDate"
          required="required"
          placeholder="Enter the date given"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="expireDate"
          required="required"
          placeholder="Enter the expire date"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default VaccineInfo;
