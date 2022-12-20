import React from "react";

const ReadOnlyRow = ({ vaccine, handleEditClick, handleDeleteClick }) => {
  return (
    <div className='field'>
    <tr>
      <td>{vaccine.vaccineName}</td>
      <td>{vaccine.givenDate}</td>
      <td>{vaccine.expireDate}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, vaccine)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(vaccine.id)}>
          Delete
        </button>
      </td>
    </tr>
    </div>
  );
};

export default ReadOnlyRow;