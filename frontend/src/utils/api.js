const API_BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:4600"
    : "https://productionurl.com";

export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const config = {
        ...options,
        headers : {
            ...(!url.includes("upload") && { "Content-Type": "application/json" }),
            ...(token && { "Authorization": `Bearer ${token}` }),
            ...options.headers
        }
    };

    const fullUrl = url.startsWith("http")
        ? url
        : `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;

    try {
        const response = await fetch(fullUrl, config);

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return null;
            } else {
                const error = await response.json();
                console.error("API 400 Fetch Error: ", error);
            }
        }

        return response;
    } catch (error) {
        console.error("API Fetch Error: ", error);
        throw error;
    }
};