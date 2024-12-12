import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ListGroup, Image, Spinner, Alert, Container } from 'react-bootstrap';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Non sei autenticato. Effettua il login.");
      return;
    }

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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Caricamento...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">Impossibile caricare i dati dell'utente.</Alert>
      </div>
    );
  }

  return (
    <header className="account-header">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="account-info p-4 rounded text-light"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span>{user.name}</span> <span className="name-purple">{user.surname}</span>
            </motion.h1>
          </div>
          <div className="text-center mt-4">
            <Image
              src={user.avatarURL}
              alt={`${user.name} ${user.surname}`}
              className="avatar"
            />
          </div>
          <ListGroup className="mt-4">
            <ListGroup.Item className="bg-transparent border-light text-light">
              <strong>Username:</strong> {user.username}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-light text-light">
              <strong>Nome:</strong> {user.name}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-light text-light">
              <strong>Cognome:</strong> {user.surname}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-light text-light">
              <strong>Email:</strong> {user.email}
            </ListGroup.Item>
          </ListGroup>
        </motion.div>
      </Container>
    </header>
  );
};

export default Account;
