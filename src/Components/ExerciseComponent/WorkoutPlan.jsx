import "./WorkoutPlan.css";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";

const WorkoutPlan = () => {
  const [nomeScheda, setNomeScheda] = useState("");
  const [dataCreazione, setDataCreazione] = useState("");
  const [dataAllenamento, setDataAllenamento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [workoutPlans, setWorkoutPlans] = useState([]);

  const handleCreateWorkoutPlan = async () => {
    const workoutData = {
      nomeScheda,
      dataCreazione,
      dataAllenamento,
    };

    const token = localStorage.getItem("authToken");

    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);
      const userId = decodedToken.sub;
      if (!userId) {
        setErrorMessage("ID utente non trovato nel token.");
        return;
      }
      workoutData.userId = userId;

      const response = await fetch("http://localhost:3001/workout_plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();
      console.log("Risposta dal server dopo creazione della scheda:", data);

      if (response.ok) {
        fetchWorkoutPlans();
        setNomeScheda("");
        setDataCreazione("");
        setDataAllenamento("");
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Errore nella creazione della scheda. Riprova."
        );
      }
    } catch (error) {
      console.error("Errore nella creazione della scheda:", error);
      setErrorMessage("Errore nella creazione della scheda. Riprova.");
    }
  };

  //GET Scheda allenamento
  const fetchWorkoutPlans = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken) // Ho verificato se Id utente mi veniva dato da userId o con altro nome, effettivamente e con sub
      const userId = decodedToken.sub; // Otteniamo l'ID dell'utente dal token usando jwtdecode, Id utente si trova in sub
      // console.log("User ID estratto dal token:", userId);

      const response = await fetch(
        `http://localhost:3001/workout_plans/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      // console.log("Schede ricevute dal backend:", data); //Schede che ricevo dal BE
      
      if (data.content && Array.isArray(data.content)) {
        setWorkoutPlans(data.content);
      } else {
        setErrorMessage(
          data.message || "Errore nel recupero delle schede. Riprova."
        );
      }
    } catch (error) {
      console.error("Errore nel recupero delle schede:", error);
      setErrorMessage("Errore nel recupero delle schede. Riprova.");
    }
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateWorkoutPlan}
          className="create-button"
        >
          Crea Scheda
        </Button>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome Scheda</TableCell>
              <TableCell>Data Creazione</TableCell>
              <TableCell>Data Allenamento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(workoutPlans) && workoutPlans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>Nessuna scheda disponibile</TableCell>
              </TableRow>
            ) : (
              workoutPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.nome_scheda}</TableCell>
                  <TableCell>{plan.data_creazione}</TableCell>
                  <TableCell>{plan.data_allenamento}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkoutPlan;
