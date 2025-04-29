import React from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import {
  Lightbulb as LightbulbIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const InsightBox = ({ insight }) => {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: "primary.light" }}>
      <Box display="flex" alignItems="center">
        <LightbulbIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          AI Insight
        </Typography>
        <IconButton size="small" onClick={() => setOpen(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {insight}
      </Typography>
    </Paper>
  );
};

export default InsightBox;
