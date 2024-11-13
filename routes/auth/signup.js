const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { getDb } = require("../../db/conn");

router.post('/', [
    check('userName').notEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
    
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const db = getDb();

    const collection = await db.collection("users");
    const { userName, email, password } = req.body;

    const userWithThatuserName = await collection.findOne({ "name": userName });
    if (userWithThatuserName) {
        return res.status(409).send("user name already used");
    }

    const userWithThatEmail = await collection.findOne({ "email": email });
    if (userWithThatEmail) {
        return res.status(409).send("email already used");
    }

    const passwordEncrypted = await bcrypt.hash(password, 10);

    const newUser = {
        name: userName,
        email: email,
        password: passwordEncrypted,
        date: new Date(),
    };

    const result = await collection.insertOne(newUser);
    return res.status(201).send(result);
});

module.exports = router;
