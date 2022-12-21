import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./medical.css";

const NotesPage = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/getNotes");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:3001/removeNote/${id}`);
      alert("Note deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <table className="styled-table">
        <tr className="vaccineTitle" style={{ textAlign: "center" }}>
          Notes
        </tr>
      </table>
      <table className="styled-table">
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id} className="vaccineTable">
                <div className="noteItemPadding">
                  <div className="noteItem">
                    <td style={{ textAlign: "center" }} className="noteText">{item.name}</td>
                  </div>
                </div>
                <td className="notesButtons">
                  <Link to={`/updateNote/${item.id}`}>
                    
                      <button className="btn btn-edit">Edit</button>
                    
                  </Link>
                  <button
                    className="addButton"
                    onClick={() => deleteNote(item.id)}
                  >
                    Delete
                  </button>
                  {/* <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link> */}
                </td>
              </tr>
            );
          })}
        </tbody>
        <div className="inputPadding">
        <Link to="/addNote">
          <button className="addButton">Add a Note</button>
        </Link>
          </div>
      </table>
    </div>
  );
};

export default NotesPage;
