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
      <table className="notes">
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id} >
                <div className="noteItem">
                  <td className="noteText">{item.name}</td>
                </div>
                <td className="notesButtons">
                  <Link to={`/updateNote/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
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
        <Link to="/addNote">
          <button className="btn btn-notes">Add a Note</button>
        </Link>
      </table>
    </div>
  );
};

export default NotesPage;
