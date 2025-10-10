const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const PORT = 5000;
const SECRET_KEY = "your_secret_key";

// In-memory user storage
const users = [];

// Password complexity rule
function isPasswordStrong(password) {
  // at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

// Middleware to verify JWT and role
function authMiddleware(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      if (role && decoded.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

// User Registration
app.post("/api/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 chars long and include uppercase, lowercase, number, and special character",
    });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    password: hashedPassword,
    role: role || "user",
    failedAttempts: 0,
    lockedUntil: null,
  };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// User Login with lockout mechanism
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Check if account locked
  const now = Date.now();
  if (user.lockedUntil && now < user.lockedUntil) {
    const remaining = Math.ceil((user.lockedUntil - now) / 1000);
    return res
      .status(403)
      .json({ message: `Account locked. Try again in ${remaining} seconds.` });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    user.failedAttempts += 1;
    if (user.failedAttempts >= 5) {
      user.lockedUntil = Date.now() + 60 * 1000; // lock for 1 minute
      user.failedAttempts = 0;
      return res
        .status(403)
        .json({
          message:
            "Account locked for 1 minute due to multiple failed attempts",
        });
    }
    return res.status(400).json({ message: "Invalid credentials" });
  }

  user.failedAttempts = 0;
  user.lockedUntil = null;

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// Public route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Protected profile route
app.get("/api/profile", authMiddleware(), (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

// Admin-only route
app.get("/api/admin", authMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin dashboard", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
