import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ProblemRow from "./ProblemRow";

export default function TopicBox({ topic, progress, handleProgress }) {
  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 2,
        background: "#f8fbff",
        boxShadow: "0 2px 8px 0 rgba(60,120,180,0.07)",
        animation: "fadeInUp 0.5s",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 2, color: "#1976d2", letterSpacing: 0.5 }}
      >
        {topic.name}
      </Typography>
      <TableContainer sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ background: "#e3f2fd" }}>
              <TableCell
                sx={{
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#e3f2fd",
                }}
              >
                Progress
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#e3f2fd",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#e3f2fd",
                }}
              >
                Problem
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#e3f2fd",
                }}
              >
                Difficulty
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#e3f2fd",
                }}
              >
                LeetCode
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#e3f2fd",
                }}
              >
                Article
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#e3f2fd",
                }}
              >
                YouTube
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topic.problems.map((problem) => (
              <ProblemRow
                key={problem._id}
                problem={problem}
                progress={progress}
                handleProgress={handleProgress}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
