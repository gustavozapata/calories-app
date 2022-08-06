import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import AppContext from "../../context";
import {
  isValidInput,
  isValidEmail,
  isValidPassword,
} from "../../utils/validation";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const { handleSignup, serverMessage } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isValidInput(name) &&
      isValidEmail(email) &&
      isValidPassword(password)
    ) {
      handleSignup(
        { name: name.trim(), email: email.trim(), password },
        (logged) => {
          if (logged) {
            navigate("/");
          }
        }
      );
    } else {
      setClientMessage("Invalid value in name, email or password");
      setTimeout(() => {
        setClientMessage("");
      }, 2500);
    }
  };

  return (
    <div className="Signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          value={password}
          type="password"
          msg="Must be between 5 and 15 characters"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <button>Signup</button>
      </form>
      <p>{clientMessage}</p>
      <p>{serverMessage}</p>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
