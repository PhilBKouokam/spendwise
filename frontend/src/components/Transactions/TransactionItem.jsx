import { useState, useContext } from "react";
import { TransContext } from "../../context/TransContext.jsx";
import { CATEGORIES } from "../../constants/categories.js";

export default function TransactionItem({ transaction }) {
    const { deleteTransaction, updateTransaction } = useContext(TransContext);
    
    const [isEditing, setIsEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [type, setType] = useState(transaction.type);
    const [category, setCategory] = useState(transaction.category);
    const [amount, setAmount] = useState(transaction.amount);
    const [description, setDescription] = useState(transaction.description);
    const [receipt, setReceipt] = useState(null);

    const handleViewReceipt = () => {
        if (transaction.receiptUrl) {
            window.open(transaction.receiptUrl, '_blank');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;

        setDeleting(true);

        const result = await deleteTransaction(transaction._id);
        if (!result.success) alert(result.error || "Failed to delete transaction");

        setDeleting(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (
            Number(amount) === transaction.amount &&
            type === transaction.type && 
            category === transaction.category && 
            description === transaction.description &&
            !receipt
        ) {
            setIsEditing(false); 
            return;
        }

        setUpdating(true);

        const transactionData = {
            type,
            category,
            amount: Number(amount),
            description
        };

        const result = await updateTransaction(transaction._id, transactionData, receipt);

        if (result.success) {
            setIsEditing(false);
            setReceipt(null);
        } else {
            alert(result.error || "Failed to update transaction");
        }

        setUpdating(false);
    }

    if (isEditing) {
        return (
            <li className="list-group-item">
                <div className="card shadow-sm p-3">
                    <h5 className="mb-3 text-center">Edit Transaction</h5>
                    <form onSubmit={handleUpdate}>
                        <div className="row g-3">
                            <div className="col-md-4 d-flex align-items-center gap-2">
                                <label for="st" className="form-label">Type: </label>
                                <select
                                    className="form-select"
                                    value={type}
                                    id="st"
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                            <div className="col-md-4 d-flex align-items-center gap-2">
                                <label for="sc" className="form-label">Category: </label>
                                <select
                                    className="form-select"
                                    value={category}
                                    id="st"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-md-4 d-flex align-items-center gap-2">
                                <label for="am" className="form-label">Amount: </label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        id="am"
                                        className="form-control"
                                        placeholder="Enter new amount"
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col d-flex align-items-center gap-2">
                                <label for="sd" className="form-label">Description: </label>
                                <input
                                    type="text"
                                    value={description}
                                    className="form-control"
                                    id="sd"
                                    placeholder="Enter new description"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3 mt-3">
                                <label for="recpt" className="form-label">Receipt Image (Optional)</label>
                                {transaction.receiptUrl && (
                                    <div className="mb-2">
                                        <small>Current: </small>
                                        <a href={transaction.receiptUrl} target="_blank" rel="noopener noreferrer">
                                            View Current Receipt
                                        </a>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    id="recpt"
                                    onChange={(e) => setReceipt(e.target.files[0])}
                                />
                        </div>

                        <div className="d-flex mt-3 gap-2">
                            <button
                                className="btn btn-sm btn-secondary flex-grow-1"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-sm btn-success flex-grow-1"
                                disabled={updating}
                            >
                                {updating ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </li>
        );
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center py-3">
            <div>
                <strong>{transaction.description}</strong>
                <small className="text-muted d-block">{transaction.category}</small>
                <small className="text-muted">
                    {new Date(transaction.date).toLocaleDateString()}
                </small>
            </div>

            <div className="d-flex text-end align-items-center gap-3">
                <span className={`fw-bold ${transaction.type === "income" ? "text-success" : "text-danger"}`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </span>

                {transaction.receiptUrl && (
                    <button
                        className="btn btn-sm btn-info"
                        onClick={handleViewReceipt}
                    >
                        📄 Receipt
                    </button>
                )}

                <button 
                    className="btn btn-sm btn-warning"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>

                <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete transaction"}
                </button>
            </div>
        </li>
    );
}