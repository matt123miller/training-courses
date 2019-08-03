const express = require('express');
const logic = require('./lib');
const router = express.Router();

// example of a testable pattern for an API

router.get('', (req, res) => {

    // Unwrap data
    const { firstName, lastName } = req.query;

    // Send it to your testable functions elsewhere
    // Make sure to return the results
    const result = logic.appendNames(firstName, lastName);

    // Send the data back
    res.send({ result });
})





module.exports = router;