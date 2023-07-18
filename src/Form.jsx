import React, { useState } from "react";

const Form = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormdata((prevdata) => ({ ...prevdata, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(formdata));
    setIsSubmit(true);
    // if (Object.keys(error).length === 0 && isSubmit) {
    //   console.log("formdata sucess", formdata);
    // }
  };

  const validate = (formdata) => {
    let error = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!formdata.name) {
      error.name = "Name field is required!";
    }
    if (!formdata.email) {
      error.email = "Email field is required!";
    }
    if (!formdata.password) {
      error.password = "Password field is required!";
    } else if (formdata.password.length > 16 || formdata.password.length < 4) {
      error.password = "Password range must be 4 to 16!";
    } else if (!regex.test(formdata.password)) {
      error.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)";
    }
    return error;
  };

  console.log(formdata);
  return (
    <div>
      <h3>Basic Form Validation</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <div>
            <input
              style={
                error.name ? { borderColor: "red" } : { borderColor: "black" }
              }
              type="text"
              name="name"
              onChange={handleInput}
            />
            {error && <p>{error.name}</p>}
          </div>
        </div>
        <div>
          <label>Email:</label>
          <div>
            <input
              style={
                error.email ? { borderColor: "red" } : { borderColor: "black" }
              }
              type="email"
              name="email"
              onChange={handleInput}
            />
            {error && <p>{error.email}</p>}
          </div>
        </div>
        <div>
          <label>Password:</label>
          <div>
            <input
              style={
                error.password
                  ? { borderColor: "red" }
                  : { borderColor: "black" }
              }
              type="password"
              name="password"
              onChange={handleInput}
            />
            {error && <p>{error.password}</p>}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      {Object.keys(error).length === 0 && isSubmit ? (
        <div>
          <div>Name: {formdata.name}</div>
          <div>Email: {formdata.email}</div>
          <div>Password: {formdata.password}</div>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default Form;
