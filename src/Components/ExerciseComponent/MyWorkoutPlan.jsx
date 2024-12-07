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
} from "@mui/material";
import "./WorkoutPlanDetails.css";

const MyWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [exercisesByPlan, setExercisesByPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.sub;
  };

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setErrorMessage("Token di autenticazione mancante. Assicurati di essere loggato.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/workout_plans/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
        setErrorMessage("Errore nel recupero delle schede. Riprova.");
      } finally {
        setLoading(false);
      }
    };

    const fetchExercisesForAllPlans = async (plans) => {
      const token = localStorage.getItem("authToken");

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

    fetchWorkoutPlans();
  }, []);

  return (
    <div className="workout-plan-details-container">
      <h2>Le tue Schede di Allenamento</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {loading ? (
        <div>
          <CircularProgress />
          <p>Caricamento in corso...</p>
        </div>
      ) : workoutPlans.length === 0 ? (
        <p>Non hai ancora creato schede di allenamento.</p>
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

export default MyWorkoutPlan;
