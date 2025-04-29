import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Avatar,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchShareholdersData } from "../services/api";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const Shareholders = () => {
  const [shareholdersData, setShareholdersData] = useState([]);
  const [year, setYear] = useState(2024);
  const [view, setView] = useState("chart");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchShareholdersData(year);
      setShareholdersData(data);
    };
    loadData();
  }, [year]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const topShareholders = shareholdersData.slice(0, 20);
  const others = shareholdersData
    .slice(20)
    .reduce((sum, current) => sum + current.percentage, 0);

  const pieData = [
    ...topShareholders.map((item) => ({
      name: item.name,
      value: item.percentage,
    })),
    { name: "Others", value: others },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shareholders Information
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select value={year} label="Year" onChange={handleYearChange}>
              {[2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>View</InputLabel>
            <Select value={view} label="View" onChange={handleViewChange}>
              <MenuItem value="chart">Pie Chart</MenuItem>
              <MenuItem value="table">Detailed Table</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {view === "chart" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: "500px" }}>
              <Typography variant="h6" gutterBottom align="center">
                Top 20 Shareholders Distribution ({year})
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Ownership"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: "500px", overflow: "auto" }}>
              <Typography variant="h6" gutterBottom>
                Top 5 Shareholders ({year})
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Shareholder</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topShareholders.slice(0, 5).map((row, index) => (
                      <TableRow key={row.name}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                mr: 1,
                                bgcolor: COLORS[index % COLORS.length],
                              }}
                            >
                              {row.name.charAt(0)}
                            </Avatar>
                            {row.name}
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row.percentage}%</TableCell>
                        <TableCell>{row.type || "Individual"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Complete Shareholders List ({year})
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Shareholder</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                  <TableCell>Shares Held</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topShareholders.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.percentage}%</TableCell>
                    <TableCell align="right">
                      {row.shares_held
                        ? row.shares_held.toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{row.type || "Individual"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default Shareholders;
