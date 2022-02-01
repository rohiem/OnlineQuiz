import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
function HomeScreen() {
  const [Results, setResults] = useState([]);
  const cookies = new Cookies();
  const id = useParams();
  console.log(id);
  const user = cookies.get("token");
  console.log(user);
  useEffect(() => {
    const quizzes = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };
      const data = await axios.get(`/quiz/get_result_by_quiz/${id.id}`, config);
      console.log(data.data);
      setResults(data.data);
    };
    quizzes();
  }, [user]);

  return (
    <div>
      <h1>Quiz Results</h1>
      <Container>
        {Results.map((quiz) => (
          <Row>
            <Col>
              <Card>
                <h1>{quiz.quiz}</h1>
                <h2>BY:{quiz.user}</h2>
                <h3>total marks : {quiz.total_marks}</h3>
              </Card>{" "}
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default HomeScreen;
