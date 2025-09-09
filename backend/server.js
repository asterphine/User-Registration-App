const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "users.json";

// Load existing users or start with empty array
let users = [];
if (fs.existsSync(DATA_FILE)) {
  users = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// Endpoint to register user
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  // Add new user with an id
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);

  // Save to file
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered", user: newUser });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
