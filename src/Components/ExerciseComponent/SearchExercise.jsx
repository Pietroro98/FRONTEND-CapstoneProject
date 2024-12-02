import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
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

function SearchExercise() {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null); 
  const [error, setError] = useState(false);

  
  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError("Non sei autenticato. Effettua il login.");
        return;
      }

      const response = await fetch("http://localhost:3001/exercise", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExercises(data.content);
      } else {
        setError("Errore durante il recupero degli esercizi.");
      }
    } catch (error) {
      console.error("Errore nella connessione:", error);
      setError("Errore di rete. Riprova più tardi.");
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

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
      {/* Sezione di ricerca */}
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

      {/* Mostra errori */}
      {error && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
          {error}
        </Typography>
      )}

      {/* Sezione di visualizzazione */}
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
              <strong>Attrezzatura:</strong> {selectedExercise.equipment}
            </Typography>
            <Typography>
              <strong>Target:</strong> {selectedExercise.target}
            </Typography>
            <Typography>
              <strong>Muscoli secondari:</strong> {selectedExercise.secondaryMuscles}
            </Typography>
            <Typography>
              <strong>Istruzioni:</strong> {selectedExercise.instructions}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default SearchExercise;
