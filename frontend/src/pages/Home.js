import { Container, Typography, Box, Button, Paper } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 4,
          background: "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <img
            src="/logo192.png"
            alt="DSA Websheet Logo"
            style={{ width: 100, marginBottom: 16 }}
          />
          <Typography
            variant="h2"
            align="center"
            fontWeight={700}
            color="primary.main"
            gutterBottom
          >
            Welcome to DSA Websheet
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Practice Data Structures & Algorithms with a curated sheet.
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Track your progress, master coding interviews, and boost your
            problem-solving skills with real DSA questions and instant feedback.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/sheet"
            sx={{ mt: 2, px: 5, fontWeight: 600, fontSize: 18 }}
          >
            Start Solving Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
