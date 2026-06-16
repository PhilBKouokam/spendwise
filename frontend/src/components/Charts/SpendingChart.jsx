import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function SpendingChart({ transactions }) {
    const categoryData = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

    return (
        <div className="card shadow-sm">
            <div className="card-body text-center">
                <h5 className="mb-3">Spending By Category</h5>
                {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                dataKey="value"
                                label={({ name, percent }) => `${name} (${percent.toFixed(2)*100}%)`}
                                labelLine={false}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                formatter={(value, name) => [`$${value.toFixed(2)}`, "Amount"]}
                                contentStyle={{
                                    backgroundColor: "#1e2937",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#e2e8f0",
                                    padding: "10px"
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-muted text-center py-5">No expense data yet.</p>
                )}
            </div>
        </div>
    );
}