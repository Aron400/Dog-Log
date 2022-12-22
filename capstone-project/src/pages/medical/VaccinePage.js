import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./VaccinePage.css";
import axios from "axios";

const VaccinePage = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/getVaccine");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  //deleteContact
  const deleteVaccine = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:3001/removeVaccine/${id}`);
      alert("Vaccine deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <table className="styled-table">
        <tr className="vaccineTitle" style={{ textAlign: "center" }}>
          Vaccine Information
        </tr>
      </table>
      <table className="styled-table">
        <thead>
          <tr className="vaccineHeader">
            <th style={{ textAlign: "center" }}>Vaccine Name</th>{" "}
            <th style={{ textAlign: "center" }}>Given Date</th>{" "}
            <th style={{ textAlign: "center" }}>Expire Date</th>{" "}
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id} className="vaccineTable">
                <td>{item.name}</td>
                <td>{item.givenDate}</td>
                <td>{item.expireDate}</td>
                <td>
                  <Link to={`/updateVaccine/${item.id}`}>
                    <button className="editButton">Edit</button>
                  </Link>
                  <button
                    className="deleteButton"
                    onClick={() => deleteVaccine(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="styled-table">
        <tr style={{ textAlign: "center" }}>
          <Link to="/addVaccine">
            <button className="addVaccineBtn">Add a Vaccine</button>
          </Link>{" "}
        </tr>
      </table>
    </div>
  );
};

export default VaccinePage;
