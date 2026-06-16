export default function BalanceCards({ transactions }) {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = 0 || (totalIncome - totalExpense);

    return (
        <div className="row mb-4">
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center">
                        <h5 className="text-muted">Total Balance</h5>
                        <h2 className={`fw-bold ${balance >= 0 ? "text-success" : "text-danger"}`}>
                            ${balance.toFixed(2)}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center">
                        <h5 className="text-muted">Total Income</h5>
                        <h3 className="fw-bold text-success">
                            +${totalIncome.toFixed(2)}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center">
                        <h5 className="text-muted">Total Expenses</h5>
                        <h3 className="fw-bold text-danger">
                            -${totalExpense.toFixed(2)}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}