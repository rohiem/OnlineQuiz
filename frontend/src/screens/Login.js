import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [EMAIL, setEMAIL] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");
  const [SUCCESS, setSUCCESS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (SUCCESS) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, SUCCESS]);
  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const formData = { email: EMAIL, password: PASSWORD };
    const { data } = await axios.post("/quiz/login", formData, config);
    console.log(data);
    const cookies = new Cookies();
    if (data.token) {
      cookies.set("token", data.token, { path: "/" });
    }
    if (data.token) {
      setSUCCESS(true);
    }
  };

  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={loginHandler}>
        <Form.Group controlId="price">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={EMAIL}
            onChange={(e) => setEMAIL(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>PASSWORD</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter brand"
            value={PASSWORD}
            onChange={(e) => setPASSWORD(e.target.value)}
          ></Form.Control>
        </Form.Group>{" "}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h1>
        not a user yet , <Link to={"/register"}>register</Link>
      </h1>
    </Container>
  );
}

export default Register;
