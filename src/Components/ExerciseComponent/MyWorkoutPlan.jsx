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
  IconButton,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import "../BackOfficeComponents/WorkoutPlanDetails.css";
import { Snackbar, Alert } from "@mui/material";

const MyWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [exercisesByPlan, setExercisesByPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingExercise, setEditingExercise] = useState(null);

  // Gestione dello stato per il Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.sub;
  };

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setErrorMessage(
          "Token di autenticazione mancante. Assicurati di essere loggato."
        );
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
          fetch(
            `http://localhost:3001/exercise_workout/workout_plan/${plan.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((response) => response.json())
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

   // Funzione per iniziare la modifica di un esercizio
  const handleEdit = (exerciseId, exerciseData) => {
    setEditingExercise({
      ...exerciseData,
      id: exerciseId,
      planId: exerciseData.workoutPlan.id,
    });
  };

  // Funzione per salvare l'esercizio modificato tramite PUT
  const handleSave = async (exerciseId) => {
    if (!editingExercise) {
      setErrorMessage("Non ci sono modifiche da salvare.");
      setMessage("Non ci sono modifiche da salvare.");
      setSeverity("error");
      setOpen(true);
      return;
    }

    // Aggiorno i dati localmente
    const updatedExercises = exercisesByPlan[editingExercise.planId].map(
      (exercise) => {
        if (exercise.id === exerciseId) {
          return { ...exercise, ...editingExercise };
        }
        return exercise;
      }
    );

    // (setta gli esercizi aggiornati per quel piano)
    const updatedExercisesByPlan = {
      ...exercisesByPlan,
      [editingExercise.planId]: updatedExercises,
    };
    setExercisesByPlan(updatedExercisesByPlan);

    const updatedData = {
      ripetizioni: editingExercise.ripetizioni,
      serie: editingExercise.serie,
      pesoUsato: editingExercise.pesoUsato,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/exercise_workout/${exerciseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setErrorMessage("");
        setMessage("Dati salvati con successo!");
        setSeverity("success");
        setOpen(true);
      } else {
        setErrorMessage(data.message || "Errore nel salvataggio.");
        setMessage(data.message || "Errore nel salvataggio.");
        setSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
      setErrorMessage("Errore nel salvataggio.");
      setMessage("Errore nel salvataggio.");
      setSeverity("error");
      setOpen(true);
    } finally {
      setEditingExercise(null);
    }
  };
// Gestione del cambio dei valori nei campi di modifica
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingExercise((prev) => ({ ...prev, [name]: value }));
  };

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
                    <TableCell>Azioni</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(exercisesByPlan[plan.id] || []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        Nessun esercizio disponibile per questa scheda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    exercisesByPlan[plan.id].map((exercise) => (
                      <TableRow key={exercise.id}>
                        <TableCell>{exercise.exercise.name}</TableCell>
                        <TableCell>
                          {editingExercise?.id === exercise.id ? (
                            <TextField
                              name="serie"
                              value={editingExercise.serie}
                              onChange={handleChange}
                              size="small"
                            />
                          ) : (
                            exercise.serie
                          )}
                        </TableCell>
                        <TableCell>
                          {editingExercise?.id === exercise.id ? (
                            <TextField
                              name="ripetizioni"
                              value={editingExercise.ripetizioni}
                              onChange={handleChange}
                              size="small"
                            />
                          ) : (
                            exercise.ripetizioni
                          )}
                        </TableCell>
                        <TableCell>
                          {editingExercise?.id === exercise.id ? (
                            <TextField
                              name="pesoUsato"
                              value={editingExercise.pesoUsato}
                              onChange={handleChange}
                              size="small"
                            />
                          ) : (
                            exercise.pesoUsato
                          )}
                        </TableCell>
                        <TableCell>
                          {editingExercise?.id === exercise.id ? (
                            <IconButton onClick={() => handleSave(exercise.id)}>
                              <FontAwesomeIcon icon={faSave} />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => handleEdit(exercise.id, exercise)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
        ))
      )}
    </div>
  );
};

export default MyWorkoutPlan;
