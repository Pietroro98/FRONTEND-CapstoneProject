import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginU } from '../../redux/reducers/authSlice';
import "../Login/Login.css";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Container, } from "react-bootstrap";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const emailRef = useRef();
  const passwordRef = useRef();

  // Funzione di login
  async function handelLogin () {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();


      if (response.ok) {
        localStorage.setItem('authToken', result.accessToken);
        localStorage.setItem("isAuth", true);
        console.log(result.accessToken)
        dispatch(loginU(result.token));  // Usa il tuo reducer per il login, se necessario
        navigate("/");
      } else {
        alert("Credenziali non valide. Riprova.");
      }
    } catch (error) {
      console.error('Errore nella connessione:', error);
      alert('Errore nella connessione. Riprova.');
    }
  }

  return (
    <>
     {/* Nuovo contenuto posizionato in alto a sinistra */}
     <div className="container position-absolute top-0 start-0 p-3 z-index-2">
        <div className="row">
          <motion.div
            className="col-md-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start"
            initial={{ opacity: 0, x: -300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="hero-subtitle text-light text-center text-sm-start text-uppercase">Start testing yourself now!</h2>
            <h1 className="hero-title text-light text-center text-sm-start fw-bold text-uppercase">
                {/* Cambiato il testo qui */}
                Join <span className="text-purple"> & </span> <br/>Test <span className="text-purple"><br/> Your Body </span>
            </h1>
          </motion.div>
        </div>
      </div>


    <header>
    
    <Container
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundImage: "url('path/to/your/image.jpg')", backgroundSize: 'cover' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="login-card p-5 rounded shadow-lg w-100 w-md-50 text-light"
      >
        <h1 className="login-title text-center mb-3">Login</h1>
        <p className="login-description text-center mb-4">Please enter your email and password</p>

        <Form>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <div className="input-with-icon position-relative">
              <FontAwesomeIcon icon={faEnvelope} className="text-dark input-icon position-absolute top-50 start-0 translate-middle-y ms-3" />
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Enter your email"
                className="ps-5" // Aggiungiamo padding per l'icona
              />
            </div>
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Password</Form.Label>
            <div className="input-with-icon position-relative">
              <FontAwesomeIcon icon={faLock} className="text-dark input-icon position-absolute top-50 start-0 translate-middle-y ms-3" />
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Enter your password"
                className="ps-5"
              />
            </div>
          </Form.Group>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-100 login-style "
              onClick={handelLogin}
            >
              Login
            </Button>
          </motion.div>
        </Form>

        <div className="text-center mt-4">
          <span className="text-light">
            Non hai un account?
            <span
              className="text-purple cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Registrati
            </span>
          </span>
        </div>
      </motion.div>
    </Container>
    </header>
    </>
  );
}

export default Login;
