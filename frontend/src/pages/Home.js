import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to DSA Websheet
      </Typography>
      <Typography variant="body1" align="center">
        Practice Data Structures & Algorithms with a curated sheet. Track your
        progress and master coding interviews!
      </Typography>
    </Container>
  );
}
