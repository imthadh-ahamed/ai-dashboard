import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import {
  PictureAsPdf as PdfIcon,
  GridOn as CsvIcon,
  Image as PngIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

const ExportButton = ({ data, fileName = "jk-financial-data" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exportToCsv = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    let csv = headers.join(",") + "\n";

    data.forEach((row) => {
      csv += headers.map((header) => row[header]).join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.csv`;
    link.click();
    handleClose();
  };

  const exportToJson = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();
    handleClose();
  };

  const exportToPdf = () => {
    // In a real implementation, you would use a library like jsPDF
    console.log("PDF export would be implemented here");
    handleClose();
  };

  const shareData = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "John Keells Financial Data",
          text: "Check out this financial dashboard",
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        console.log("Web Share API not supported");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ShareIcon />}
        onClick={handleClick}
        aria-controls={open ? "export-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ textTransform: "none" }}
      >
        Export Data
      </Button>
      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "export-button",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={exportToCsv}>
          <ListItemIcon>
            <CsvIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Export as CSV</Typography>
        </MenuItem>
        <MenuItem onClick={exportToJson}>
          <ListItemIcon>
            <CsvIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Export as JSON</Typography>
        </MenuItem>
        <MenuItem onClick={exportToPdf}>
          <ListItemIcon>
            <PdfIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Export as PDF</Typography>
        </MenuItem>
        <MenuItem onClick={shareData}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Share</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExportButton;
