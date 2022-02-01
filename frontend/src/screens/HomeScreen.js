import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
function HomeScreen() {
  const [Quizes, setQuizes] = useState([]);
  const cookies = new Cookies();

  const navigate = (id) => {
    Navigate(`/results/${id}`);
  };
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
      const data = await axios.get("/quiz/get_quizzes", config);
      setQuizes(data.data);
    };
    quizzes();
  }, [user]);
  return (
    <div>
      <h1>Welcome Home</h1>
      <Container>
        {Quizes.map((quiz) => (
          <Row>
            <Col>
              <Link to={`/quiz/${quiz.id}`}>
                <Card>
                  <h1>{quiz.name}</h1>
                  <h2>BY:{quiz.teacher}</h2>
                  <h3>total marks : {quiz.total_marks}</h3>
                </Card>{" "}
              </Link>
              <Link to={`results/${quiz.id}`} className={"btn btn-secondary"}>
                {" "}
                All Results
              </Link>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default HomeScreen;
