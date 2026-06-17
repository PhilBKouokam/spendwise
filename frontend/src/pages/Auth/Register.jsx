import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { apiFetch } from "../../utils/api.js";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await apiFetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create account");
            }

            login(data.token);
            navigate("/");
        } catch (err) {
            setError("Network error. Please try again");
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
                                <h3 className="text-center mb-3">Create an Account</h3>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={username}
                                            placeholder="Enter username"
                                            className="form-control"
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            value={email}
                                            placeholder="Enter email"
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            value={password}
                                            placeholder="Enter password (min. 6 characters)"
                                            className="form-control"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary w-100"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Creating Account..." : "Register"}
                                    </button>
                                </form>

                                <p className="text-center mt-3">
                                    Already have an account? <Link to="/login">Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};