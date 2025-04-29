import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();

  return (
    <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        size="large"
        aria-label="toggle theme"
        color="inherit"
        onClick={() => setDarkMode(!darkMode)}
        sx={{
          ml: 1,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        {darkMode ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LightModeIcon sx={{ color: theme.palette.warning.light }} />
          </Box>
        ) : (
          <DarkModeIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
