import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function BalanceTrendChart({ transactions }) {

    const cumulativeData = transactions
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((t, index, arr) => {
            const runningBalance = arr.slice(0, index + 1).reduce((sum, trans) => {
                return sum + (trans.type === 'income' ? trans.amount : -trans.amount);
            }, 0);

            return {
                displayDate: new Date(t.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }),
                fullDate: new Date(t.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                }),
                balance: Number(runningBalance.toFixed(2)),
                amount: t.amount,
                type: t.type
            };
        });

    return (
        <div className="card shadow-sm">
            <div className="card-body text-center">
                <h5 className="mb-3">Balance Trend</h5>
                {cumulativeData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cumulativeData}>
                            <XAxis 
                                dataKey="displayDate"
                                tick={{ fontSize: 12 }} 
                            />
                            <YAxis />
                            <Tooltip
                                labelFormatter={(label) => `Date: ${label}`}
                                formatter={(value) => [`$${value.toFixed(2)}`, "Balance"]}
                                contentStyle={{
                                    backgroundColor: "#1e2937",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#e2e8f0"
                                }} 
                            />
                            <Line 
                                dataKey="balance" 
                                type="monotone" 
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981', r: 4 }} 
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-muted py-5">No transactions yet</p>
                )}
            </div>
        </div>
    );
}