import express from "express";
import multer from "multer";
import {
    createTransaction,
    getTransactions,
    getTransactionById,
    deleteTransaction,
    updateTransaction
} from "../controllers/transactionController.js";

import { protect } from "../middleware/auth.js"

const router = express.Router();

router.use(protect);

router.route("/")
    .get(getTransactions)
    .post(createTransaction);

router.route("/:id")
    .get(getTransactionById)
    .patch(updateTransaction)
    .delete(deleteTransaction);

export default router;