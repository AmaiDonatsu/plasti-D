const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { getDb } = require("../../db/conn");
const jwt = require('jsonwebtoken');
var authenticateToken = require('../handlings/middlewareJWT');

router.post("/", authenticateToken, async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user.id;
        const nameOrg = body.name;

        if(!nameOrg) {
            return res.status(400).send("There is no name for the organization");
        }

        const db = getDb();
        const collection = await db.collection("organizations");

        const newOrganization = {
            "user": userId,
            "name": nameOrg,
        };

        const result = await collection.insertOne(newOrganization);

        return res.status(201).send(`{"New organization added": ${JSON.stringify({result})}}`);

    } catch (error) {
        return res.status(500).send(`Internal server error: ${JSON.stringify(error)}`);
    };
});


module.exports = router;
