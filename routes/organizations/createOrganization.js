const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { getDb } = require("../../db/conn");
const jwt = require('jsonwebtoken');

router.post('/', [
    
],

)