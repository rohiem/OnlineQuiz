import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
function Logout() {
  const cookies = new Cookies();
  const user = cookies.get("token");
  const [SUCCESS, setSUCCESS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (SUCCESS) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, SUCCESS]);
  const logoutHandler = (e) => {
    e.preventDefault();
    cookies.remove("token");
    setSUCCESS(true);
  };
  return (
    <div>
      {user && (
        <Button className={"btn btn-primary"} onClick={logoutHandler}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default Logout;
