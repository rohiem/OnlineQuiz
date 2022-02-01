import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Container,
  Col,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function MyResult() {
  const [markstotal, setmarkstotal] = useState(0);
  const [name, setname] = useState("");
  const [marks, setmarks] = useState(0);
  const [users, setuser] = useState("");

  const cookies = new Cookies();

  const user = cookies.get("token");
  useEffect(() => {
    const result = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };

      const data = await axios.get(`/quiz/get_result_by_user`, config);
      var res = data.data;
      console.log(res);
      setmarkstotal(res.total_marks);
      setname(res.quiz);
      setmarks(res.marks);
      setuser(res.user);
    };
    result();
  }, []);
  return (
    <div>
      {" "}
      <h1>My Results</h1>
      <Container>
        <Row>
          <Col>
            <Card>
              <h1>course:{name}</h1>
              <h2>Taken BY:{users}</h2>
              <h3>
                you got:||||
                {markstotal}||||of||||{marks}||||
              </h3>
            </Card>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyResult;
