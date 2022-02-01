import React, { useState, useEffect } from "react";
import { Card, Row, Container, Col, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function Profile() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [marks, setmarks] = useState("");
  const [users, setuser] = useState("");
  const [image, setimage] = useState("");

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

      const data = await axios.get(`/quiz/get_profile`, config);
      var res = data.data;
      console.log(res);
      setemail(res.email);
      setname(res.first_name);
      setmarks(res.location);
      setuser(res.username);
      setimage(res.image);
    };
    result();
  }, []);
  return (
    <div>
      {" "}
      <h1>My Profile</h1>
      <Container>
        <Row>
          <Link to={"/profile/update"} className="btn btn-secondary">
            update
          </Link>
        </Row>
        <Row>
          <Col>
            <Card>
              <h1>{name}</h1>
              <h2>{users}</h2>
              <h3>
                ||||
                {email}|||
              </h3>
              <h3>|of||||{marks}||||</h3>
            </Card>{" "}
          </Col>
          <Col>
            <Image src={image}></Image>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
