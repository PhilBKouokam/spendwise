import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            if (!token) {
                setLoading(false);
                setUser(null);
                return;
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    token: token,
                    username: payload.username || "User",
                    id: payload.userId
                });
            } catch (err) {
                console.error("Error decoding token: ", err);
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [token]);

    const login = (newToken) => {
        if (!newToken) return;
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setLoading(true);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            { children }
        </AuthContext.Provider>
    );
};