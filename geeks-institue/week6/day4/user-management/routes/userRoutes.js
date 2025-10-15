const express = require("express");
const router = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../users.json");
const SALT_ROUNDS = 10;

// Helper function to read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
};

// Helper function to write users to file
const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing to file:", error);
    return false;
  }
};

// POST /register - Register a new user
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Read existing users
    const users = readUsers();

    // Check if username already exists
    const usernameExists = users.some((user) => user.username === username);
    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Check if email already exists
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user object
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Add user to array
    users.push(newUser);

    // Write to file
    const success = writeUsers(users);

    if (success) {
      // Don't send password back in response
      const { password, ...userWithoutPassword } = newUser;

      return res.status(201).json({
        success: true,
        message: "Hello! Your account is now created!",
        user: userWithoutPassword,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error saving user data",
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

// POST /login - User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Read users from file
    const users = readUsers();

    // Find user by username
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username is not registered",
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Don't send password back in response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: `Hi ${user.firstName}, welcome back again!`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// GET /users - Get all users
router.get("/users", (req, res) => {
  try {
    const users = readUsers();

    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return res.status(200).json({
      success: true,
      count: users.length,
      users: usersWithoutPasswords,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
    });
  }
});

// GET /users/:id - Get user by ID
router.get("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const users = readUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving user",
    });
  }
});

// PUT /users/:id - Update user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const { firstName, lastName, email, username, password } = req.body;

    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if new username is taken by another user
    if (username && username !== users[userIndex].username) {
      const usernameExists = users.some(
        (u) => u.username === username && u.id !== userId,
      );
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    // Check if new email is taken by another user
    if (email && email !== users[userIndex].email) {
      const emailExists = users.some(
        (u) => u.email === email && u.id !== userId,
      );
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // Update user fields
    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;
    if (email) users[userIndex].email = email;
    if (username) users[userIndex].username = username;

    // Hash new password if provided
    if (password) {
      users[userIndex].password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    users[userIndex].updatedAt = new Date().toISOString();

    // Write updated users to file
    const success = writeUsers(users);

    if (success) {
      const { password: _, ...userWithoutPassword } = users[userIndex];

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: userWithoutPassword,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error updating user",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during update",
    });
  }
});

module.exports = router;
