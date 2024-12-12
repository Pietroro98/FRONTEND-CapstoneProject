import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";


function CreateExercise() {
  const [bodyParts, setBodyParts] = useState([]);
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [target, setTarget] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState("");
  const [instructions, setInstructions] = useState("");
  // const [avatarUrl, setAvatarUrl] = useState("");
  const [bodyPartId, setBodyPartId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Gestione dello stato per il Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Token di autenticazione mancante.");
          return;
        }

        const response = await fetch("http://localhost:3001/body-parts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Risposta delle parti del corpo:", data);

        if (Array.isArray(data)) {
          setBodyParts(data);
        } else {
          setError("Dati delle parti del corpo non validi.");
        }
      } catch (error) {
        console.error("Errore nel recupero delle parti del corpo:", error);
        setError("Errore nel recupero delle parti del corpo.");
      }
    };

    fetchBodyParts();
  }, []);

  const handleCreateExercise = async () => {
    const exerciseData = {
      name,
      equipment,
      target,
      secondaryMuscles,
      instructions,
      // avatarUrl,
      bodyPartId: parseInt(bodyPartId),
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Non sei autenticato. Effettua il login.");
        return;
      }

      const response = await fetch("http://localhost:3001/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exerciseData),
      });

      if (response.ok) {
        setMessage("Esercizio aggiunto con successo!");
        setSeverity("success");
        setOpen(true);
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Errore durante la creazione dell'esercizio."
        );
      }
    } catch (error) {
      console.error("Errore nella creazione dell'esercizio:", error);
      setError("Errore di rete. Riprova più tardi.");
    }
  };

  return (
    <>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mt: 15, mb: 5 }}>
        Crea un Nuovo Esercizio
      </Typography>

      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success" sx={{ textAlign: "center" }}>
          Esercizio creato con successo!
        </Typography>
      )}

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel>Seleziona Parte del Corpo</InputLabel>
          <Select
            value={bodyPartId}
            onChange={(e) => setBodyPartId(e.target.value)}
            label="Seleziona Parte del Corpo"
          >
            {bodyParts.map((part) => (
              <MenuItem key={part.id} value={part.id}>
                {part.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Nome dell'esercizio"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Attrezzatura"
          variant="outlined"
          fullWidth
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        />
        <TextField
          label="Target"
          variant="outlined"
          fullWidth
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <TextField
          label="Muscoli secondari"
          variant="outlined"
          fullWidth
          value={secondaryMuscles}
          onChange={(e) => setSecondaryMuscles(e.target.value)}
        />
        <TextField
          label="Istruzioni"
          variant="outlined"
          fullWidth
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        {/* <TextField
          label="URL dell'avatar"
          variant="outlined"
          fullWidth
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        /> */}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateExercise}
          sx={{backgroundColor: "#763abb", mt: 4 }}
        >
          Crea Esercizio
        </Button>
      </Box>

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

export default CreateExercise;
