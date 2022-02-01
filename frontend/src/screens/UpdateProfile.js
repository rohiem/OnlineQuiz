import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [FIRST, setFIRST] = useState("");
  const [LAST, setLAST] = useState("");
  const [image, setImage] = useState("");
  const [USERNAME, setUSERNAME] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [PASSWORD1, setPASSWORD1] = useState("");
  const [BIO, setBIO] = useState("");
  const [LOCATION, setLOCATION] = useState("");
  const [BIRTH, setBIRTH] = useState("");
  const [TEACHER, setTEACHER] = useState("False");
  const [STUDENT, setSTUDENT] = useState("False");
  const [SUCCESS, setSUCCESS] = useState(false);
  const navigate = useNavigate();

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
      console.log("res", res);
      setEMAIL(res.email);
      setFIRST(res.first_name);
      setLAST(res.last_name);
      setUSERNAME(res.username);
      setImage(res.image);
      setPASSWORD1(res.password);
      setBIO(res.bio);
      setBIRTH(res.birth_date);
      setLOCATION(res.location);
      if (res.is_student === true) {
        setSTUDENT("true");
      } else {
        setSTUDENT("false");

        if (res.is_teacher === true) {
          setTEACHER("true");
        } else {
          setTEACHER("false");
        }
      }
    };
    result();

    if (SUCCESS) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, SUCCESS]);

  const updateHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${user}`,
      },
    };
    const formData = new FormData();

    formData.append("first_name", FIRST);
    formData.append("last_name", LAST);
    formData.append("image", image);
    formData.append("username", USERNAME);
    formData.append("email", EMAIL);
    formData.append("password1", PASSWORD1);
    formData.append("bio", BIO);
    formData.append("location", LOCATION);
    formData.append("birth_date", BIRTH);
    formData.append("is_teacher", TEACHER);
    formData.append("is_student", STUDENT);
    const { data } = await axios.put("/quiz/update_profile", formData, config);
    console.log(data);

    if (data) {
      setSUCCESS(true);
    }
  };

  return (
    <Container>
      <h1>update profile</h1>

      <Form onSubmit={updateHandler}>
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
          update
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateProfile;
