import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          John Keells Financial Dashboard
        </Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="secondary"
        />
        <Typography variant="body1">
          {darkMode ? "Dark" : "Light"} Mode
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
