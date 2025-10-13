const express = require("express");
const router = express.Router();
const { getHome, getAbout, getContact } = require("../controllers/index");

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/contact", getContact);

module.exports = router;
