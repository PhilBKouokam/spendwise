import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { TransContext } from "../context/TransContext.jsx";

import BalanceCards from "../components/Dashboard/BalanceCards.jsx";
import SpendingChart from "../components/Charts/SpendingChart.jsx";
import BalanceTrendChart from "../components/Charts/BalanceTrendChart.jsx";
import RecentTransactions from "../components/Dashboard/RecentTransactions.jsx";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const { transactions, loading, error, refreshing, fetchTransactions } = useContext(TransContext);
    
    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-primary mt-3"> Loading dashboard...</p>
        </div>
    );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Welcome back, {user?.username || "User"} 👋</h2>

                <button
                    className={`btn btn-sm ${error ? "btn-outline-danger" : "btn-outline-primary"}`}
                    onClick={() => fetchTransactions(true)}
                    disabled={refreshing}
                >
                    { refreshing
                        ? "Refreshing..."
                        : error 
                            ? "Try again" 
                            : "↻ Refresh" 
                    }
                </button>
            </div>

            {error && <div className="alert alert-danger mb-4">{error}</div>}

            {/* Balance Cards */}
            <BalanceCards transactions={transactions}/>

            {/* Charts */}
            <div className="row mb-4">
                <div className="col-lg-6">
                    <SpendingChart transactions={transactions} />
                </div>
                <div className="col-lg-6">
                    <BalanceTrendChart transactions={transactions} />
                </div>
            </div>

            {/* Recent Transactions */}
            <RecentTransactions transactions={transactions} />
        </div>
    );
}