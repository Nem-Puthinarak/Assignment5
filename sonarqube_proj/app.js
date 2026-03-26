const express = require("express");
const app = express();

app.use(express.json());
app.disable("x-powered-by");

let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 25 },
  { id: 2, name: "Jane Doe", email: "jane@example.com", age: 22 },
];

let nextId = 3;

// GET all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET user by id
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

// POST create user
app.post("/api/users", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const user = { id: nextId++, name, email, age };
  users.push(user);
  res.status(201).json(user);
});

// PUT update user
app.put("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users[index] = { ...users[index], ...req.body };
  res.status(200).json(users[index]);
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users.splice(index, 1);
  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = app;