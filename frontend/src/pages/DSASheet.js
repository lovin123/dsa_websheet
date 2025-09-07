import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Checkbox,
  Link as MuiLink,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import { fetchDSASheet, fetchProgress, updateProgress } from "../api";

export default function DSASheet() {
  const [sheet, setSheet] = useState([]);
  // Use a Set for completed problem IDs
  const [progress, setProgress] = useState(new Set());
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Utility to extract error message from any API error
  function getApiError(err, fallback) {
    if (err?.response?.data?.error) return err.response.data.error;
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.message) return err.message;
    return fallback;
  }

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchDSASheet(token);
        if (Array.isArray(data)) {
          setSheet(data);
        } else {
          setSheet(data.chapters || []);
        }
        const progArr = await fetchProgress(token);
        // Transform to Set of completed problem IDs
        const completedSet = new Set(
          (progArr || []).filter((p) => p.completed).map((p) => p.problem)
        );
        setProgress(completedSet);
      } catch (err) {
        setError(getApiError(err, "Failed to load DSA Sheet"));
        setOpen(true);
      }
    }
    loadData();
  }, [token]);

  const handleProgress = async (problemId, checked) => {
    setProgress((prev) => {
      const newSet = new Set(prev);
      if (checked) newSet.add(problemId);
      else newSet.delete(problemId);
      return newSet;
    });
    try {
      await updateProgress(problemId, checked, token);
    } catch (err) {
      setError(getApiError(err, "Failed to update progress"));
      setOpen(true);
    }
  };
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        DSA Sheet
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
        {sheet.length === 0 ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          sheet.map((chapter) => (
            <Accordion key={chapter._id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{chapter.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {chapter.topics.map((topic) => (
                  <Box key={topic._id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {topic.name}
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Problem</TableCell>
                            <TableCell>Difficulty</TableCell>
                            <TableCell>LeetCode</TableCell>
                            <TableCell>Article</TableCell>
                            <TableCell>YouTube</TableCell>
                            <TableCell>Progress</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topic.problems.map((problem) => (
                            <TableRow key={problem._id}>
                              <TableCell>{problem.name}</TableCell>
                              <TableCell>
                                <Chip
                                  label={problem.level}
                                  color={
                                    problem.level === "Easy"
                                      ? "success"
                                      : problem.level === "Medium"
                                      ? "warning"
                                      : "error"
                                  }
                                  size="small"
                                  sx={{ ml: 1 }}
                                />
                              </TableCell>
                              <TableCell>
                                {problem.leetcodeLink && (
                                  <IconButton
                                    component={MuiLink}
                                    href={problem.leetcodeLink}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <CodeIcon color="primary" />
                                  </IconButton>
                                )}
                              </TableCell>
                              <TableCell>
                                {problem.articleLink && (
                                  <IconButton
                                    component={MuiLink}
                                    href={problem.articleLink}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <ArticleIcon color="action" />
                                  </IconButton>
                                )}
                              </TableCell>
                              <TableCell>
                                {problem.youtubeLink && (
                                  <IconButton
                                    component={MuiLink}
                                    href={problem.youtubeLink}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <YouTubeIcon color="error" />
                                  </IconButton>
                                )}
                              </TableCell>
                              <TableCell>
                                <Checkbox
                                  checked={progress.has(problem._id)}
                                  onChange={(e) =>
                                    handleProgress(
                                      problem._id,
                                      e.target.checked
                                    )
                                  }
                                  color="primary"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Paper>
    </Container>
  );
}
