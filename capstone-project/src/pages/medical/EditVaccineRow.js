import React from "react";

const EditVaccineRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a vaccine name"
          name="vaccineName"
          value={editFormData.vaccineName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          // required="required"
          placeholder="Enter the date given"
          name="givenDate"
          value={editFormData.givenDate}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          // required="required"
          placeholder="Enter the expire date"
          name="expireDate"
          value={editFormData.expireDate}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditVaccineRow;
