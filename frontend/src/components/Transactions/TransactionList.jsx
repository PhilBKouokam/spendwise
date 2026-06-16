import TransactionItem from "./TransactionItem";
import { useContext } from "react";
import { TransContext } from "../../context/TransContext";

export default function TransactionList({ transactions }) {
    const { loading, error, fetchTransactions } = useContext(TransContext);

    if (loading) {
        return <div className="text-center py-5">Loading transactions...</div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center">
                {error}
                <button
                    className="btn btn-sm btn-outline-danger ms-3"
                    onClick={fetchTransactions}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (transactions.length === 0) {
        return <div className="text-muted text-center py-5">No transactions found matching your filters.</div>;
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="mb-3 text-center">
                    Transaction History
                    <span className="text-muted fs-6 fw-normal ms-2">
                        ({transactions.length} transactions)
                    </span>
                </h5>
                <ul className="list-group list-group-flush">
                    {transactions.map(t => (
                        <TransactionItem
                            key={t._id}
                            transaction={t}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}