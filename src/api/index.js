const API_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(API_URL + url, {
    ...options,
    headers,
    // credentials: "include",
  });
  if (!response.ok)
    throw new Error(`Ошибка при запросе ${url}: ${response.status}`);
  return await response.json();
}

export function getBalance() {
  return fetchWithAuth(`/balance`);
}

export function getBalanceById(id) {
  return fetchWithAuth(`/balance/${id}`);
}

export function getBudgets() {
  return fetchWithAuth(`/budgets`);
}

export function getBudgetById(id) {
  return fetchWithAuth(`/budgets/${id}`);
}
