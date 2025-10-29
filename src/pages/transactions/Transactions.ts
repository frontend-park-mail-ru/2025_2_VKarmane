import Handlebars from "handlebars";
import TransactionsTemplate from "../../templates/pages/transactions.hbs?raw";
import { Menu } from "../../components/menu/index.js";
import { AddOperation } from "../../components/addTransactions/index.js";
import { AddCategory } from "../../components/addCategory/index.js";
import { TransactionsList } from "../../components/OperationCardWindow/index.js";
import { CategoriesList } from "../../components/CaregoryCardWindow/index.js";
import { ProfileBlock } from "../../components/profileBlock/index.js";
import { redactOpers } from "../../components/redactOpers/index.js";
import { RedactCategory } from "../../components/redactCategory/index.js";
import { InputField } from "../../components/inputField/index.js";
import { addEventListeners } from "../transactions/events.js";

import {
  validateField,
  validateOperationRedactForm,
  validateCategoryForm,
  validateCategoryRedactForm,
  setServerEditOperError,
  setServerCreateCategoryError,
  setServerEditCategoryError,
  setInputsError,
  getEditOperationInputs,
  getCategoryInputs,
  getEditCategoryInputs,
  getOperationInputs,
  validateOperationField,
  setServerCreateOperError,
  validateOperationFormRashod,
  validateOperationFormDohod,
} from "../transactions/validationForForms.js";

import {
  openPopup,
  openEditPopup,
  closeEditPopup,
  closePopup,
  formatDateForInput,
} from "../transactions/operations.js";
import {
  closeCategoryPopup,
  openCategoryPopup,
  openEditCategoryPopup,
  closeEditCategoryPopup,
} from "./categories.js";
import { setBody } from "../../utils/bodySetters.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { router } from "../../router.js";

interface Transaction {
  OrganizationTitle: string;
  CategoryName: string;
  OperationPrice: string;
  OperationTime: string;
}

interface Category {
  CategoryName: string;
  CategoryStatus: string;
  CategoryAmount: string;
}

interface OperationFromBackend {
  category_id: number;
  sum: number;
  date: Date;
  transaction_id: number;
  account_id: number;
}

declare global {
  interface Window {
    openPopup: () => void;
    closePopup: () => void;
    openCategoryPopup: () => void;
    closeCategoryPopup: () => void;
    openEditPopup: (data: {
      amount?: string;
      type?: "income" | "expense";
      date?: string;
      category?: string;
      organization?: string;
      comment?: string;
      account?: string;
      transaction_id?: string;
      account_id?: string;
    }) => void;
    closeEditPopup: () => void;
    openEditCategoryPopup: () => void;
    closeEditCategoryPopup: () => void;
  }
}

export class TransactionsPage {
  private template: Handlebars.TemplateDelegate;
  private menu: Menu;
  private addOperations: AddOperation;
  private addCategory: AddCategory;
  private transactions: TransactionsList;
  private categories: CategoriesList;
  private profileBlock: ProfileBlock;
  private redactOpers: redactOpers;
  private RedactCategory: RedactCategory;
  private inputField: InputField;

  constructor() {
    this.template = Handlebars.compile(TransactionsTemplate);
    this.menu = new Menu();
    this.addOperations = new AddOperation(
      closePopup.bind(this),
      this.handleOperationTypeChange.bind(this),
    );
    this.addCategory = new AddCategory();
    this.inputField = new InputField();
    this.RedactCategory = new RedactCategory();

    window.openPopup = openPopup.bind(this);
    window.closePopup = closePopup.bind(this);
    window.openCategoryPopup = openCategoryPopup.bind(this);
    window.closeCategoryPopup = closeCategoryPopup.bind(this);
    window.openEditPopup = openEditPopup.bind(this);
    window.closeEditPopup = closeEditPopup.bind(this);
    window.openEditCategoryPopup = openEditCategoryPopup.bind(this);
    window.closeEditCategoryPopup = closeEditCategoryPopup.bind(this);

    this.transactions = new TransactionsList();
    this.categories = new CategoriesList();
    this.profileBlock = new ProfileBlock();
    this.redactOpers = new redactOpers(
      closeEditPopup.bind(this),
      this.handleOperationTypeChange.bind(this),
    );
  }

