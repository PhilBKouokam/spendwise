import { useState, useContext } from "react";
import { CATEGORIES } from "../../constants/categories.js";
import { TransContext } from "../../context/TransContext.jsx";

export default function TransactionForm ({ setShowForm }) { 
    const { addTransaction } = useContext(TransContext);

    const [type, setType] = useState("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [description, setDescription] = useState("");
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddTrans = async (e) => {
        e.preventDefault();

        if (!amount || !description) {
            alert("Amount and description are required"); 
            return; 
        }

        setLoading(true);

        const transactionData = {
            type,
            amount: Number(amount),
            category,
            description
        };

        const result = await addTransaction(transactionData, receipt);

        if (result.success) {
            setAmount("");
            setDescription("");
            setCategory("Food");
            setType("expense");
            setReceipt(null);
            setShowForm(false);
        } else {
            alert(result.error || "Failed to add transaction");
        }

        setLoading(false);
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
                <h5 className="mb-3">Add New Transaction</h5>
                <form onSubmit={handleAddTrans}>
                    <div className="row mb-3">
                        <div className="col-md-3 d-flex align-items-center gap-2">
                            <label className="form-label" for="sft">Type: </label>
                            <select className="form-select" value={type} id="sft" onChange={(e) => setType(e.target.value) }>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-2">
                            <label className="form-label" for="sfc">Category: </label>
                            <select 
                                className="form-select" 
                                value={category}
                                id="sfc" 
                                onChange={(e) => setCategory(e.target.value)} 
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input 
                                    type="number"
                                    className="form-control"
                                    value={amount} 
                                    placeholder="Enter amount" 
                                    onChange={(e) => setAmount(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                    </div>
  
                    <div className="mb-3">
                        <input 
                            type="text" 
                            value={description} 
                            className="form-control" 
                            placeholder="Enter description" 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" for="recpt">Receipt (Optional)</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            id="recpt"
                            onChange={(e) => setReceipt(e.target.files[0])}
                        />
                    </div>

                    <button 
                        className="btn btn-primary w-100" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Adding…" : "Add Transaction"}
                    </button> 
                </form>
            </div>
        </div>
    );
}