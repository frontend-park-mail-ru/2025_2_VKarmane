const API_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

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
      const ops = await getOperations(id, {
        method: "GET",
      });

      return ops.operations.map((operation) => ({
        OrganizationTitle: operation.name || "Мок",
        CategoryName: `Категория ${operation.category_id}`,
        OperationPrice: operation.sum,
        OperationTime: new Date(operation.date).toLocaleDateString("ru-RU"),
      }));
    }),
  );

  const operations = allOps.flat();

  return operations;
}