  async render(container: HTMLElement | null): Promise<void> {
    if (!container) throw new Error("Container element not found!");
    document.body.classList.remove("hide-scroller");

    const { ok, data } = await apiFetch("/profile");
    if (!ok) throw new Error("failed to get user profile");

    //TODO: Сделать ручки для работы с аккаунтами
    const accounts = [1, 2];

    const allOps = await Promise.all(
      accounts.map(async (id) => {
        const { ok, data, error } = await apiFetch(
          `/account/${id}/operations`,
          {
            method: "GET",
          },
        );
        if (!ok) {
          console.error("Ошибка получения операций:", error);
          router.navigate("/login");
        }

        return data.operations.map((operation: OperationFromBackend) => ({
          OrganizationTitle: "Мок",
          CategoryName: `Категория ${operation.category_id}`,
          OperationPrice: operation.sum,
          OperationTime: new Date(operation.date).toLocaleDateString("ru-RU"),
          OperationID: operation.transaction_id,
          AccountID: operation.account_id,
        }));
      }),
    );

    const operations: Transaction[] = allOps.flat();

    const dataCategories: Category[] = [
      {
        CategoryName: "1212",
        CategoryStatus: "1212",
        CategoryAmount: "1212",
      },
      {
        CategoryName: "1212",
        CategoryStatus: "1212",
        CategoryAmount: "1212",
      },
    ];

    const data_ = {
      menu: this.menu.getSelf(),
      addOperations: this.addOperations.getSelf(),
      addCategories: this.addCategory.getSelf(),
      transactions: this.transactions.getList(operations),
      categories: this.categories.getList(dataCategories),
      profile_block: this.profileBlock.getSelf(data.login, data.user_id),
      redactOperations: this.redactOpers.getSelf(),
      redactCategories: this.RedactCategory.getSelf(),
    };

    container.innerHTML = this.template(data_);
    setBody();

    this.setupEventListeners(container);
    addEventListeners(this);
  }

