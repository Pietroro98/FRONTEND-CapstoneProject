import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutU } from "../../redux/reducers/authSlice";

const pages = [
  "Crea Scheda",
  "Aggiungi Esercizio alla scheda",
  "Schede utenti",
  "Crea esercizio",
  "Upload Avatar"
];

const settings = ["HomePage", "Account", "Login", "Logout"];

function BackofficeNavbar({ onPageChange }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const avatarURL = localStorage.getItem("avatarURL");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // snakbar
  const [setOpen] = React.useState(false);
  const [setMessage] = React.useState("");
  const [setSeverity] = React.useState("");

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

 // Logout
  const handleLogout = () => {
    localStorage.removeItem("avatarURL");
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuth");

    dispatch(logoutU());

    setMessage("Logout effettuato con successo!");
    setSeverity("success");
    setOpen(true);
    setTimeout(() => {
      navigate("/register");
    }, 1500);
  };

 //navigazione navbar con pagine
  const handleNavigate = (page) => {
    if (page === "Login") {
        navigate("/login");
    } else if (page === "Logout") {
      handleLogout();
    } else if (page === "HomePage") {
      navigate("/esercizi");
    } else {
      onPageChange(page);
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar
    position="fixed"
    sx={{
      backgroundColor: "#000000",
      borderRadius: "20px",
      margin: "10px",
      width: "calc(100% - 20px)",
    }}
  >
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <FontAwesomeIcon
            className="me-2"
            icon={faDumbbell}
            size="xl"
            style={{ color: "#763abb" }}
          />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{
                  "&:hover": {
                    color: "#763abb",
                    fontWeight: "bold",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Typography sx={{ textAlign: "center" }}>{page}</Typography>
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
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Ghisa
          <FontAwesomeIcon
            className="me-2"
            icon={faDumbbell}
            size="xl"
            style={{ color: "#763abb" }}
          />
          Gym
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handleNavigate(page)}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                "&:hover": {
                  color: "#763abb",
                  fontWeight: "bold",
                  backgroundColor: "transparent",
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
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleNavigate(setting)}
                sx={{
                  "&:hover": {
                    color: "#763abb",
                    fontWeight: "bold",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {setting}
                </Typography>
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
