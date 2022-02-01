import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Container,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
function Quizr(props) {
  const [Quiz, setQuiz] = useState({});
  const [succes, setSuccess] = useState(false);

  const id = useParams();

  const navigate = useNavigate();

  const cookies = new Cookies();

  const user = cookies.get("token");
  useEffect(() => {
    const quiz = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };

      const data = await axios.get(`/quiz/get_quiz/${id.id}`, config);
      const Quizs = data.data;
      console.log("Quizs :", Quizs);
      setQuiz(Quizs);
    };
    quiz();
    if (succes) {
      navigate("/myresult");
    }
  }, [succes]);
  if (Quiz.questions !== undefined) {
    var quests = Quiz.questions;
  }
  const object = () => {
    const dict = {};
    if (quests !== undefined) {
      quests.map((q) => {
        return (dict[`${q.id}`] = "");
      });

      return dict;
    }
  };
  const calculate = (e) => {
    e.preventDefault();
    const keys = Object.keys(Stat);
    var sum = 0;
    quests.map((q) => {
      if (Stat[q.id] === q.true_answer) {
        sum += q.mark;
      }
      return sum;
    });
    const quizresult = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };

      const data = await axios.post(
        `/quiz/post_answers/${id.id}`,
        { total: sum },
        config
      );
      if (data.data) {
        setSuccess(true);
      }
    };
    quizresult();
  };
  const Stat = object();

  const StatHandler = (e, id, answer) => {
    Stat[id] = answer;
    console.log("Stat", Stat);
    const answers = ["answer1", "answer2", "answer3", "answer4"];
    var ide = `${answer}${id}`;

    const elment = document.getElementById(ide);
    elment.style.backgroundColor = "green";
    answers.map((ans) => {
      if (ans !== answer) {
        var i = `${ans}${id}`;
        const elment = document.getElementById(i);

        elment.style.backgroundColor = "red";
      }
      return ans;
    });
  };
  return (
    <div>
      <Container>
        <h1>{Quiz.name}</h1>
        <h2>{Quiz.teacher}</h2>
        <h5>{Quiz.total_marks}</h5>
        <Form onSubmit={calculate}>
          <Card>
            {quests !== undefined &&
              quests.map((q) => (
                <Row>
                  <Card>
                    <br></br>
                    <h3>{q.question}</h3>
                    <ButtonGroup aria-label="Basic example" vertical>
                      <Button
                        id={`answer1${q.id}`}
                        onClick={(e) => {
                          StatHandler(e, q.id, "answer1");
                        }}
                        variant="secondary"
                      >
                        {q.answer1}
                      </Button>
                      <br></br>
                      <Button
                        id={`answer2${q.id}`}
                        onClick={(e) => {
                          StatHandler(e, q.id, "answer2");
                        }}
                        variant="secondary"
                      >
                        {q.answer2}
                      </Button>
                      <br></br>
                      <Button
                        id={`answer3${q.id}`}
                        onClick={(e) => {
                          StatHandler(e, q.id, "answer3");
                        }}
                        variant="secondary"
                      >
                        {q.answer3}
                      </Button>
                      <br></br>
                      <Button
                        id={`answer4${q.id}`}
                        onClick={(e) => {
                          StatHandler(e, q.id, "answer4");
                        }}
                        variant="secondary"
                      >
                        {q.answer4}
                      </Button>
                      <br></br>
                    </ButtonGroup>
                    {/* 
                    <input
                      type="radio"
                      id="html"
                      name={q.answer1}
                      checked={String(answer) === "answer1"}
                      onChange={(e) => {
                        StatHandler(e, q.id, "answer1");
                      }}
                      value={"answer1"}
                    />
                    <label htmlFor="html">{q.answer1}</label>
                    <br />
                    <input
                      type="radio"
                      id="css"
                      checked={Stat[q.id] === "answer2"}
                      onChange={(e) => {
                        StatHandler(e, q.id, "answer2");
                      }}
                      name={q.answer2}
                      value={"answer2"}
                    />
                    <label htmlFor="css">{q.answer2}</label>
                    <br />
                    <input
                      type="radio"
                      id="javascript"
                      name={q.answer3}
                      checked={Stat[q.id] === "answer3"}
                      onChange={(e) => {
                        StatHandler(e, q.id, "answer3");
                      }}
                      value={"answer3"}
                    />
                    <label htmlFor="javascript">{q.answer3}</label>
                    <input
                      type="radio"
                      id="javascript"
                      name={q.answer4}
                      onChange={(e) => {
                        StatHandler(e, q.id, "answer4");
                      }}
                      checked={Stat[q.id] === "answer4"}
                      value={"answer4"}
                    />
                    <label htmlFor="javascript">{q.answer4}</label> */}
                  </Card>
                  <hr></hr>
                </Row>
              ))}
          </Card>{" "}
          <Button variant="primary" type="submit">
            submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
export default Quizr;
