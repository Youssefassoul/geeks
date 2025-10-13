// controllers/homeController.js

const getHome = (req, res) => {
  res.send("Home Page");
};

const getAbout = (req, res) => {
  res.send("About Page");
};

const getContact = (req, res) => {
  res.send("Contact Page");
};

module.exports = { getHome, getAbout, getContact };
