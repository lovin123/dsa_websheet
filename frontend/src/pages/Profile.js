import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { fetchUser } from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchUser(token);
        setUser(data);
      } catch (err) {
        setError(err?.response?.data?.error || "Failed to load user info");
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {loading && <CircularProgress />}
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
        {!loading && !error && (
          <>
            <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}
