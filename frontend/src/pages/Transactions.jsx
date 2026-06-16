import { useState, useContext, useMemo } from "react";
import { TransContext } from "../context/TransContext.jsx";
import TransactionForm from "../components/Transactions/TransactionForm.jsx";
import TransactionList from "../components/Transactions/TransactionList.jsx";
import { CATEGORIES } from "../constants/categories.js";

export default function Transactions() {
    const { transactions } = useContext(TransContext);

    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(t => {
                const matchesType = filterType === "all" || t.type === filterType;
                const matchesCategory = filterCategory === "all" || t.category === filterCategory;
                const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());

                return matchesType && matchesCategory && matchesSearch;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date)); //Newest first)
    }, [transactions, filterType, filterCategory, searchTerm]);

    return (
        <div>
            <h2 className="text-center mb-5">All Transactions</h2>

            <div className="row d-flex align-items-center mb-4">
                <div className="col-md-3 d-flex align-items-center gap-2">
                    <label for="selt">Type: </label>
                    <select 
                        className="form-select"
                        value={filterType}
                        id="selt"
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income Only</option>
                        <option value="expense">Expense Only</option>
                    </select>
                </div>

                <div className="col-md-4 d-flex align-items-center gap-2">
                    <label for="selc">Category: </label>
                    <select
                        className="form-select"
                        value={filterCategory}
                        id="selc"
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="d-flex align-items-center gap-2 col-md-5">
                    <label for="sdesc">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by description..."
                        value={searchTerm}
                        id="sdesc"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-5">
                <TransactionList transactions={filteredTransactions} />
            </div>

            {showForm && <TransactionForm setShowForm={setShowForm}/>}

            <div className="text-center mt-4 mb-4">
                <button
                    className={`btn ${showForm ? "btn-danger" : "btn-primary"}`}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancel" : "+ New Transaction"}
                </button>
            </div>

        </div>
    );
}