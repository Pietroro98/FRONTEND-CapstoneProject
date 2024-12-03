import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      fetch(`/workout_plans/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          const workoutPlan = data.content[0];
          const workoutPlanId = workoutPlan.id;

          fetch(`/exercise_workout?workoutPlanId=${workoutPlanId}`)
            .then((response) => response.json())
            .then((exerciseData) => {
              const formattedRows = exerciseData.content.map((exercise) => ({
                id: exercise.id,
                nomeScheda: workoutPlan.nome_scheda,
                nomeEsercizio: exercise.nome,
                serie: exercise.serie,
                ripetizioni: exercise.ripetizioni,
                peso: exercise.pesoUsato,
              }));
              setRows(formattedRows);
            })
            .catch((err) => console.error('Errore nel caricamento degli esercizi:', err));
        })
        .catch((err) => console.error('Errore nel caricamento della scheda allenamento:', err));
    }
  }, [userId]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    const updatedRow = rows.find((row) => row.id === id);
    console.log('Dati salvati:', updatedRow);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'nomeScheda', headerName: 'Nome Scheda', width: 180 },
    { field: 'nomeEsercizio', headerName: 'Nome Esercizio', width: 180, editable: true },
    { field: 'serie', headerName: 'Serie', width: 120, type: 'number', editable: true },
    { field: 'ripetizioni', headerName: 'Ripetizioni', width: 180, type: 'number', editable: true },
    { field: 'peso', headerName: 'Peso', width: 180, type: 'number', editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.floor(Math.random() * 10000); // Genera un ID casuale per un nuovo esercizio
    setRows((oldRows) => [
      ...oldRows,
      { id, nomeScheda: '', nomeEsercizio: '', serie: '', ripetizioni: '', peso: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nomeEsercizio' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Aggiungi esercizio
      </Button>
    </GridToolbarContainer>
  );
}
