import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4600/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Logon failed!");
            }

            login(data.token);
            navigate("/");
        } catch (err) {
            setError(err.message || "Server error during login. Please try again.");
            setTimeout(() => { setError("") }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="text-center mb-3">Login</h3>

                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}

                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            value={email}
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email"
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            value={password}
                                            className="form-control"
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? "Logging in..." : "Login"}
                                    </button>
                                </form>

                                <p className="text-center mt-3">
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}