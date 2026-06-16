export default function RecentTransactions ({ transactions }) {
    return (
        <div className="card shadow-sm">
            <div className="card-body text-center">
                <h5 className="mb-3">Recent Transactions</h5>
                {transactions.length === 0 ? (
                    <p className="text-muted">No transactions yet. Add your first one!</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {transactions.slice(0, 5).map(transaction => (
                            <li key={transaction._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{transaction.dscription}</strong>
                                    <small className="text-muted d-block">{transaction.category}</small>
                                </div>
                                <span className={transaction.type === "income" ? "text-success" : "text-danger"}>
                                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}