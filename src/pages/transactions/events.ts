import {
    validateOperationField,
    getOperationInputs,
    getEditOperationInputs,
    getCategoryInputs,
    getEditCategoryInputs,
} from "./validationForForms.js";


export function addEventListeners(context: any): void {
    const openBtn = document.querySelector<HTMLButtonElement>("#openPopupBtn");
    const closeBtn = document.querySelector<HTMLButtonElement>("#closePopupBtn");
    const openCategoryBtn = document.querySelector<HTMLButtonElement>("#openCategoryBtn");
    const closeCategoryBtn = document.querySelector<HTMLButtonElement>("#closeCategoryBtn");

    openBtn?.addEventListener("click", () => context.openPopup());
    closeBtn?.addEventListener("click", () => context.closePopup());
    openCategoryBtn?.addEventListener("click", () => context.openCategoryPopup());
    closeCategoryBtn?.addEventListener("click", () => context.closeCategoryPopup());

    document.body.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target?.type === "file" && target.id === "categoryIcon") {
            const popupForm = target.closest<HTMLElement>(".popup-form");
            const fileNameBox = popupForm?.querySelector<HTMLElement>("#fileName");

            if (!fileNameBox) return;

            if (target.files && target.files.length > 0) {
                fileNameBox.textContent = target.files[0].name;
            } else {
                fileNameBox.textContent = "Файл не выбран";
            }
        }
    });

    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const editBtn = target.closest(".edit-btn");
        if (!editBtn) return;

        const card = editBtn.closest(".transaction-card");
        if (!card) return;
        const data = {
            amount: card.querySelector(".transaction-card-info-price")?.textContent?.trim() || "",
            type: (card as HTMLElement).dataset.type || "",
            date: card.querySelector(".transaction-card-info-time")?.textContent?.trim() || "",
            category: card.querySelector(".transaction-card-info-category")?.textContent?.trim() || "",
            organization: card.querySelector(".transaction-card-info-title")?.textContent?.trim() || "",
            comment: "",
            account: ""
        };
        window.openEditPopup(data);
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
            const menu = target.closest(".kebab-menu")?.querySelector<HTMLElement>(".popup-menu");
            if (menu) {
                const isVisible = menu.classList.contains("show");
                document.querySelectorAll<HTMLElement>(".popup-menu").forEach((m) => m.classList.remove("show"));
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
            type: card.dataset.type as "income" | "expense" || "",
            description: card.dataset.description || "",
            fileName: card.dataset.filename || ""
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
        ] = getOperationInputs(form);

        costInput.addEventListener("input", () => {
            validateOperationField("cost", costInput.value, costInput);
        });

        operationTypeInput.addEventListener("change", () => {
            validateOperationField("operationType", operationTypeInput.value, operationTypeInput);
        });

        operationDateInput.addEventListener("input", () => {
            let formattedDate = "";
            if (operationDateInput.value) {
                formattedDate = operationDateInput.value.split("-").reverse().join(".");
            }
            validateOperationField("operationDate", formattedDate, operationDateInput);
        });

        commentInput.addEventListener("input", () => {
            validateOperationField("comment", commentInput.value, commentInput);
        });

        accountInput.addEventListener("input", () => {
            validateOperationField("account", accountInput.value, accountInput);
        });
    }

    const editForm = document.querySelector<HTMLFormElement>("#editPopup form");
    if (editForm) {
        const [editCostInput, editOperationDateInput, editCommentInput] = getEditOperationInputs(editForm);

        editCostInput.addEventListener("input", () => {
            validateOperationField("cost", editCostInput.value, editCostInput);
        });

        editOperationDateInput.addEventListener("input", () => {
            let formattedDate = "";
            if (editOperationDateInput.value) {
                formattedDate = editOperationDateInput.value.split("-").reverse().join(".");
            }
            validateOperationField("operationDate", formattedDate, editOperationDateInput);
        });

        editCommentInput.addEventListener("input", () => {
            validateOperationField("comment", editCommentInput.value, editCommentInput);
        });
    }

    const createCategoryForm = document.querySelector<HTMLFormElement>("#categoryForm");
    if (createCategoryForm) {
        const [categoryNameInput, categoryIconInput, categoryDescInput] = getCategoryInputs(createCategoryForm);

        categoryNameInput.addEventListener("input", () => {
            validateOperationField("categoryName", categoryNameInput.value, categoryNameInput);
        });

        categoryIconInput.addEventListener("change", () => {
            const file = categoryIconInput.files?.[0];
            validateOperationField("categoryIcon", file as any, categoryIconInput);
        });

        categoryDescInput.addEventListener("input", () => {
            validateOperationField("categoryDescription", categoryDescInput.value, categoryDescInput);
        });
    }

    const editCategoryForm = document.querySelector<HTMLFormElement>("#categoryEditPopup form");
    if (editCategoryForm) {
        const [editCategoryNameInput, editCategoryIconInput, editCategoryDescInput] =
            getEditCategoryInputs(editCategoryForm);

        editCategoryNameInput.addEventListener("input", () => {
            validateOperationField("categoryName", editCategoryNameInput.value, editCategoryNameInput);
        });

        editCategoryIconInput.addEventListener("change", () => {
            const file = editCategoryIconInput.files?.[0];
            validateOperationField("categoryIcon", file as any, editCategoryIconInput);
        });

        editCategoryDescInput.addEventListener("input", () => {
            validateOperationField("categoryDescription", editCategoryDescInput.value, editCategoryDescInput);
        });
    }
}
