import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
function HomeScreen() {
  const [teacher, setTeacher] = useState([]);
  const [success, setSuccess] = useState(false);
  const cookies = new Cookies();

  const user = cookies.get("token");
  useEffect(() => {
    const teach = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };
      const data = await axios.get("/quiz/get_teacher", config);
      setTeacher(data.data);
    };
    teach();
    if (success) {
      window.location.reload();
    }
  }, [user, success]);

  const makeTeacher = (e, id) => {
    e.preventDefault();
    console.log(user);
    const teach = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };
      const data = await axios.post(`/quiz/choose_teacher_admin/${id}`, config);
      setSuccess(true);
    };
    teach();
  };

  return (
    <div>
      <h1>verify teacher</h1>
      <Container>
        {teacher.map((te) => (
          <Row>
            <Col>
              <Link to={`/profile/${te.id}`}>
                <Card>
                  <h1>{te.username}</h1>
                  <h2>{te.email}</h2>
                </Card>{" "}
              </Link>
            </Col>
            <Button onClick={(e) => makeTeacher(e, te.id)}>make teacher</Button>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default HomeScreen;
