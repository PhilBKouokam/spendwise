import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
    try {
        const { amount, description, category, type, date } = req.body || {};
        
        if (!amount || !description || !category || !type) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const transaction = new Transaction({
            user: req.user.userId,
            amount: Number(amount),
            description,
            category,
            type,
            date: date || Date.now(),
        });

        const savedTransaction = await transaction.save();

        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error("Create Transaction error: ", error);
        res.status(500).json({
            message: "Failed to create transaction",
            error: error.message
        });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.userId })
            .sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error("Get Transaction Error: ", err);
        res.status(500).json({
            message: "Failed to get transactions",
            error: err.message
        });
    }
};

export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json(transaction);
    } catch (err) {
        console.error("Find Transaction By Id Error: ", err);
        res.status(500).json({ 
            message: "Failed to get transaction",
            error: err.message
        });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findOneAndUpdate(
            {
            _id: req.params.id,
            user: req.user.userId
            },
            req.body,
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found!" });
        }

        res.json(updatedTransaction);
    } catch (err) {
        console.error("Update Transaction Error: ", err);
        res.status(500).json({
            message: "Failed to update transaction",
            error: err.message
        });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Transaction succesfully deleted" });
    } catch (err) {
        console.error("Delete Transaction Error: ", err);
        res.status(500).json({
            message: "Failed to Delete Transaction",
            error: err.message
        });
    }
};

