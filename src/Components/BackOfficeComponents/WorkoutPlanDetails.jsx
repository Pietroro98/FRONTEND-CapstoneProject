import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./WorkoutPlanDetails.css";

const WorkoutPlanDetails = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [exercisesByPlan, setExercisesByPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Recupero tutti gli utenti
  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/user/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setUsers(data);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Errore nel recupero degli utenti.");
      }
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
      setErrorMessage("Errore nel recupero degli utenti. Riprova.");
    }
  };

  // Recupero le schede di allenamento per l'utente selezionato
  const fetchWorkoutPlans = async (userId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
      return;
    }

    try {
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
      if (response.ok && data.content && Array.isArray(data.content)) {
        setWorkoutPlans(data.content);
        fetchExercisesForAllPlans(data.content);
        setErrorMessage("");
      } else {
        setWorkoutPlans([]);
        setErrorMessage(data.message || "Errore nel recupero delle schede.");
      }
    } catch (error) {
      console.error("Errore nel recupero delle schede:", error);
      setErrorMessage("Errore nel recupero delle schede.");
    }
  };

  // Recupero tutti gli esercizi per ogni scheda
  const fetchExercisesForAllPlans = async (plans) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
      return;
    }

    try {
      const requests = plans.map((plan) =>
        fetch(`http://localhost:3001/exercise_workout/workout_plan/${plan.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => response.json())
      );

      const responses = await Promise.all(requests);
      const exercisesData = {};

      responses.forEach((data, index) => {
        const planId = plans[index].id;
        if (data.content && Array.isArray(data.content)) {
          exercisesData[planId] = data.content;
        } else {
          exercisesData[planId] = [];
        }
      });

      setExercisesByPlan(exercisesData);
      setErrorMessage("");
    } catch (error) {
      console.error("Errore nel recupero degli esercizi:", error);
      setErrorMessage("Errore nel recupero degli esercizi. Riprova.");
    }
  };

  // Gestione della selezione dell'utente
  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
    setLoading(true);
    fetchWorkoutPlans(userId).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="workout-plan-details-container">
      <h2 >Dettagli delle Schede di Allenamento</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <FormControl fullWidth margin="normal" className="form-container">
        <InputLabel>Seleziona Utente</InputLabel>
        <Select
          value={selectedUserId}
          onChange={(e) => handleUserSelection(e.target.value)}
          label="Seleziona Utente"
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
             {user.name} {user.surname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
          <p>Caricamento in corso...</p>
        </div>
      ) : workoutPlans.length === 0 ? (
        <p>Seleziona un utente per vedere le sue schede di allenamento.</p>
      ) : (
        workoutPlans.map((plan) => (
          <div key={plan.id} className="workout-plan-section">
            <h3>{plan.nome_scheda}</h3>
            <TableContainer component={Paper} className="table-container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome Esercizio</TableCell>
                    <TableCell>Serie</TableCell>
                    <TableCell>Ripetizioni</TableCell>
                    <TableCell>Peso Usato</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(exercisesByPlan[plan.id] || []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        Nessun esercizio disponibile per questa scheda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    exercisesByPlan[plan.id].map((exercise) => (
                      <TableRow key={exercise.id}>
                        <TableCell>{exercise.exercise.name}</TableCell>
                        <TableCell>{exercise.serie}</TableCell>
                        <TableCell>{exercise.ripetizioni}</TableCell>
                        <TableCell>{exercise.pesoUsato}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutPlanDetails;
