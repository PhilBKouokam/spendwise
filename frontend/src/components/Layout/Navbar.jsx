import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { isDark, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">SpendWise</Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-light">
                                        Hi, {user.username || "User"}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/transactions">Transactions</Link>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={toggleTheme}
                                        className="btn btn-link nav-link px-2"
                                        title="Toggle Dark Mode"
                                    >
                                        {isDark ? "☀️" : "🌙"}
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="btn btn-link nav-link text-danger"
                                        type="button"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}