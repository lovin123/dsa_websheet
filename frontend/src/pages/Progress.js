import { useEffect, useState } from "react";
import { fetchProgress, fetchProgressStats, fetchDSASheet } from "../api";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  CircularProgress,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

export default function Progress() {
  const token = localStorage.getItem("token");
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({ completed: 0, total: 0 });
  const [chapterStats, setChapterStats] = useState([]);
  const [difficultyStats, setDifficultyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [progressData, statsData, sheetData] = await Promise.all([
          fetchProgress(token),
          fetchProgressStats(token),
          fetchDSASheet(token),
        ]);
        setProgress(progressData);
        setStats(statsData);

        // Build lookup for completed problems and for all problems
        const completedSet = new Set(
          progressData.filter((p) => p.completed).map((p) => p.problem)
        );
        // Map problemId to problem object
        const problemMap = {};
        sheetData.forEach((chapter) => {
          chapter.topics.forEach((topic) => {
            topic.problems.forEach((pr) => {
              problemMap[pr._id] = { ...pr, chapter: chapter.name };
            });
          });
        });

        // Chapter-wise stats (aggregate all topics per chapter)
        const chapterStatsArr = sheetData.map((chapter) => {
          let total = 0;
          let completed = 0;
          chapter.topics.forEach((topic) => {
            total += topic.problems.length;
            completed += topic.problems.filter((pr) =>
              completedSet.has(pr._id)
            ).length;
          });
          return { chapter: chapter.name, completed, total };
        });
        setChapterStats(chapterStatsArr);

        // Difficulty-wise stats
        const difficulties = ["Easy", "Medium", "Tough"];
        const diffStatsArr = difficulties.map((level) => {
          const allProblems = [];
          sheetData.forEach((chapter) => {
            chapter.topics.forEach((topic) => {
              topic.problems.forEach((pr) => {
                if (pr.level === level) allProblems.push(pr);
              });
            });
          });
          const total = allProblems.length;
          const completed = allProblems.filter((pr) =>
            completedSet.has(pr._id)
          ).length;
          return { level, completed, total };
        });
        setDifficultyStats(diffStatsArr);

        // Attach problemMap for rendering progress table
        setProgress(
          progressData.map((p) => ({ ...p, problemObj: problemMap[p.problem] }))
        );

        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load progress");
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Progress
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Box mb={2} display="flex" justifyContent="center" gap={2}>
          <Chip label={`Completed: ${stats.completed}`} color="success" />
          <Chip label={`Total: ${stats.total}`} color="primary" />
        </Box>

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Chapter-wise Progress
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Chapter</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chapterStats.map((c, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{c.chapter}</TableCell>
                    <TableCell>{c.completed}</TableCell>
                    <TableCell>{c.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Difficulty-wise Progress
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Difficulty</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {difficultyStats.map((d, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{d.level}</TableCell>
                    <TableCell>{d.completed}</TableCell>
                    <TableCell>{d.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            All Progress Records
          </Typography>
          {progress.length === 0 ? (
            <Typography align="center">No progress yet.</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell>LeetCode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {progress.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>
                        {p.completed ? (
                          <Chip
                            label="Completed"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip label="Pending" color="warning" size="small" />
                        )}
                      </TableCell>
                      <TableCell>{p.problemObj?.name || p.problem}</TableCell>
                      <TableCell>
                        {p.problemObj?.leetcodeLink ? (
                          <IconButton
                            component={MuiLink}
                            href={p.problemObj.leetcodeLink}
                            target="_blank"
                            rel="noopener"
                          >
                            <CodeIcon color="primary" />
                          </IconButton>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
