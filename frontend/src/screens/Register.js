import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Register() {
  const [FIRST, setFIRST] = useState("");
  const [LAST, setLAST] = useState("");
  const [image, setImage] = useState("");
  const [USERNAME, setUSERNAME] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [PASSWORD1, setPASSWORD1] = useState("");
  const [PASSWORD2, setPASSWORD2] = useState("");
  const [BIO, setBIO] = useState("");
  const [LOCATION, setLOCATION] = useState("");
  const [BIRTH, setBIRTH] = useState("");
  const [TEACHER, setTEACHER] = useState("False");
  const [STUDENT, setSTUDENT] = useState("False");
  const [SUCCESS, setSUCCESS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (SUCCESS) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, SUCCESS]);
  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();

    formData.append("first_name", FIRST);
    formData.append("last_name", LAST);
    formData.append("image", image);
    formData.append("username", USERNAME);
    formData.append("email", EMAIL);
    formData.append("password1", PASSWORD1);
    formData.append("password2", PASSWORD2);
    formData.append("bio", BIO);
    formData.append("location", LOCATION);
    formData.append("birth_date", BIRTH);
    formData.append("is_teacher", TEACHER);
    formData.append("is_student", STUDENT);
    const { data } = await axios.post("/quiz/register", formData, config);
    console.log(data);
    const cookies = new Cookies();
    cookies.set("token", data.token, { path: "/" });
    if (data.token) {
      setSUCCESS(true);
    }
  };

  return (
    <Container>
      <h1>Register</h1>

      <Form onSubmit={registerHandler}>
        <Form.Group controlId="name">
          <Form.Label>FIRST Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter first name"
            value={FIRST}
            onChange={(e) => setFIRST(e.target.value)}
          ></Form.Control>
          <Form.Label> Last Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter last name"
            value={LAST}
            onChange={(e) => setLAST(e.target.value)}
          ></Form.Control>{" "}
          <Form.Label>userName</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter username"
            value={USERNAME}
            onChange={(e) => setUSERNAME(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={EMAIL}
            onChange={(e) => setEMAIL(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>

          <input
            id="image-file"
            label="choose file"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>PASSWORD1</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter brand"
            value={PASSWORD1}
            onChange={(e) => setPASSWORD1(e.target.value)}
          ></Form.Control>
        </Form.Group>{" "}
        <Form.Group controlId="brand">
          <Form.Label>PASSWORD2</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter brand"
            value={PASSWORD2}
            onChange={(e) => setPASSWORD2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countinstock">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter bio"
            value={BIO}
            onChange={(e) => setBIO(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>location</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter location"
            value={LOCATION}
            onChange={(e) => setLOCATION(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>BIRTH,, It must be in YYYY-MM-DD format.</Form.Label>

          <Form.Control
            type="name"
            placeholder="enter birth date"
            value={BIRTH}
            onChange={(e) => setBIRTH(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="Checkbox"
            onChange={(e) => setTEACHER("True")}
            label="is teacher??"
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Check
            type="Checkbox"
            onChange={(e) => setSTUDENT("True")}
            label="is student ???"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
