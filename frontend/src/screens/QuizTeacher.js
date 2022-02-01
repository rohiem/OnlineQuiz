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
function QuizTeacher() {
  const [Quiz, setQuiz] = useState({});

  const id = useParams();
  console.log(id);
  const cookies = new Cookies();

  const user = cookies.get("token");
  useEffect(() => {
    console.log("use effect");
    const quiz = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };

      const data = await axios.get(
        `/quiz/get_quiz_by_teacher/${id.id}`,
        config
      );
      const Quizs = data.data;
      console.log("Quizs :", Quizs);
      setQuiz(Quizs);
    };
    quiz();
  }, []);

  if (Quiz.questions !== undefined) {
    var quests = Quiz.questions;
  }
  return (
    <div>
      <Container>
        <Link to={`/createquestions/${Quiz.id}`}>
          <h3>Create more questions</h3>
        </Link>
        <h1>{Quiz.name}</h1>
        <h2>{Quiz.teacher}</h2>
        <h5>{Quiz.total_marks}</h5>
        {quests !== undefined &&
          quests.map((quis) => (
            <Card>
              <h3>{quis.question}</h3>
              <p>{quis.answer1}</p>
              <p>{quis.answer2}</p>
              <p>{quis.answer3}</p>
              <p>{quis.answer4}</p> <h4>{quis.true_answer}</h4>
            </Card>
          ))}
      </Container>
    </div>
  );
}
export default QuizTeacher;
