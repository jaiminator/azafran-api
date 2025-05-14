const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    //Login de un usuario
    res.send("Login");
});

router.post("/register", (req, res) => {
    //Registro de un usuario
    res.send("Register");
});


module.exports = router;