import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import AppContext from "../../context";
import { isValidEmail, isValidPassword } from "../../utils/validation";

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientMessage, setClientMessage] = useState("");
  const { handleLogin, serverMessage } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidEmail(email) && isValidPassword(password)) {
      setIsLoading(true);
      handleLogin(email.trim(), password, (logged) => {
        setIsLoading(false);
        if (logged) {
          navigate("/");
        }
      });
    } else {
      setClientMessage("Invalid value in email or password");
      setTimeout(() => {
        setClientMessage("");
      }, 2500);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          value={email}
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          value={password}
          type="password"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {isLoading && <Loading />}
      <p>{clientMessage}</p>
      <p>{serverMessage}</p>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
