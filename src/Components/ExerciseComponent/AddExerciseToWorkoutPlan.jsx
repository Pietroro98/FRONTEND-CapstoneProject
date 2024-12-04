import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const AddExerciseToWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [ripetizioni, setRipetizioni] = useState("");
  const [serie, setSerie] = useState("");
  const [pesoUsato, setPesoUsato] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Recupera le schede di allenamento dell'utente
  const fetchWorkoutPlans = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

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
      if (data.content && Array.isArray(data.content)) {
        setWorkoutPlans(data.content);
      } else {
        setErrorMessage(data.message || "Errore nel recupero delle schede. Riprova.");
      }
    } catch (error) {
      console.error("Errore nel recupero delle schede:", error);
      setErrorMessage("Errore nel recupero delle schede. Riprova.");
    }
  };

  // Recupera gli esercizi disponibili
  const fetchExercises = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/exercise", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setExercises(data);
      } else {
        setErrorMessage(data.message || "Errore nel recupero degli esercizi. Riprova.");
      }
    } catch (error) {
      console.error("Errore nel recupero degli esercizi:", error);
      setErrorMessage("Errore nel recupero degli esercizi. Riprova.");
    }
  };

  // Aggiungi esercizio alla scheda di allenamento
  const handleAddExerciseToWorkout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
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
        setSelectedWorkoutPlan("");
        setSelectedExerciseId("");
        setRipetizioni("");
        setSerie("");
        setPesoUsato("");
        setErrorMessage("");
        alert("Esercizio aggiunto con successo!");
      } else {
        setErrorMessage(data.message || "Errore nell'aggiunta dell'esercizio. Riprova.");
      }
    } catch (error) {
      console.error("Errore nell'aggiunta dell'esercizio:", error);
      setErrorMessage("Errore nell'aggiunta dell'esercizio. Riprova.");
    }
  };

  useEffect(() => {
    fetchWorkoutPlans();
    // fetchExercises();
  }, []);

  return (
    <div className="add-exercise-container">
      <h2>Aggiungi Esercizio alla Scheda</h2>

      {/* Seleziona la scheda di allenamento */}
      <FormControl fullWidth margin="normal">
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

      {/* Seleziona esercizio */}
      <FormControl fullWidth margin="normal">
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

      {/* Ripetizioni */}
      <TextField
        label="Ripetizioni"
        variant="outlined"
        type="number"
        value={ripetizioni}
        onChange={(e) => setRipetizioni(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Serie */}
      <TextField
        label="Serie"
        variant="outlined"
        type="number"
        value={serie}
        onChange={(e) => setSerie(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Peso Usato */}
      <TextField
        label="Peso Usato"
        variant="outlined"
        type="number"
        value={pesoUsato}
        onChange={(e) => setPesoUsato(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Errore */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Aggiungi esercizio */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExerciseToWorkout}
        className="add-exercise-button"
      >
        Aggiungi Esercizio
      </Button>
    </div>
  );
};

export default AddExerciseToWorkoutPlan;
