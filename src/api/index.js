import { API_URL } from "./consts.js";

async function fetchWithAuth(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
  if (!response.ok)
    throw new Error(`Ошибка при запросе ${url}: ${response.status}`);
  return await response.json();
}

export function getBalance() {
  return fetchWithAuth(`${API_URL}/balance`);
}

export function getBalanceById(id) {
  return fetchWithAuth(`${API_URL}/balance/${id}`);
}

export function getBudgets() {
  return fetchWithAuth(`${API_URL}/budgets`);
}

export function getBudgetById(id) {
  return fetchWithAuth(`${API_URL}/budgets/${id}`);
}
