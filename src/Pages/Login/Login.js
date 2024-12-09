import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginU } from "../../redux/reducers/authSlice";
import "../Login/Login.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Container } from "react-bootstrap";
import { Snackbar, Alert } from "@mui/material";



function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gestione dello stato per il Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const emailRef = useRef();
  const passwordRef = useRef();

  // login
  async function handelLogin() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      email: email,
      password: password,
    };

    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      const avatarURL = result.avatarURL; // If avatarURL is included in the response
      localStorage.setItem('avatarURL', avatarURL);  // Store avatarURL in localStorage
    
      // Store the token and user auth state
      localStorage.setItem("authToken", result.accessToken);
      localStorage.setItem("isAuth", true);
    
      // Dispatch login action (if you're using Redux)
      dispatch(loginU(result.token));
    
      setMessage("Login effettuato con successo!");
      setSeverity("success");
      setOpen(true);
    
      // Fetch user details to get the avatar URL
      try {
        const userResponse = await fetch("http://localhost:3001/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${result.accessToken}`,  // Pass the token to authenticate
          },
        });
    
        if (userResponse.ok) {
          const userData = await userResponse.json();
          const avatarURL = userData.avatarURL;  // Assuming avatarURL is returned
          localStorage.setItem('avatarURL', avatarURL);  // Save avatar URL to localStorage
        } else {
          console.error("Unable to fetch user data for avatar");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    
      // Redirect to exercises page after 2 seconds
      setTimeout(() => {
        navigate("/esercizi");
      }, 2000);
    } else {
      setMessage("Credenziali non valide. Riprova.");
      setSeverity("error");
      setOpen(true);
    }
  }

  return (
    <>
      <div className="container position-absolute top-0 start-0 p-3 z-index-2">
        <div className="row">
          <motion.div
            className="col-md-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start"
            initial={{ opacity: 0, x: -300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="hero-subtitle text-light text-center text-sm-start text-uppercase">
              Start testing yourself now!
            </h2>
            <h1 className="hero-title text-light text-center text-sm-start fw-bold text-uppercase">
              {/* Cambiato il testo qui */}
              Join <span className="text-purple"> & </span> <br />
              Test{" "}
              <span className="text-purple">
                <br /> Your Body{" "}
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      <header>
        <Container
          className="d-flex justify-content-center align-items-center min-vh-100"
          style={{
            backgroundImage: "url('path/to/your/image.jpg')",
            backgroundSize: "cover",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="login-card p-5 rounded shadow-lg w-100 w-md-50 text-light"
          >
            <h1 className="login-title text-center mb-3">Login</h1>
            <p className="login-description text-center mb-4">
              Iserisci la tua email e password
            </p>

            <Form>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <div className="input-with-icon position-relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-dark input-icon position-absolute top-50 start-0 translate-middle-y ms-3"
                  />
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter your email"
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label>Password</Form.Label>
                <div className="input-with-icon position-relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-dark input-icon position-absolute top-50 start-0 translate-middle-y ms-3"
                  />
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter your password"
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-100 login-style " onClick={handelLogin}>
                  Login
                </Button>
              </motion.div>
            </Form>

            <div className="text-center mt-4">
              <span className="text-light">
                Non hai un account?
                <div
                  className="text-purple ms-2 fw-bold"
                  style={{ cursor: "pointer", display: "inline-block" }}
                  onClick={() => navigate("/register")}
                >
                  Registrati
                </div>
              </span>
            </div>
            <div className="text-center">
              <span
                className="text-light ms-2 fw-bold mt-3"
                style={{ cursor: "pointer", display: "inline-block" }}
                onClick={() => navigate("/")}
              >
                Go To Home
              </span>
            </div>
          </motion.div>
        </Container>
      </header>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
