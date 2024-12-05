import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import "./WorkoutPlanDetails.css";

const WorkoutPlanDetails = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [exercisesByPlan, setExercisesByPlan] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // recupero tutte le schede di allenamento dell'utente loggato
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
        setErrorMessage("");
        fetchExercisesForAllPlans(data.content);
      } else {
        setErrorMessage(data.message || "Errore nel recupero delle schede. Riprova.");
      }
    } catch (error) {
      console.error("Errore nel recupero delle schede:", error);
      setErrorMessage("Errore nel recupero delle schede. Riprova.");
    }
  };

  // Funzione per recuperare gli esercizi per ciascuna scheda
  const fetchExercisesForAllPlans = async (workoutPlans) => {
    const token = localStorage.getItem("authToken");

    try {
      const exercisesData = {};
      for (let plan of workoutPlans) {
        const response = await fetch(
          `http://localhost:3001/exercise_workout/workout_plan/${plan.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.content && Array.isArray(data.content)) {
          exercisesData[plan.id] = data.content;
        } else {
          exercisesData[plan.id] = []; // vuoto se non ho ex.
        }
      }

      setExercisesByPlan(exercisesData);
    } catch (error) {
      console.error("Errore nel recupero degli esercizi:", error);
      setErrorMessage("Errore nel recupero degli esercizi. Riprova.");
    }
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  return (
    <div className="workout-plan-details-container">
      <h2>Dettagli delle Schede di Allenamento</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {workoutPlans.length === 0 ? (
        <p>Nessuna scheda disponibile per questo utente.</p>
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
                      <TableCell colSpan={4}>Nessun esercizio disponibile per questa scheda.</TableCell>
                    </TableRow>
                  ) : (
                    (exercisesByPlan[plan.id] || []).map((exercise) => (
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
