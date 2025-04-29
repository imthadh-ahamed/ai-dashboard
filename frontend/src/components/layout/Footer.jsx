import React from "react";
import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {currentYear} John Keells Financial Dashboard. All rights reserved.
        </Typography>

        <Box sx={{ display: "flex", mt: { xs: 1, sm: 0 } }}>
          <MuiLink
            href="https://github.com/yourusername/jk-financial-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mx: 1 }}
          >
            <GitHubIcon fontSize="small" />
          </MuiLink>
          <MuiLink
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mx: 1 }}
          >
            <LinkedInIcon fontSize="small" />
          </MuiLink>
          <MuiLink
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mx: 1 }}
          >
            <TwitterIcon fontSize="small" />
          </MuiLink>
        </Box>

        <Box sx={{ display: "flex", mt: { xs: 1, sm: 0 } }}>
          <MuiLink href="/privacy" color="inherit" sx={{ mx: 1 }}>
            <Typography variant="body2">Privacy Policy</Typography>
          </MuiLink>
          <MuiLink href="/terms" color="inherit" sx={{ mx: 1 }}>
            <Typography variant="body2">Terms of Service</Typography>
          </MuiLink>
          <MuiLink href="/contact" color="inherit" sx={{ mx: 1 }}>
            <Typography variant="body2">Contact Us</Typography>
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
