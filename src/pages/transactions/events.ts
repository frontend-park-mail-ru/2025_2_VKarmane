import {
  validateOperationField,
  getOperationInputs,
  getEditOperationInputs,
  getCategoryInputs,
  getEditCategoryInputs,
} from "./validationForForms.js";
import { router } from "../../router.js";
import { apiFetch } from "../../api/fetchWrapper.js";

export function addEventListeners(context: any, container: HTMLElement): void {
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

  document.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target?.type === "file" && target.id === "categoryIcon") {
      const popupForm = target.closest<HTMLElement>(".popup-form");
      const fileNameBox = popupForm?.querySelector<HTMLElement>("#fileName");
      if (!fileNameBox) return;
      fileNameBox.textContent = target.files?.[0]?.name || "Файл не выбран";
    }
  });

  document.addEventListener("click", (e) => {
    let target = e.target as HTMLElement | null;
    if (!target) return;

    // Если клик по текстовому узлу, берем родителя
    if (target.nodeType !== 1) {
      target = target.parentElement;
      if (!target) return;
    }

    const editBtn = target.closest(".edit-btn");
    if (!editBtn) return;

    const card = editBtn.closest(".transaction-card");
    if (!card) return;

    const idText =
      card.querySelector("#transaction_id")?.textContent?.trim() || "";
    const op_id = idText.replace("ID:", "").trim();
    const accIDText =
      card.querySelector("#transaction_account_id")?.textContent?.trim() || "";
    const accID = accIDText.replace("Счет:", "").trim();
    console.log(accID);

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
  });
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    console.log(target);
    const deleteBtn = target.closest(".delete-btn");
    if (!deleteBtn) return;

    const card = deleteBtn.closest(".transaction-card");
    if (!card) return;

    const idText =
      card.querySelector("#transaction_id")?.textContent?.trim() || "";
    const op_id = idText.replace("ID:", "").trim();
    const accIDText =
      card.querySelector("#transaction_account_id")?.textContent?.trim() || "";
    const accID = accIDText.replace("Счет:", "").trim();

    if (!op_id || !accID) return;

    console.log(op_id);
    const { ok, error } = await apiFetch(
      `/account/${accID}/operations/${op_id}`,
      {
        method: "DELETE",
      },
    );
    if (ok) {
      router.navigate("/profile");
    } else {
      console.log(error);
    }
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
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
  });

  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest(".cat-edi");
    if (!btn) return;

    const card = btn.closest(".category-card") as HTMLElement | null;
    if (!card) return;

    const data = {
      name: card.querySelector(".category-title")?.textContent?.trim() || "",
      type: (card.dataset.type as "income" | "expense") || "",
      description: card.dataset.description || "",
      fileName: card.dataset.filename || "",
    };

    window.openEditCategoryPopup(data);
  });

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

    costInput.addEventListener("input", () => {
      validateOperationField("cost", costInput.value, costInput);
    });

    operationTypeInput.addEventListener("change", () => {
      validateOperationField(
        "operationType",
        operationTypeInput.value,
        operationTypeInput,
      );
    });

    operationDateInput.addEventListener("input", () => {
      let formattedDate = "";
      if (operationDateInput.value) {
        formattedDate = operationDateInput.value.split("-").reverse().join(".");
      }
      validateOperationField(
        "operationDate",
        formattedDate,
        operationDateInput,
      );
    });

    commentInput.addEventListener("input", () => {
      validateOperationField("comment", commentInput.value, commentInput);
    });

    accountInput.addEventListener("change", () => {
      validateOperationField("account", accountInput.value, accountInput);
    });

    if (categoryInput) {
      categoryInput.addEventListener("change", () => {
        validateOperationField("category", categoryInput.value, categoryInput);
      });
    }
  }

  const editForm = document.querySelector<HTMLFormElement>("#editForm");
  if (editForm) {
    const [editCostInput, editOperationDateInput, editCommentInput] =
      getEditOperationInputs(editForm);

    editCostInput.addEventListener("input", () => {
      validateOperationField("cost", editCostInput.value, editCostInput);
    });

    editOperationDateInput.addEventListener("input", () => {
      let formattedDate = "";
      if (editOperationDateInput.value) {
        formattedDate = editOperationDateInput.value
          .split("-")
          .reverse()
          .join(".");
      }
      validateOperationField(
        "operationDate",
        formattedDate,
        editOperationDateInput,
      );
    });

    editCommentInput.addEventListener("input", () => {
      validateOperationField(
        "comment",
        editCommentInput.value,
        editCommentInput,
      );
    });
  }

  const createCategoryForm =
    document.querySelector<HTMLFormElement>("#categoryForm");
  if (createCategoryForm) {
    const [categoryNameInput, categoryIconInput, categoryDescInput] =
      getCategoryInputs(createCategoryForm);

    categoryNameInput.addEventListener("input", () => {
      validateOperationField(
        "categoryName",
        categoryNameInput.value,
        categoryNameInput,
      );
    });

    categoryIconInput.addEventListener("change", () => {
      const file = categoryIconInput.files?.[0];
      validateOperationField("categoryIcon", file as any, categoryIconInput);
    });

    categoryDescInput.addEventListener("input", () => {
      validateOperationField(
        "categoryDescription",
        categoryDescInput.value,
        categoryDescInput,
      );
    });
  }

  const editCategoryForm = document.querySelector<HTMLFormElement>(
    "#categoryEditPopup form",
  );
  if (editCategoryForm) {
    const [
      editCategoryNameInput,
      editCategoryIconInput,
      editCategoryDescInput,
    ] = getEditCategoryInputs(editCategoryForm);

    editCategoryNameInput.addEventListener("input", () => {
      validateOperationField(
        "categoryName",
        editCategoryNameInput.value,
        editCategoryNameInput,
      );
    });

    editCategoryIconInput.addEventListener("change", () => {
      const file = editCategoryIconInput.files?.[0];
      validateOperationField(
        "categoryIcon",
        file as any,
        editCategoryIconInput,
      );
    });

    editCategoryDescInput.addEventListener("input", () => {
      validateOperationField(
        "categoryDescription",
        editCategoryDescInput.value,
        editCategoryDescInput,
      );
    });
  }
}
