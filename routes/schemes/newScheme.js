const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { getDb } = require("../../db/conn");
const jwt = require('jsonwebtoken');
var authenticateToken = require('../handlings/middlewareJWT');

router.post("/", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    if(!userId) {
        return res.status(401).send("Authentication error");
    };

    const body = req.body;
    const scheme = body.scheme;
    if (!scheme){ 
        return res.status(401).send("There is no structure for schema sent");
    }

    const db = getDb();
    
    

});
