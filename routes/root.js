const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'index.html') );
})


// redirecting ba page 
//not very clear yet



module.exports = router;