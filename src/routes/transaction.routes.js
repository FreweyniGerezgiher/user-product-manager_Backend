const express = require("express");

const router = express.Router();


const transactionController =
    require("../controllers/transaction.controller");



// GET /api/transactions?page=1
router.get(
    "/",
    transactionController.getTransactions
);



module.exports = router;