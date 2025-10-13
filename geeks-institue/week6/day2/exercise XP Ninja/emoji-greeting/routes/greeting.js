const express = require("express");
const router = express.Router();

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// Show form
router.get("/", (req, res) => {
  let form = `
  <form action="/greet" method="POST" style="font-family:sans-serif; margin:50px;">
    <h2>Emoji Greeting App</h2>
    <label>Enter your name:</label><br>
    <input type="text" name="name" required style="padding:5px; margin:10px 0;"><br>
    <label>Choose an emoji:</label><br>
    <select name="emoji" style="padding:5px; margin:10px 0;">
      ${emojis.map((e) => `<option value="${e}">${e}</option>`).join("")}
    </select><br>
    <button type="submit" style="padding:8px 12px;">Greet Me</button>
  </form>
  `;
  res.send(form);
});

// Handle greeting
router.post("/greet", (req, res) => {
  const { name, emoji } = req.body;

  if (!name) {
    return res.send("<h3>Name is required. Go back and try again.</h3>");
  }

  res.send(`
    <div style="font-family:sans-serif; margin:50px;">
      <h2>Hello ${name}! ${emoji}</h2>
      <a href="/">Back</a>
    </div>
  `);
});

module.exports = router;
