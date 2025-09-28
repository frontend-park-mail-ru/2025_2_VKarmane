
async function fetchWithAuth(url, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers, credentials: "include" });
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
