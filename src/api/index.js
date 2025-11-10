import { apiFetch } from "./fetchWrapper.js";
const API_URL = import.meta.env.VITE_API_URL;
import { csrfToken } from "./fetchWrapper.js";

async function fetchWithAuth(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (csrfToken) headers["X-CSRF-Token"] = csrfToken;

  const response = await fetch(API_URL + url, {
    ...options,
    headers,
    credentials: "include",
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

export function getOperations(accountID) {
  return fetchWithAuth(`/account/${accountID}/operations`);
}

export async function getAllUserTransactionsByAccIDs(accountIDs) {
  const allOps = await Promise.all(
    accountIDs.map(async (id) => {
      const ops = await getOperations(id);

      const operationsWithCategories = ops.operations.map((operation) => {
        let categoryName = "Доход";
        let categoryLogo = "";

        if (operation.category_id) {
          categoryName = operation.category_name || categoryName;
        }

        if (operation.category_logo) {
          const match = operation.category_logo.match(/\/images\/[^?]+/);
          if (match) {
            categoryLogo = "https://vkarmane.duckdns.org/test/" + match[0];
          }
        }

        return {
          OrganizationTitle: operation.name || "Мок",
          CategoryName: categoryName,
          OperationPrice: operation.sum,
          OperationTime: new Date(operation.date).toLocaleDateString("ru-RU"),
          CategoryLogo: categoryLogo,
        };
      });

      return operationsWithCategories;
    }),
  );

  return allOps.flat();
}
