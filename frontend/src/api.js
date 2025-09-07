export async function fetchProgressStats(token) {
  const res = await fetch(`${API_BASE}/dsa/progress/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch progress stats");
  return data;
}
// Centralized API service for frontend-backend communication
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function fetchUser(token) {
  const res = await fetch(`${API_BASE}/users/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch user info");
  return data;
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function fetchDSASheet(token) {
  const res = await fetch(`${API_BASE}/dsa/sheet`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch DSA sheet");
  return data;
}

export async function updateProgress(problemId, completed, token) {
  const res = await fetch(`${API_BASE}/dsa/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ problemId, completed }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update progress");
  return data;
}

export async function fetchProgress(token) {
  const res = await fetch(`${API_BASE}/dsa/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch progress");
  return data;
}
