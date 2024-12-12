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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./WorkoutPlan.css";
import { Snackbar, Alert } from "@mui/material";

const WorkoutPlan = () => {
  const [nomeScheda, setNomeScheda] = useState("");
  const [dataCreazione, setDataCreazione] = useState("");
  const [dataAllenamento, setDataAllenamento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedViewUserId, setSelectedViewUserId] = useState("");

 // Gestione dello stato per il Snackbar
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState("");
 const [severity, setSeverity] = useState("success");

  // Recupera la lista degli utenti
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

      const data = await response.json();
      if (data && Array.isArray(data)) {
        setUserList(data);
      } else {
        setErrorMessage(
          data.message || "Errore nel recupero degli utenti. Riprova."
        );
      }
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
      setErrorMessage("Errore nel recupero degli utenti. Riprova.");
    }
  };

  // Funzione per creare la scheda di allenamento
  const handleCreateWorkoutPlan = async () => {
    if (!selectedUserId) {
      setErrorMessage("Devi selezionare un utente.");
      return;
    }

    const workoutData = {
      nomeScheda,
      dataCreazione,
      dataAllenamento,
      userId: selectedUserId, // ID utente
    };

    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/workout_plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();
      console.log("Server response:", data);
      if (response.ok) {
        setMessage("Scheda di allenamento creata con successo!");
        setSeverity("success");
        setOpen(true);
        fetchWorkoutPlans(selectedUserId);
        setNomeScheda("");
        setDataCreazione("");
        setDataAllenamento("");
        setSelectedUserId("");
        setErrorMessage("");
      } else {
        setErrorMessage(
          data.message || "Errore nella creazione della scheda. Riprova."
        );
      }
    } catch (error) {
      console.error("Errore nella creazione della scheda:", error);
      setErrorMessage("Errore nella creazione della scheda. Riprova.");
    }
  };

  // Funzione per recuperare le schede di allenamento per un utente specifico
  const fetchWorkoutPlans = async (userId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        "Token di autenticazione mancante. Assicurati di essere loggato."
      );
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
      console.log("Workout plans response:", data);

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

  // Funzione per gestire la selezione dell'utente per visualizzare le sue schede
  const handleSelectViewUser = (e) => {
    const userId = e.target.value;
    console.log("User selected for viewing: ", userId);
    setSelectedViewUserId(userId);
    fetchWorkoutPlans(userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="workout-container">
      <h2 className="workout-title">Crea la tua Scheda di Allenamento</h2>

      <div className="form-container">
        {/* Seleziona l'utente per la creazione della scheda */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Seleziona un Utente per Creare la Scheda</InputLabel>
          <Select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            label="Seleziona un Utente per Creare la Scheda"
          >
            {userList.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateWorkoutPlan}
          className="create-button"
          sx={{ marginBottom: 3 }}
        >
          Crea Scheda
        </Button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>

      <h2 className="workout-title">Visualizza le Schede Create</h2>

      {/* Seleziona l'utente per visualizzare le sue schede */}
      <FormControl fullWidth margin="normal" className="form-container">
        <InputLabel>Seleziona un Utente per Visualizzare le Schede</InputLabel>
        <Select
          value={selectedViewUserId}
          onChange={handleSelectViewUser}
          label="Seleziona un Utente per Visualizzare le Schede"
        >
          {userList.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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

export default WorkoutPlan;
