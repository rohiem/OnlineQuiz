import React, { useState, useEffect } from "react";
import { Form, Container, Button, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";

function CreateQuestions() {
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [MARKS, setMarks] = useState(0);
  const [true_answer, setTrueAnswer] = useState("");
  const [SUCCESS, setSUCCESS] = useState(false);
  const navigate = useNavigate();
  const id = useParams();
  useEffect(() => {
    if (SUCCESS) {
      navigate(`/createquestions/${id.id}`);
      window.location.reload();
    }
  }, [navigate, SUCCESS, id.id]);
  const cookies = new Cookies();
  const user = cookies.get("token");

  const creatQuestionsHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    };

    const formData = {
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      true_answer: true_answer,
      marks: MARKS,
    };
    const { data } = await axios.post(
      `/quiz/post_question/${id.id}`,
      formData,
      config
    );
    console.log(data);
    if (data) {
      setSUCCESS(true);
    }
  };

  return (
    <Container>
      <Col>
        {" "}
        <h1>Now Create questions</h1>
      </Col>
      <Col>
        {" "}
        <Link to={`/quizteacher/${id.id}`}>
          <h3>see quiz</h3>
        </Link>
      </Col>

      <Form onSubmit={creatQuestionsHandler}>
        <Form.Group controlId="price">
          <Form.Label>question</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Answer 1</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter answer 1"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Answer 2</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter answer 2"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          ></Form.Control>
        </Form.Group>{" "}
        <Form.Group controlId="price">
          <Form.Label>Answer 3</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter answer 1"
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
          ></Form.Control>
        </Form.Group>{" "}
        <Form.Group controlId="price">
          <Form.Label>Answer 4</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter answer 4"
            value={answer4}
            onChange={(e) => setAnswer4(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Select aria-label="Default select example">
          <option>select true anwser</option>
          <option
            value="answer1"
            onClick={() => {
              setTrueAnswer("answer1");
            }}
          >
            answer1
          </option>
          <option
            value="answer2"
            onClick={() => {
              setTrueAnswer("answer2");
            }}
          >
            answer2
          </option>
          <option
            value="answer3"
            onClick={() => {
              setTrueAnswer("answer3");
            }}
          >
            answer3
          </option>
          <option
            value="answer4"
            onClick={() => {
              setTrueAnswer("answer4");
            }}
          >
            answer4
          </option>
        </Form.Select>
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
          Create Questions
        </Button>
      </Form>
    </Container>
  );
}

export default CreateQuestions;
