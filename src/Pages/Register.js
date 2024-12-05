import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { loginU } from "../redux/reducers/authSlice";
import "./Login/Login.css";
import { motion } from "framer-motion";
import { Form, Button, Container } from "react-bootstrap";
import { Snackbar, Alert } from "@mui/material";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GestioneSnackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const emailRef = useRef();
  const passwordRef = useRef();
  const nomeRef = useRef();
  const cognomeRef = useRef();
  const usernameRef = useRef();

  const handleRegister = async () => {
    // Ottieni i valori dai riferimenti
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const nome = nomeRef.current.value;
    const cognome = cognomeRef.current.value;
    const username = usernameRef.current.value || email.split("@")[0]; // Usa l'email per derivare un username se non è specificato

    const userData = {
      username: username,
      name: nome,
      surname: cognome,
      email: email,
      password: password,
    };

    // Effettua la richiesta POST
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        //dispatch(loginU(result));
        setMessage("Registrazione completata con successo!");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => {
          navigate("/login"); // Redirigi alla pagina di login
        }, 2000);
      } else {
        setMessage("Errore nella registrazione. Riprova.");
        setSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      setMessage("Errore nella connessione. Riprova.");
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <>
      <header>
        {/* <div className="container">
      <div className="row">
        <motion.div
          className="col-md-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start"
          initial={{ opacity: 0, x: -300 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="hero-subtitle text-light text-center text-sm-start text-uppercase">Join & Test Your Body</h2>
          <h1 className="hero-title text-light text-center text-sm-start fw-bold text-uppercase">
              Join <span className="text-purple"> & </span> Test <span className="text-purple"> Your Body </span>
          </h1>
        </motion.div>
      </div>
    </div> */}

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
            <h1 className="login-title text-center mb-3">Registrazione</h1>
            <p className="login-description text-center mb-4">
              Compila i tuoi campi!
            </p>

            {/* Form di registrazione */}
            <Form>
              {/* Campo per Username */}
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <div className="input-with-icon position-relative">
                  <Form.Control
                    type="text"
                    ref={usernameRef}
                    placeholder="Enter your username"
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              {/* Campo per Name */}
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <div className="input-with-icon position-relative">
                  <Form.Control
                    type="text"
                    ref={nomeRef}
                    placeholder="Enter your name"
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              {/* Campo per Surname */}
              <Form.Group controlId="surname" className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <div className="input-with-icon position-relative">
                  <Form.Control
                    type="text"
                    ref={cognomeRef}
                    placeholder="Enter your surname"
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              {/* Campo per Email */}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <div className="input-with-icon position-relative">
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter your email"
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              {/* Campo per Password */}
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-with-icon position-relative">
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter your password"
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              {/* Pulsante di registrazione */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-100 login-style" onClick={handleRegister}>
                  Register
                </Button>
              </motion.div>
            </Form>

            <div className="text-center mt-4">
              <span className="text-light">
                Hai giá un account?
                <div
                  className="text-purple ms-2 fw-bold"
                  style={{ cursor: "pointer", display: "inline-block" }}
                  onClick={() => navigate("/login")}
                >
                  Log In
                </div>
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

export default Register;
