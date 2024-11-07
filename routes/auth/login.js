const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { getDb } = require("../../db/conn");
const jwt = require('jsonwebtoken'); 

router.post('/', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const db = getDb();
    const collection = await db.collection("users");
    const { email, password } = req.body;

    const userWithThatEmail = await collection.findOne({ email });
    if (!userWithThatEmail) {
        return res.status(404).send("The user does not existW");
    };

    const isTheUser = await bcrypt.compare(password, userWithThatEmail.password);
    if (isTheUser) {}

})