import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import "./WorkoutPlan.css";
import { Snackbar, Alert } from "@mui/material";

function UploadAvatarToExercise() {
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Gestione dello stato per il Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    const fetchExercises = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(
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
          setError("");
        } else {
          setError(data.message || "Errore nel recupero degli esercizi.");
        }
      } catch (error) {
        console.error("Errore nel recupero degli esercizi:", error);
        setError("Errore nel recupero degli esercizi. Riprova.");
      }
    };

    fetchExercises();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedExerciseId || !file) {
      setError("Seleziona un esercizio e un file immagine.");
      return;
    }
  
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("exerciseId", selectedExerciseId);
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Non sei autenticato. Effettua il login.");
        return;
      }
  
      const response = await fetch("http://localhost:3001/exercise/avatar", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.text();
        console.log("Avatar caricato:", data);
        setMessage("Avatar caricatocon successo!");
        setSeverity("success");
        setOpen(true);
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Errore nel caricamento dell'avatar.");
      }
    } catch (error) {
      console.error("Errore nella richiesta di caricamento avatar:", error);
      setError("Errore di rete. Riprova più tardi.");
    }
  };

  return (
    <>
    <Container sx={{ mt: 15 }} className="form-container">
      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 5 }}>
        Carica Avatar per un Esercizio
      </Typography>

      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success" sx={{ textAlign: "center" }}>
          Avatar caricato con successo!
        </Typography>
      )}

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl fullWidth>
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
          type="file"
          label="Seleziona Immagine"
          variant="outlined"
          fullWidth
          onChange={handleFileChange}
          inputProps={{ accept: "image/*" }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadAvatar}
          sx={{ mt: 4 }}
        >
          Carica Avatar
        </Button>
      </Box>

      {/* snakbar */}
    </Container>
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
    </>
  );
}

export default UploadAvatarToExercise;
