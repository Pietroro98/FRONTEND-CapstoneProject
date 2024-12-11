import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import "./SearchExercise.css";

function SearchExercise() {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null); 
  const [error, setError] = useState(false);

  // Fetch per ottenere le parti del corpo
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError("Non sei autenticato. Effettua il login.");
          return;
        }

        const response = await fetch(`http://localhost:3001/body-parts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBodyParts(data);
        } else {
          setError("Errore durante il recupero delle parti del corpo.");
        }
      } catch (error) {
        console.error("Errore nella connessione:", error);
        setError("Errore di rete. Riprova più tardi.");
      }
    };

    fetchBodyParts();
  }, []);

  //fetch per ottenere gli esercizi con paginazione anche in base alla parte del corpo cercata
  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError("Non sei autenticato. Effettua il login.");
        return;
      }

      const url = bodyPart
        ? `http://localhost:3001/exercise/body-Part?bodyPartName=${bodyPart}&page=0&size=100`
        : `http://localhost:3001/exercise?page=0&size=100`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExercises(data.content || []);
      } else {
        setError("Errore durante il recupero degli esercizi.");
      }
    } catch (error) {
      console.error("Errore nella connessione:", error);
      setError("Errore di rete. Riprova più tardi.");
    }
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const handleOpenDialog = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseDialog = () => {
    setSelectedExercise(null);
  };

  return (
    <Container sx={{ mt: '100px' }}>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            '& span': {
              color: '#5e2e8a',
            },
          }}
        >
          Cerca il tuo <span>Esercizio</span>
        </Typography>
      </Box>

      {/* Sezione di input per parte del corpo */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          mt: 4,
        }}
      >
        <FormControl fullWidth sx={{ maxWidth: 600 }}>
          <InputLabel id="body-part-label">Seleziona la parte del corpo</InputLabel>
          <Select
            labelId="body-part-label"
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            label="Seleziona la parte del corpo"
          >
            {bodyParts.map((part) => (
              <MenuItem key={part.id} value={part.nome}>
                {part.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Sezione di input per il nome dell'esercizio */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          mt: 4,
        }}
      >
        <TextField
          label="Inserisci il nome dell'esercizio che vuoi cercare!"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: 600 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchExercises} 
          sx={{ backgroundColor: "#763abb"}}
        >
          Cerca
        </Button> 
      </Box>
      {error && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
          {error}
        </Typography>
      )}

      {/* Sezione di visualizzazione degli esercizi */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: 4,
          mt: 4,
        }}
      >
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} sx={{ maxWidth: 345, mx: 'auto' }}>
            <CardMedia
              component="img"
              height="300"
              image={exercise.avatar}
              alt={exercise.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {exercise.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleOpenDialog(exercise)}
                sx={{ color: "#763abb"}}
              >
                Dettagli
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Pop-up per i dettagli */}
      {selectedExercise && (
        <Dialog open={Boolean(selectedExercise)} onClose={handleCloseDialog}>
          <DialogTitle>{selectedExercise.name}</DialogTitle>
          <DialogContent>
            <Typography>
              <strong className="strong-title">Attrezzatura:</strong> {selectedExercise.equipment}
            </Typography>
            <Typography>
              <strong className="strong-title">Target:</strong> {selectedExercise.target}
            </Typography>
            <Typography>
              <strong className="strong-title">Muscoli secondari:</strong> {selectedExercise.secondaryMuscles}
            </Typography>
            <Typography>
              <strong className="strong-title">Istruzioni:</strong> {selectedExercise.instructions}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{  color: "#763abb"}}>
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default SearchExercise;
