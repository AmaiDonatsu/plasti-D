const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { getDb } = require("../../db/conn");
const jwt = require('jsonwebtoken');
var authenticateToken = require('../handlings/middlewareJWT');

router.get("/", authenticateToken, async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection("organizations");
        
        const userId = req.user.id;
        const organizations = await collection.find({ user: userId }).toArray();

        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ status: 404, message: "The user has no organizations" });
        }

        return res.status(200).json({ status: 200, organizations });
        
    } catch (error) {
        console.error("Internal server error:", error); // Log error details for debugging
        return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
    }
});

module.exports = router;