  setupEventListeners(container: HTMLElement): void {
    this.menu.setEvents();
    this.profileBlock.setEvents();
    const form: HTMLFormElement | null =
      container.querySelector("#create-oper-form");
    if (!form) return;
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleOperationRequest(form);
      });
    }

    const form2: HTMLFormElement | null =
      container.querySelector("#editPopup form");
    if (!form2) return;
    form2.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleOperationRedactRequest(form2);
    });

    const createCategoryForm: HTMLFormElement | null =
      container.querySelector("#editCategoryForm");
    if (createCategoryForm) {
      createCategoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCategoryRequest(createCategoryForm);
      });
    } else {
      console.warn(
        "Форма создания категории (#create-category-form) не найдена при инициализации",
      );
    }

    const editCategoryForm: HTMLFormElement | null =
      container.querySelector("#categoryEditPopup");
    if (editCategoryForm) {
      editCategoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCategoryRedactRequest(editCategoryForm);
      });
    } else {
      console.warn(
        "Форма редактирования категории (#categoryEditPopup form) не найдена при инициализации",
      );
    }
  }

  handleOperationTypeChange(): void {
    const selectedType = (
      document.getElementById("operationType") as HTMLSelectElement
    )?.value;

    const incomeField = document.querySelector<HTMLElement>(".income-field");
    const expenseField = document.querySelector<HTMLElement>(".expense-field");

    if (!incomeField || !expenseField) return;

    incomeField.classList.add("hidden");
    expenseField.classList.add("hidden");

    if (selectedType === "income") {
      incomeField.classList.remove("hidden");
    } else if (selectedType === "expense") {
      expenseField.classList.remove("hidden");
    }
  }

  async handleOperationRequest(form: HTMLFormElement): Promise<void> {
    const [
      costInput,
      operationTypeInput,
      operationDateInput,
      commentInput,
      accountInput,
      // receiverInput,
      // nameInput,
      categoryInput,
    ] = getOperationInputs(form);

    if (
      (!costInput ||
        !operationTypeInput ||
        !operationDateInput ||
        !commentInput ||
        !accountInput ||
        !categoryInput) &&
      operationTypeInput?.value == "expense"
    ) {
      console.error("Не удалось найти все необходимые поля формы операции");
      return;
    } else if (
      (!costInput ||
        !operationTypeInput ||
        !operationDateInput ||
        !commentInput ||
        !accountInput) &&
      operationTypeInput?.value == "income"
    ) {
      console.error("Не удалось найти все необходимые поля формы операции");
      return;
    }
    const isValidRashod = validateOperationFormRashod(
      costInput.value,
      operationTypeInput.value,
      operationDateInput.value,
      commentInput.value,
      accountInput.value,
      categoryInput.value,
      form,
    );

    const isValidDohod = validateOperationFormDohod(
      costInput.value,
      operationTypeInput.value,
      operationDateInput.value,
      commentInput.value,
      accountInput.value,
      form,
    );

    if (!isValidRashod && isValidDohod) {
      console.warn("Ошибка валидации данных операции - ValidRashod");
      return;
    }
    if (!isValidDohod && isValidRashod) {
      console.warn("Ошибка валидации данных операции - ValidDohod");
      return;
    }

    if (!isValidDohod && !isValidRashod) {
      console.warn("Ошибка валидации данных операции - ValidDohodRashod");
      return;
    }

    const accountId = parseInt(accountInput.value, 10);
    const categoryId = parseInt(categoryInput.value, 10);

    const body = {
      account_id: accountId,
      category_id: categoryId,
      sum: parseFloat(costInput.value),
      name: "aboba323",
      type: operationTypeInput.value,
      description: commentInput.value.trim() || "",
      created_at: new Date(operationDateInput.value).toISOString(),
    };

    try {
      const { ok, status } = await apiFetch(`/account/1/operations`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!ok) {
        if (status === 400) {
          this.inputField.setError(
            [
              costInput,
              operationTypeInput,
              operationDateInput,
              commentInput,
              accountInput,
              categoryInput,
              // nameInput,
            ],
            true,
            "Некорректные данные операции",
          );
          // } else if (status === 409) {
          //     this.inputField.setError([nameInput], true, "Такая операция уже существует");
        } else if (status === 500) {
          setServerCreateOperError();
        } else {
          setServerCreateOperError();
        }
        return;
      }

      console.info("Операция успешно создана");
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      setServerCreateOperError();
    }
    router.navigate("/transactions");
  }

  async handleOperationRedactRequest(form: HTMLFormElement): Promise<void> {
    const [
      costInput,
      operationDateInput,
      commentInput,
      transaction_id,
      account_id,
    ] = getEditOperationInputs(form);

    if (
      !costInput ||
      !operationDateInput ||
      !commentInput ||
      !transaction_id ||
      !account_id
    ) {
      console.error(transaction_id);
      return;
    }

    const isValid = validateOperationRedactForm(
      costInput.value,
      operationDateInput.value,
      commentInput.value,
      form,
    );

    if (!isValid) {
      console.warn("Ошибка валидации данных операции");
      return;
    }
    const body = {
      category_id: 1,
      sum: parseFloat(costInput.value),
      name: operationDateInput.value,
      description: commentInput.value.trim() || "",
      created_at: new Date(operationDateInput.value).toISOString(),
    };
    if (!transaction_id) {
      console.error("transaction_id отсутствует!");
      return;
    }
    const opId = Number(transaction_id);
    if (isNaN(opId)) {
      console.error(transaction_id);
      return;
    }

    console.log(account_id);

    const { ok, status } = await apiFetch(
      `/account/${account_id}/operations/${opId}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      },
    );

    if (!ok) {
      if (status === 400) {
        this.inputField.setError(
          [costInput, operationDateInput, commentInput, transaction_id],
          true,
          "Некорректные данные операции",
        );
      } else if (status === 409) {
        this.inputField.setError(
          [commentInput],
          true,
          "Такая операция уже существует",
        );
      } else if (status === 500) {
        setServerEditOperError();
      } else {
        setServerEditOperError();
      }
      return;
    }
    router.navigate("/transactions");
  }

  async handleCategoryRequest(form: HTMLFormElement): Promise<void> {
    const nameInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Название категории (обяз.)"]',
    );
    const typeInput = form.querySelector<HTMLSelectElement>("#categoryType");
    const iconInput = form.querySelector<HTMLInputElement>("#categoryIcon");
    const descInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Описание категории (необяз.)"]',
    );

    if (!nameInput || !typeInput || !iconInput || !descInput) {
      console.error("Не удалось найти все поля формы категории");
      return;
    }

    const file = iconInput.files?.[0] || null;

    const isValid = validateCategoryForm(
      nameInput.value,
      file,
      descInput.value,
      form,
    );

    if (!isValid) {
      console.warn("Ошибка валидации данных категории");
      return;
    }

    const body = new FormData();
    body.append("name", nameInput.value);
    if (file) body.append("icon", file);
    body.append("description", descInput.value);

    const { ok, status } = await apiFetch(`/categories/new`, {
      method: "POST",
      body,
    });

    if (!ok) {
      if (status === 400) {
        this.inputField.setError(
          [nameInput, iconInput, descInput],
          true,
          "Некорректные данные категории",
        );
      } else if (status === 409) {
        this.inputField.setError(
          [nameInput],
          true,
          "Такая категория уже существует",
        );
      } else {
        setServerCreateCategoryError();
      }
      router.navigate("/transactions");
    }
  }

  async handleCategoryRedactRequest(form: HTMLFormElement): Promise<void> {
    const nameInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Название категории (обяз.)"]',
    );
    const typeInput =
      form.querySelector<HTMLSelectElement>("#editCategoryType");
    const iconInput = form.querySelector<HTMLInputElement>("#editCategoryIcon");
    const descInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Описание категории (необяз.)"]',
    );

    if (!nameInput || !typeInput || !iconInput || !descInput) {
      console.error("Не удалось найти все поля формы редактирования категории");
      return;
    }

    const file = iconInput.files?.[0] || null;

    const isValid = validateCategoryRedactForm(
      nameInput.value,
      file,
      descInput.value,
      form,
    );

    if (!isValid) {
      console.warn("Ошибка валидации данных редактируемой категории");
      return;
    }

    const body = new FormData();
    body.append("name", nameInput.value);
    if (file) body.append("icon", file);
    body.append("description", descInput.value);

    const { ok, status } = await apiFetch(`/categories/edit`, {
      method: "POST",
      body,
    });

    if (!ok) {
      if (status === 400) {
        this.inputField.setError(
          [nameInput, iconInput, descInput],
          true,
          "Некорректные данные при редактировании категории",
        );
      } else if (status === 409) {
        this.inputField.setError(
          [nameInput],
          true,
          "Категория с таким именем уже существует",
        );
      } else {
        setServerEditCategoryError();
      }
      return;
    }
  }
}
