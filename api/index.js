function getToken() {
    return localStorage.getItem("jwt");
}

async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    if (!token) throw new Error("JWT токен не найден. Авторизуйтесь.");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) throw new Error(`Ошибка при запросе ${url}: ${response.status}`);
    return await response.json();
}

export function getBalance() {
    return fetchWithAuth("/api/v1/balance");
}

export function getBalanceById(id) {
    return fetchWithAuth(`/api/v1/balance/${id}`);
}

export function getBudgets() {
    return fetchWithAuth("/api/v1/budgets");
}

export function getBudgetById(id) {
    return fetchWithAuth(`/api/v1/budgets/${id}`);
}
