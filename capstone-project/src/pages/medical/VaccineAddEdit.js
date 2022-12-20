import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./VaccineAddEdit.css";

const initialState = {
  name: "",
  givenDate: "",
  expireDate: "",
};

const VaccineAddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, givenDate, expireDate } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getVaccine/${id}`)
      .then((res) => setState({ ...res.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !givenDate || !expireDate) {
      alert("All fields mandatory");
      return;
    } else {
      if (!id) {
        axios
          .post("http://localhost:3001/newVaccine", {
            name,
            givenDate,
            expireDate,
          })
          .then(() => {
            setState({ name: "", givenDate: "", expireDate: "" });
          })
          .catch((err) => console.log(err.response.data));
        alert("Vaccine Added Succesfully");
      } else {
        axios
          .post(`http://localhost:3001/updateVaccine/${id}`, {
            name,
            givenDate,
            expireDate,
          })
          .then(() => {
            setState({ name: "", givenDate: "", expireDate: "" });
          })
          .catch((err) => console.log(err.response.data));
        alert("Vaccine updated Succesfully");
      }
      navigate("/Medical");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  //53:40
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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="givenDate">Given Date</label>
        <input
          type="text"
          id="givenDate"
          name="givenDate"
          placeholder="Your Given Date ..."
          value={givenDate || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="expireDate">expireDate</label>
        <input
          type="number"
          id="expireDate"
          name="expireDate"
          placeholder="Your expireDate number ..."
          value={expireDate || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/Medical">
          <input type="button" value="go back" />
        </Link>
      </form>
    </div>
  );
};

export default VaccineAddEdit;
