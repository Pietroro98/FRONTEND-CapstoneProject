import './WorkoutPlan.css';
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const WorkoutPlan = () => {
  const [nomeScheda, setNomeScheda] = useState('');
  const [dataCreazione, setDataCreazione] = useState('');
  const [dataAllenamento, setDataAllenamento] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Stato per gestire eventuali errori

  const handleCreateWorkoutPlan = async () => {
    const workoutData = {
      nomeScheda,
      dataCreazione,
      dataAllenamento,
    };

    // Recupera il token dal localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
      return;
    }

    try {
      // Chiamata POST al backend per salvare la scheda di allenamento
      const response = await fetch('http://localhost:3001/workout_plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Assicura che i dati vengano inviati come JSON
          'Authorization': `Bearer ${token}`, // Aggiungi il token nell'header
        },
        body: JSON.stringify(workoutData), // Converte il corpo della richiesta in JSON
      });

      if (response.ok) {
        const data = await response.json(); // Risposta del server in formato JSON
        console.log("Scheda di allenamento creata con successo:", data);
        // Reset dei campi
        setNomeScheda('');
        setDataCreazione('');
        setDataAllenamento('');
        setErrorMessage('');
      } else {
        // Gestisci gli errori di risposta
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Errore nella creazione della scheda. Riprova.");
      }
    } catch (error) {
      console.error("Errore nella creazione della scheda:", error);
      setErrorMessage("Errore nella creazione della scheda. Riprova.");
    }
  };

  return (
    <div className="workout-container">
      <h2 className="workout-title">Crea la tua Scheda di Allenamento</h2>

      <div className="form-container">
        <TextField
          label="Nome Scheda"
          variant="outlined"
          value={nomeScheda}
          onChange={(e) => setNomeScheda(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data Creazione"
          variant="outlined"
          type="date"
          value={dataCreazione}
          onChange={(e) => setDataCreazione(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Data Allenamento"
          variant="outlined"
          type="date"
          value={dataAllenamento}
          onChange={(e) => setDataAllenamento(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostra errore */}
        <Button variant="contained" color="primary" onClick={handleCreateWorkoutPlan} className="create-button">
          Crea Scheda
        </Button>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome Esercizio</TableCell>
              <TableCell>Serie</TableCell>
              <TableCell>Ripetizione</TableCell>
              <TableCell>Peso Usato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Nessuna riga, tabella vuota */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkoutPlan;
