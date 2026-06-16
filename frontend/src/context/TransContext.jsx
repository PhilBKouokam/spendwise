import { useState, useEffect, createContext, useCallback, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../utils/api";

export const TransContext = createContext();

export const TransProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTransactions = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        setError("");
        try {
            const res = await apiFetch("/api/trans");
            if (res.ok) {
                const data = await res.json();
                setTransactions(data);
            } else {
                setError("Failed to fetch transactions");
            }
        } catch (err) {
            console.error(err);
            setError("Error Fetching transactions. Please check your connection");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        if (user && token) {
            fetchTransactions();
        } else {
            setTransactions([]);
            setLoading(false);
        }
    }, [user, token]);

    const addTransaction = async (transactionData, receiptFile = null) => {
        try {
            const res = await apiFetch("/api/trans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transactionData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, error: errorData.message || "Failed to add transaction" };
            }

            const newTransaction = await res.json();

            if (receiptFile) {
                const uploadFormData = new FormData();
                uploadFormData.append("receipt", receiptFile);

                console.log("Uploading receipt for transaction:", newTransaction._id);

                const uploadRes = await apiFetch(`/api/upload/receipt/${newTransaction._id}`, {
                    method: "POST",
                    body: uploadFormData,
                    headers: {}
                });

                console.log("Upload response:", uploadRes.status);
            }

            await fetchTransactions(true);
            return { success: true };
        } catch (err) {
            console.error("Add transaction error:", err);
            return { success: false, error: "Error adding transaction" };
        }
    };

    const updateTransaction = async (id, transactionData, receiptFile = null) => {
        try {
            const res = await apiFetch(`/api/trans/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transactionData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, error: errorData.message || "Failed to update Transaction"};
            }

            if (receiptFile) {
                const uploadFormData = new FormData();
                uploadFormData.append("receipt", receiptFile);

                await apiFetch(`/api/upload/receipt/${id}`, {
                    method: "POST",
                    body: uploadFormData,
                    headers: {}
                });
            };

            await fetchTransactions(true);
            return { success: true };
        } catch (err) {
            console.error("Update transaction error:", err);
            return { success: false, error: "Error updating Transaction"};
        }
    };

    const deleteTransaction = async (id) => {
        if (!id) return { success: false, error: "Invalid ID" };

        try {
            const res = await apiFetch(`/api/trans/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                await fetchTransactions(true);
                return { success: true };
            } else {
                return { success: false, error: "Failed to delete Transaction"};
            }
        } catch (err) {
            return { success: false, error: "Error deleting Transaction"};
        }
    };

    return (
        <TransContext.Provider value={{ 
            transactions, 
            error, 
            loading,
            refreshing, 
            fetchTransactions,
            addTransaction,
            updateTransaction,
            deleteTransaction 
        }}>
            {children}
        </TransContext.Provider>
    );
};