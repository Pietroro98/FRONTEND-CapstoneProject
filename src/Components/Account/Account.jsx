import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, ListGroup, Image, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import './Account.css';

const Account = () => {
  // Stati per i dati dell'utente e il caricamento
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effetto per fare la fetch dei dati dall'API
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Non sei autenticato. Effettua il login.");
      return;
    }

    // Effettua la fetch con il token
    fetch('http://localhost:3001/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta dei dati dell\'utente');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Errore nel recuperare i dati dell'utente", error);
        setError('Impossibile caricare i dati dell\'utente');
        setLoading(false);
      });
  }, []);

  // Gestisco il caso in cui i dati non siano ancora stati caricati
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Caricamento...</span>
      </div>
    );
  }

  // Gestisco gli errori
  if (error) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </div>
    );
  }

  // Se l'utente non è trovato altro errore
  if (!user) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">Impossibile caricare i dati dell'utente.</Alert>
      </div>
    );
  }

  return (
    <div className='img'>
    <Container className="account-container">
      {/* Animazione del nome */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span >{user.name}</span> <span className="name-purple">{user.surname}</span>
        </motion.h1>
      </div>

      {/* Card con le informazioni */}
      <Row className="justify-content-center">
        <Col md={6} sm={12}>
          <Card className='card-account'>
            <Card.Header>
              <h4>Informazioni Profilo</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                {/* Avatar */}
                <Image
                  src={user.avatarURL}
                  alt={`${user.name} ${user.surname}`}
                  className="avatar"
                />
              </div>
              <ListGroup className="mt-3">
                <ListGroup.Item >
                  <strong>Username:</strong> {user.username}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Nome:</strong> {user.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Cognome:</strong> {user.surname}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {user.email}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Account;
