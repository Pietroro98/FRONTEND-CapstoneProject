import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function SearchExercise() {
  return (
    <Container
      sx={{
        mt: '100px',
      }}
    >
      {/* Titolo con testo alternato bianco e viola */}
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

      {/* Form di ricerca */}
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
          label="Inserisci il nome dell'esercizio che vuoi cercare !"
          variant="outlined"
          fullWidth
          sx={{ 
            maxWidth: 600 ,
            
            
        }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#5e2e8a',
            color: 'white',
            '&:hover': {
              backgroundColor: 'purple',
            },
            padding: '10px 25px', 
            borderRadius: 15, 
            fontSize: '14px',
          }}
        >
          Cerca
        </Button>
      </Box>
    </Container>
  );
}

export default SearchExercise;
