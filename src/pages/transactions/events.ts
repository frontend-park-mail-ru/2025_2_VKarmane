import {
  validateOperationField,
  getOperationInputs,
  getEditOperationInputs,
  getCategoryInputs,
  getEditCategoryInputs,
} from "./validationForForms.js";
import { router } from "../../router.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { error } from "console";

const trackedListeners: {
  element: EventTarget;
  type: string;
  handler: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions | undefined;
}[] = [];

function addListener(
  element: EventTarget,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) {
  element.addEventListener(type, handler, options);
  trackedListeners.push({ element, type, handler, options });
}

function removeAllListeners() {
  for (const { element, type, handler, options } of trackedListeners) {
    element.removeEventListener(type, handler, options);
  }
  trackedListeners.length = 0;
}

export function addEventListeners(context: any): void {
  removeAllListeners();

  // Popup кнопки
  const openBtn = document.querySelector<HTMLButtonElement>("#openPopupBtn");
  const closeBtn = document.querySelector<HTMLButtonElement>("#closePopupBtn");
  const openCategoryBtn =
    document.querySelector<HTMLButtonElement>("#openCategoryBtn");
  const closeCategoryBtn =
    document.querySelector<HTMLButtonElement>("#closeCategoryBtn");

  openBtn?.addEventListener("click", () => context.openPopup());
  closeBtn?.addEventListener("click", () => context.closePopup());
  openCategoryBtn?.addEventListener("click", () => context.openCategoryPopup());
  closeCategoryBtn?.addEventListener("click", () =>
    context.closeCategoryPopup(),
  );

  // Изменение file input (#categoryIcon)
  addListener(document, "change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target?.type === "file" && target.id === "categoryIcon") {
      const popupForm = target.closest<HTMLElement>(".popup-form");
      const fileNameBox = popupForm?.querySelector<HTMLElement>("#fileName");
      if (!fileNameBox) return;
      fileNameBox.textContent = target.files?.[0]?.name || "Файл не выбран";
    }
  });

  // Редактирование операции
  addListener(document, "click", (e) => {
    let target = e.target as HTMLElement | null;
    if (!target) return;
    if (target.nodeType !== 1) target = target.parentElement;
    if (!target) return;

    // Редактирование операции
    const editBtn = target.closest(".edit-btn");
    if (editBtn) {
      const card = editBtn.closest(".transaction-card");
      if (!card) return;

      const idText =
        card.querySelector("#transaction_id")?.textContent?.trim() || "";
      const op_id = idText.replace("ID:", "").trim();
      const accIDText =
        card.querySelector("#transaction_account_id")?.textContent?.trim() ||
        "";
      const accID = accIDText.replace("Счет:", "").trim();

      const data = {
        transaction_id: op_id,
        account_id: accID,
        amount:
          card
            .querySelector(".transaction-card-info-price")
            ?.textContent?.trim() || "",
        date:
          card
            .querySelector(".transaction-card-info-time")
            ?.textContent?.trim() || "",
        category:
          card
            .querySelector(".transaction-card-info-category")
            ?.textContent?.trim() || "",
        organization:
          card
            .querySelector(".transaction-card-info-title")
            ?.textContent?.trim() || "",
        comment:
          card
            .querySelector(".transaction-card-info-comment")
            ?.textContent?.trim() || "",
      };

      window.openEditPopup(data);
      return;
    }

    const deleteBtn = target.closest(".delete-btn");
    if (deleteBtn) {
      const card = deleteBtn.closest(".transaction-card");
      if (!card) return;

      const idText =
        card.querySelector("#transaction_id")?.textContent?.trim() || "";
      const op_id = idText.replace("ID:", "").trim();
      const accIDText =
        card.querySelector("#transaction_account_id")?.textContent?.trim() ||
        "";
      const accID = accIDText.replace("Счет:", "").trim();

      if (!op_id || !accID) return;

      apiFetch(`/account/${accID}/operations/${op_id}`, {
        method: "DELETE",
      }).then(({ ok, error }) => {
        if (ok) router.navigate("/transactions");
        else console.error(error);
      });
      return;
    }

    // Закрытие popup меню при клике вне / открытие kebab меню
    document.querySelectorAll<HTMLElement>(".popup-menu").forEach((menu) => {
      const kebabMenu = menu.closest(".kebab-menu");
      const kebabBtn = kebabMenu?.querySelector(".kebab-btn");
      if (!menu.contains(target) && !kebabBtn?.contains(target)) {
        menu.classList.remove("show");
      }
    });
    if (target.closest(".kebab-btn")) {
      const menu = target
        .closest(".kebab-menu")
        ?.querySelector<HTMLElement>(".popup-menu");
      if (menu) {
        const isVisible = menu.classList.contains("show");
        document
          .querySelectorAll<HTMLElement>(".popup-menu")
          .forEach((m) => m.classList.remove("show"));
        if (!isVisible) menu.classList.add("show");
      }
    }

    // Редактирование категории
    const catBtn = target.closest(".cat-edi");
    if (catBtn) {
      const card = catBtn.closest(".category-card") as HTMLElement | null;
      if (!card) return;

      const ctgIdText =
        card.querySelector("#category-card-id")?.textContent?.trim() || "";
      const ctg_id = ctgIdText.replace("ID:", "").trim();

      const data = {
        name:
          card
            .querySelector(".category-card-info-title")
            ?.textContent?.trim() || "",
        type: (card.dataset.type as "income" | "expense") || "",
        description: card.dataset.description || "",
        fileName: card.dataset.filename || "",
        ctg_id: ctg_id,
      };
      window.openEditCategoryPopup(data);
    }

    const delCatBtn = target.closest(".delete-btn");
    if (delCatBtn) {
      const card = delCatBtn.closest(".category-card") as HTMLElement | null;
      if (!card) return;
      const ctgIdText =
        card.querySelector("#category-card-id")?.textContent?.trim() || "";
      const ctg_id = ctgIdText.replace("ID:", "").trim();
      if (!ctg_id) return;

      apiFetch(`/categgories/${ctg_id}`, {
        method: "DELETE",
      }).then(({ ok, error }) => {
        if (ok) router.navigate("/transactions");
        else console.error(error);
      });
    }
  });

  // Форма создания операции
  const form = document.querySelector<HTMLFormElement>("#create-oper-form");
  if (form) {
    const [
      costInput,
      operationTypeInput,
      operationDateInput,
      commentInput,
      accountInput,
      categoryInput,
    ] = getOperationInputs(form);

    addListener(costInput, "input", () =>
      validateOperationField("cost", costInput.value, costInput),
    );
    addListener(operationTypeInput, "change", () =>
      validateOperationField(
        "operationType",
        operationTypeInput.value,
        operationTypeInput,
      ),
    );
    addListener(operationDateInput, "input", () => {
      const formattedDate = operationDateInput.value
        ? operationDateInput.value.split("-").reverse().join(".")
        : "";
      validateOperationField(
        "operationDate",
        formattedDate,
        operationDateInput,
      );
    });
    addListener(commentInput, "input", () =>
      validateOperationField("comment", commentInput.value, commentInput),
    );
    addListener(accountInput, "change", () =>
      validateOperationField("account", accountInput.value, accountInput),
    );
    if (categoryInput)
      addListener(categoryInput, "change", () =>
        validateOperationField("category", categoryInput.value, categoryInput),
      );
  }

  // Форма редактирования операции
  const editForm = document.querySelector<HTMLFormElement>("#editForm");
  if (editForm) {
    const [editCostInput, editOperationDateInput, editCommentInput] =
      getEditOperationInputs(editForm);

    addListener(editCostInput, "input", () =>
      validateOperationField("cost", editCostInput.value, editCostInput),
    );
    addListener(editOperationDateInput, "input", () => {
      const formattedDate = editOperationDateInput.value
        ? editOperationDateInput.value.split("-").reverse().join(".")
        : "";
      validateOperationField(
        "operationDate",
        formattedDate,
        editOperationDateInput,
      );
    });
    addListener(editCommentInput, "input", () =>
      validateOperationField(
        "comment",
        editCommentInput.value,
        editCommentInput,
      ),
    );
  }

  // Форма создания категории
  const createCategoryForm =
    document.querySelector<HTMLFormElement>("#categoryForm");
  if (createCategoryForm) {
    const [categoryNameInput, categoryIconInput, categoryDescInput] =
      getCategoryInputs(createCategoryForm);

    addListener(categoryNameInput, "input", () =>
      validateOperationField(
        "categoryName",
        categoryNameInput.value,
        categoryNameInput,
      ),
    );
    addListener(categoryIconInput, "change", () => {
      const file = categoryIconInput.files?.[0];
      validateOperationField("categoryIcon", file as any, categoryIconInput);
    });
    addListener(categoryDescInput, "input", () =>
      validateOperationField(
        "categoryDescription",
        categoryDescInput.value,
        categoryDescInput,
      ),
    );
  }

  // Форма редактирования категории
  const editCategoryForm = document.querySelector<HTMLFormElement>(
    "#categoryEditPopup form",
  );
  if (editCategoryForm) {
    const [
      editCategoryNameInput,
      editCategoryIconInput,
      editCategoryDescInput,
    ] = getEditCategoryInputs(editCategoryForm);

    addListener(editCategoryNameInput, "input", () =>
      validateOperationField(
        "categoryName",
        editCategoryNameInput.value,
        editCategoryNameInput,
      ),
    );
    addListener(editCategoryIconInput, "change", () => {
      const file = editCategoryIconInput.files?.[0];
      validateOperationField(
        "categoryIcon",
        file as any,
        editCategoryIconInput,
      );
    });
    addListener(editCategoryDescInput, "input", () =>
      validateOperationField(
        "categoryDescription",
        editCategoryDescInput.value,
        editCategoryDescInput,
      ),
    );
  }
}
