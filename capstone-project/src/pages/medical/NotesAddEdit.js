import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./medical.css";

const initialState = {
  name: "",
};

const NotesAddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getNote/${id}`)
      .then((res) => setState({ ...res.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Enter text to add a note");
      return;
    } else {
      if (!id) {
        axios
          .post("http://localhost:3001/newNote", {
            name,
          })
          .then(() => {
            setState({
              name: "",
            });
          })
          .catch((err) => console.log(err.response.data));
        alert("Note Added Succesfully");
      } else {
        axios
          .post(`http://localhost:3001/updateNote/${id}`, {
            name,
          })
          .then(() => {
            setState({
              name: "",
            });
          })
          .catch((err) => console.log(err.response.data));
        alert("Note updated Succesfully");
      }
      navigate("/Medical");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Add a Note</label>
        <input
          type="text"
          id="name"
          name="name"
          className="noteAddInput"
          placeholder="Enter your note here ..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <input
          className="updateEdit"
          type="submit"
          value={id ? "Update" : "Save"}
        />
        <Link to="/Medical">
          <input type="button" value="go back" />
        </Link>
      </form>
    </div>
  );
};

export default NotesAddEdit;
