import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./WorkoutPlan.css";
import { Snackbar, Alert } from "@mui/material";

const AddExerciseToWorkoutPlan = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [ripetizioni, setRipetizioni] = useState("");
  const [serie, setSerie] = useState("");
  const [pesoUsato, setPesoUsato] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Gestione dello stato per il Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Recupera utenti per poi selezionarli
  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/user/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await response.json();
      if (response.ok) {
        setUsers(userData);
        setErrorMessage("");
      } else {
        setErrorMessage(userData.message || "Errore nel recupero utenti.");
      }
    } catch (error) {
      console.error("Errore nel recupero utenti:", error);
      setErrorMessage("Errore nel recupero utenti. Riprova.");
    }
  };

  // Recupera schede di allenamento per utente selezionato
  const fetchWorkoutPlans = async (userId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
      return;
    }

    try {
      const workoutResponse = await fetch(
        `http://localhost:3001/workout_plans/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const workoutData = await workoutResponse.json();
      if (workoutResponse.ok && Array.isArray(workoutData.content)) {
        setWorkoutPlans(workoutData.content);
        setErrorMessage("");
      } else {
        setErrorMessage(
          workoutData.message || "Errore nel recupero delle schede."
        );
      }
    } catch (error) {
      console.error("Errore nel recupero delle schede:", error);
      setErrorMessage("Errore nel recupero delle schede. Riprova.");
    }
  };

  // Recupera esercizi
  const fetchExercises = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/exercise?page=0&size=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok && Array.isArray(data.content)) {
        setExercises(data.content);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Errore nel recupero degli esercizi.");
      }
    } catch (error) {
      console.error("Errore nel recupero degli esercizi:", error);
      setErrorMessage("Errore nel recupero degli esercizi. Riprova.");
    }
  };

  // Aggiunge un esercizio alla scheda di allenamento
  const handleAddExerciseToWorkout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
      return;
    }

    const workoutData = {
      workoutPlanId: selectedWorkoutPlan,
      exerciseId: selectedExerciseId,
      ripetizioni,
      serie,
      pesoUsato,
    };

    try {
      const response = await fetch("http://localhost:3001/exercise_workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Esercizio aggiunto con successo!");
        setSeverity("success");
        setOpen(true);
        setSelectedWorkoutPlan("");
        setSelectedExerciseId("");
        setRipetizioni("");
        setSerie("");
        setPesoUsato("");
        setErrorMessage("");
      } else {
        setErrorMessage(
          data.message || "Errore nell'aggiunta dell'esercizio. Riprova."
        );
      }
    } catch (error) {
      console.error("Errore nell'aggiunta dell'esercizio:", error);
      setErrorMessage("Errore nell'aggiunta dell'esercizio. Riprova.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchExercises();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchWorkoutPlans(selectedUserId);
    }
  }, [selectedUserId]);

  return (
    <div className="add-exercise-container">
      <h2 className="add-exercise-title">Aggiungi Esercizio alla Scheda</h2>

      <div className="form-container">
        <FormControl margin="normal" fullWidth>
          <InputLabel>Seleziona Utente</InputLabel>
          <Select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            label="Seleziona Utente"
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel>Seleziona Scheda</InputLabel>
          <Select
            value={selectedWorkoutPlan}
            onChange={(e) => setSelectedWorkoutPlan(e.target.value)}
            label="Seleziona Scheda"
          >
            {workoutPlans.map((plan) => (
              <MenuItem key={plan.id} value={plan.id}>
                {plan.nome_scheda}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel>Seleziona Esercizio</InputLabel>
          <Select
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            label="Seleziona Esercizio"
          >
            {exercises.map((exercise) => (
              <MenuItem key={exercise.id} value={exercise.id}>
                {exercise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Ripetizioni"
          variant="outlined"
          type="number"
          value={ripetizioni}
          onChange={(e) => setRipetizioni(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Serie"
          variant="outlined"
          type="number"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Peso Usato"
          variant="outlined"
          type="number"
          value={pesoUsato}
          onChange={(e) => setPesoUsato(e.target.value)}
          fullWidth
          margin="normal"
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddExerciseToWorkout}
          className="add-exercise-button"
        >
          Aggiungi Esercizio
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: "#763abb",
            color: "#ffffff",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddExerciseToWorkoutPlan;
