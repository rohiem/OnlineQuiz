import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

function CreateQuiz() {
  const [NAME, setNAME] = useState("");
  const [MARKS, setMarks] = useState(0);
  const [ID, setID] = useState(0);
  const [SUCCESS, setSUCCESS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (SUCCESS) {
      navigate(`/createquestions/${ID}`);
    }
  }, [navigate, SUCCESS]);
  const cookies = new Cookies();
  const user = cookies.get("token");

  const creatQuizHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    };

    const formData = { name: NAME, marks: MARKS };
    const { data } = await axios.post("/quiz/post_quiz", formData, config);
    console.log(data);
    if (data) {
      setID(data.id);

      setSUCCESS(true);
    }
  };

  return (
    <Container>
      <h1>CReate Quiz</h1>

      <Form onSubmit={creatQuizHandler}>
        <Form.Group controlId="price">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter name"
            value={NAME}
            onChange={(e) => setNAME(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>marks</Form.Label>
          <Form.Control
            type="number"
            placeholder="enter Marks"
            value={MARKS}
            onChange={(e) => setMarks(e.target.value)}
          ></Form.Control>
        </Form.Group>{" "}
        <Button variant="primary" type="submit">
          CreateQuiz
        </Button>
      </Form>
      <h1>
        not a staff yet , <Link to={"/login"}>login</Link>
      </h1>
    </Container>
  );
}

export default CreateQuiz;
