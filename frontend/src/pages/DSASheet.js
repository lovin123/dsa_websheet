import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ChapterAccordion from "../components/ChapterAccordion";
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
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #e3f2fd 0%, #f8bbd0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pb: 8,
        pt: 0,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          mt: 10,
          mb: 6,
          px: { xs: 1, sm: 2 },
          py: 2,
          background: "rgba(255,255,255,0.85)",
          borderRadius: 6,
          boxShadow: "0 4px 32px 0 rgba(60,120,180,0.10)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight={700}
          color="primary.main"
          gutterBottom
          sx={{
            textShadow: "0 2px 8px rgba(60,120,180,0.10)",
            mb: 2,
            letterSpacing: 2,
            fontFamily: "Montserrat, Roboto, Arial",
            animation: "fadeInDown 1s",
          }}
        >
          DSA Sheet
        </Typography>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mt: 2,
            borderRadius: 4,
            background: "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
            boxShadow: "0 8px 32px 0 rgba(60, 120, 180, 0.15)",
            animation: "fadeInUp 1s",
          }}
        >
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
              <ChapterAccordion
                key={chapter._id}
                chapter={chapter}
                progress={progress}
                handleProgress={handleProgress}
              />
            ))
          )}
        </Paper>
      </Container>
      {/* Keyframes for fadeIn animations */}
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}
