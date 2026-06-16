import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Salary', 'Freelance', 'Investment', 'Other' 
        ]
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    receiptUrl: {    // For future AWS S3 integration
        type: String
    }
}, { timestamps: true });

// Index for faster queries
transactionSchema.index({ user: 1, date: -1});
transactionSchema.index({ user: 1, category: 1 }); 

export default mongoose.model('Transaction', transactionSchema);