import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const pages = [
  "Crea Scheda", 
  "Aggiungi Esercizio alla scheda", 
  "Schede utenti", 
  "Crea esercizio"
];
const settings = ['HomePage', 'Account', 'Login', 'Logout']; // Aggiungi HomePage

function BackofficeNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const avatarURL = localStorage.getItem('avatarURL'); // Se hai una URL per l'avatar dell'utente

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (page) => {
    switch (page) {
      case "Crea Scheda":
        navigate("/WorkoutPlan");
        break;
      case "Aggiungi Esercizio alla scheda":
        navigate("/AddExerciseToWorkoutPlan");
        break;
      case "Schede utenti":
        navigate("/WorkoutPlanDetails");
        break;
      case "Crea esercizio":
        navigate("/CreateExercise");
        break;
      case "HomePage": // Aggiungi la logica per HomePage
        navigate("/ExercisePage"); // Reindirizza a ExercisePage
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="fixed"
      sx={{
        backgroundColor: "#000000",
        borderRadius: "20px",
        margin: "10px",
        width: "calc(100% - 20px)",
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <FontAwesomeIcon
              className="me-2"
              icon={faDumbbell}
              size="xl"
              style={{ color: "#763abb" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => { handleNavigate(page); handleCloseNavMenu(); }}
                  sx={{
                    '&:hover': { color: "#763abb", fontWeight: "bold", backgroundColor: 'transparent' },
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Backoffice
            <FontAwesomeIcon
              className="me-2"
              icon={faDumbbell}
              size="xl"
              style={{ color: "#763abb" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{
                  my: 2, color: 'white', display: 'block', '&:hover': {
                    color: '#763abb', fontWeight: 'bold', backgroundColor: 'transparent',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={avatarURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}
                  sx={{
                    '&:hover': {
                      color: '#763abb',
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default BackofficeNavbar;
