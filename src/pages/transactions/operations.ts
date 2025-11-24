import { apiFetch } from "../../api/fetchWrapper.js";

export async function openPopup(): Promise<void> {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "flex";

  const select = document.getElementById("create-operation-category");
  if (!select) return;

  select.innerHTML = '<option value="" disabled selected>Сфера услуг</option>';

  try {
    const { ok, data, error } = await apiFetch("/categories", {
      method: "GET",
    });

    if (!ok) {
      console.error("Ошибка при загрузке категорий:", error);
      return;
    }

    const categories = data.categories || [];

    for (const ctg of categories) {
      const option = document.createElement("option");
      option.value = String(ctg.id);
      option.textContent = ctg.name;
      select.appendChild(option);
    }
  } catch (err) {
    console.error("Ошибка при открытии popup:", err);
  }

  const selectAccount = document.getElementById("create-operation-account-num");
  if (!selectAccount) return;

  selectAccount.innerHTML = '<option value="" disabled selected>Счет</option>';

  try {
    const { ok, data, error } = await apiFetch("/accounts", {
      method: "GET",
    });

    if (!ok) {
      console.error("Ошибка при загрузке счетов:", error);
      return;
    }

    const accounts = data.accounts || [];

    for (const acc of accounts) {
      const option = document.createElement("option");
      option.value = String(acc.id);
      option.textContent = `Счет №${acc.id}`;
      selectAccount.appendChild(option);
    }
  } catch (err) {
    console.error("Ошибка при открытии popup:", err);
  }
}

export function closePopup(): void {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

export function formatDateForInput(date: number | string): string {
  const d = typeof date === "number" ? new Date(date) : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // месяцы с 0
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}.${month}.${year}`;
}

function handleEditOperationTypeChange(): void {
  const typeSelect = document.getElementById(
    "editOperationType",
  ) as HTMLSelectElement | null;
  const categorySelect = document.getElementById(
    "editCategory",
  ) as HTMLSelectElement | null;

  if (typeSelect && categorySelect) {
    // пример логики: показать категории в зависимости от типа операции
    if (typeSelect.value === "income") {
      categorySelect.classList.remove("expense");
      categorySelect.classList.add("income");
    } else if (typeSelect.value === "expense") {
      categorySelect.classList.remove("income");
      categorySelect.classList.add("expense");
    }
  }
}

export function openEditPopup(data: {
  amount?: string;
  type?: "income" | "expense";
  date?: string | number;
  category?: string;
  organization?: string;
  comment?: string;
  account?: string;
  transaction_id?: string;
  account_id?: string;
}): void {
  const amountInput = document.getElementById(
    "editAmount",
  ) as HTMLInputElement | null;
  const typeSelect = document.getElementById(
    "editOperationType",
  ) as HTMLSelectElement | null;
  const dateInput = document.getElementById(
    "editDate",
  ) as HTMLInputElement | null;
  const categorySelect = document.getElementById(
    "editCategory",
  ) as HTMLSelectElement | null;
  const organizationInput = document.getElementById(
    "editOrganization",
  ) as HTMLInputElement | null;
  const commentInput = document.getElementById(
    "editComment",
  ) as HTMLInputElement | null;
  const accountSelect = document.getElementById(
    "editAccount",
  ) as HTMLSelectElement | null;

  if (amountInput) amountInput.value = data.amount || "";
  if (typeSelect) typeSelect.value = data.type || "";

  if (dateInput && data.date) {
    dateInput.value = formatDateForInput(data.date);
  } else if (dateInput) {
    dateInput.value = "";
  }

  if (categorySelect) categorySelect.value = data.category || "";
  if (organizationInput) organizationInput.value = data.organization || "";
  if (commentInput) commentInput.value = data.comment || "";
  if (accountSelect) accountSelect.value = data.account || "";

  handleEditOperationTypeChange();

  const popup = document.getElementById("editPopup");
  if (popup) popup.style.display = "flex";

  const form = document.getElementById("editForm") as HTMLFormElement | null;
  if (form && data.transaction_id) {
    form.dataset.transactionId = data.transaction_id.toString();
    form.dataset.accountId = data.account_id.toString();
  }
}

export function closeEditPopup(): void {
  const popup = document.getElementById("editPopup");
  if (popup) popup.style.display = "none";
}
