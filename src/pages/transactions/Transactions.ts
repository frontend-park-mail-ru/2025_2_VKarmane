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
  getEditOperationInputs,
  getOperationInputs,
  validateOperationFormRashod,
  validateOperationFormDohod,
  validateOperationRedactForm,
  validateCategoryForm,
  validateCategoryRedactForm,
  setServerCreateOperError,
  setServerEditOperError,
  setServerCreateCategoryError,
  setServerEditCategoryError,
} from "../transactions/validationForForms.js";

import {
  openPopup,
  closePopup,
  openEditPopup,
  closeEditPopup,
} from "../transactions/operations.js";
import {
  openCategoryPopup,
  closeCategoryPopup,
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
  OperationID?: number;
  AccountID?: number;
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
  name: string;
}

declare global {
  interface Window {
    openPopup: () => void;
    closePopup: () => void;
    openCategoryPopup: () => void;
    closeCategoryPopup: () => void;
    openEditPopup: (data?: any) => void;
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
  private redactCategory: RedactCategory;
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
    this.redactCategory = new RedactCategory();

    this.transactions = new TransactionsList();
    this.categories = new CategoriesList();
    this.profileBlock = new ProfileBlock();
    this.redactOpers = new redactOpers(
      closeEditPopup.bind(this),
      this.handleOperationTypeChange.bind(this),
    );

    // глобальные функции
    window.openPopup = openPopup.bind(this);
    window.closePopup = closePopup.bind(this);
    window.openCategoryPopup = openCategoryPopup.bind(this);
    window.closeCategoryPopup = closeCategoryPopup.bind(this);
    window.openEditPopup = openEditPopup.bind(this);
    window.closeEditPopup = closeEditPopup.bind(this);
    window.openEditCategoryPopup = openEditCategoryPopup.bind(this);
    window.closeEditCategoryPopup = closeEditCategoryPopup.bind(this);
  }

  async render(container: HTMLElement | null): Promise<void> {
    if (!container) throw new Error("Container element not found!");
    document.body.classList.remove("hide-scroller");

    const { ok, data: profileData } = await apiFetch("/profile");
    if (!ok) throw new Error("Failed to get user profile");

    const operations = await this.loadOperations();

    const categories: Category[] = [
      {
        CategoryName: "Продукты",
        CategoryStatus: "Активна",
        CategoryAmount: "1200",
      },
      {
        CategoryName: "Транспорт",
        CategoryStatus: "Неактивна",
        CategoryAmount: "800",
      },
    ];

    const data = {
      menu: this.menu.getSelf(),
      addOperations: this.addOperations.getSelf(),
      addCategories: this.addCategory.getSelf(),
      transactions: this.transactions.getList(operations),
      categories: this.categories.getList(categories),
      profile_block: this.profileBlock.getSelf(
        profileData.login || "User",
        profileData.user_id,
      ),
      redactOperations: this.redactOpers.getSelf(),
      redactCategories: this.redactCategory.getSelf(),
    };

    container.innerHTML = this.template(data);
    setBody();
    addEventListeners(this);
    this.setupEventListeners(container);
  }

  private async loadOperations(): Promise<Transaction[]> {
    try {
      const accounts = [1, 2];
      const allOps = await Promise.all(
        accounts.map(async (id) => {
          const { ok, data, error, status } = await apiFetch(
            `/account/${id}/operations`,
          );
          if (!ok) {
            console.error("Ошибка получения операций:", error);
            if (status !== 403) router.navigate("/login");
            return [];
          }
          return data.operations.map((op: OperationFromBackend) => ({
            OrganizationTitle: op.name || "Мок",
            CategoryName: `Категория ${op.category_id}`,
            OperationPrice: op.sum.toString(),
            OperationTime: new Date(op.date).toLocaleDateString("ru-RU"),
            OperationID: op.transaction_id,
            AccountID: op.account_id,
          }));
        }),
      );
      return allOps.flat();
    } catch (err) {
      console.error("Ошибка при загрузке операций:", err);
      return [];
    }
  }

  private setupEventListeners(container: HTMLElement): void {
    this.menu.setEvents();
    this.profileBlock.setEvents();

    const forms = [
      {
        selector: "#create-oper-form",
        handler: this.handleOperationRequest.bind(this),
      },
      {
        selector: "#editPopup form",
        handler: this.handleOperationRedactRequest.bind(this),
      },
      {
        selector: "#create-category-form",
        handler: this.handleCategoryRequest.bind(this),
      },
      {
        selector: "#categoryEditPopup form",
        handler: this.handleCategoryRedactRequest.bind(this),
      },
    ];

    forms.forEach(({ selector, handler }) => {
      const form = container.querySelector<HTMLFormElement>(selector);
      if (form)
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          handler(form);
        });
      else console.warn(`Форма ${selector} не найдена при инициализации`);
    });
  }

  private handleOperationTypeChange(): void {
    const selectedType = (
      document.getElementById("operationType") as HTMLSelectElement
    )?.value;
    const incomeField = document.querySelector<HTMLElement>(".income-field");
    const expenseField = document.querySelector<HTMLElement>(".expense-field");
    if (!incomeField || !expenseField) return;
    incomeField.classList.toggle("hidden", selectedType !== "income");
    expenseField.classList.toggle("hidden", selectedType !== "expense");
  }

  private async handleOperationRequest(form: HTMLFormElement): Promise<void> {
    const [
      costInput,
      operationTypeInput,
      operationDateInput,
      commentInput,
      accountInput,
      categoryInput,
      titleInput,
    ] = getOperationInputs(form);
    if (
      !costInput ||
      !operationTypeInput ||
      !operationDateInput ||
      !commentInput ||
      !accountInput ||
      !categoryInput ||
      !titleInput
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
      titleInput.value,
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
    if (!isValidRashod && !isValidDohod)
      return console.warn("Ошибка валидации данных операции");

    const body = {
      account_id: parseInt(accountInput.value),
      category_id: parseInt(categoryInput.value),
      sum: parseFloat(costInput.value),
      name: titleInput.value ? titleInput.value : "no name",
      type: operationTypeInput.value,
      description: commentInput.value.trim() || "",
      created_at: new Date(operationDateInput.value).toISOString(),
    };

    try {
      const { ok, status } = await apiFetch(
        `/account/${body.account_id}/operations`,
        { method: "POST", body: JSON.stringify(body) },
      );
      if (!ok) {
        if (status === 400)
          this.inputField.setError(
            [
              costInput,
              operationTypeInput,
              operationDateInput,
              commentInput,
              accountInput,
              categoryInput,
            ],
            true,
            "Некорректные данные операции",
          );
        else setServerCreateOperError();
        return;
      }
      console.info("Операция успешно создана");
      router.navigate("/transactions");
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      setServerCreateOperError();
    }
  }

  private async handleOperationRedactRequest(
    form: HTMLFormElement,
  ): Promise<void> {
    const [
      costInput,
      operationDateInput,
      commentInput,
      transaction_id,
      account_id,
    ] = getEditOperationInputs(form);
    if (!costInput || !operationDateInput || !commentInput || !transaction_id)
      return console.error("Не удалось найти все поля формы редактирования");

    if (
      !validateOperationRedactForm(
        costInput.value,
        operationDateInput.value,
        commentInput.value,
        form,
      )
    )
      return console.warn("Ошибка валидации данных операции");

    const opId = Number(transaction_id);
    const accId = Number(account_id);
    if (isNaN(opId))
      return console.error("Некорректный transaction_id:", transaction_id);

    const body = {
      category_id: 1,
      sum: parseFloat(costInput.value),
      name: operationDateInput.value,
      description: commentInput.value.trim() || "",
      created_at: new Date(operationDateInput.value).toISOString(),
    };

    const { ok, status } = await apiFetch(
      `/account/${accId}/operations/${opId}`,
      { method: "PUT", body: JSON.stringify(body) },
    );
    if (!ok) {
      if (status === 400)
        this.inputField.setError(
          [costInput, operationDateInput, commentInput, transaction_id],
          true,
          "Некорректные данные операции",
        );
      else if (status === 409)
        this.inputField.setError(
          [commentInput],
          true,
          "Такая операция уже существует",
        );
      else setServerEditOperError();
      return;
    }
    router.navigate("/transactions");
  }

  private async handleCategoryRequest(form: HTMLFormElement): Promise<void> {
    const nameInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Название категории (обяз.)"]',
    );
    const typeInput = form.querySelector<HTMLSelectElement>("#categoryType");
    const iconInput = form.querySelector<HTMLInputElement>("#categoryIcon");
    const descInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Описание категории (необяз.)"]',
    );
    if (!nameInput || !typeInput || !iconInput || !descInput)
      return console.error("Не удалось найти все поля формы категории");

    const file = iconInput.files?.[0] || null;
    if (!validateCategoryForm(nameInput.value, file, descInput.value, form))
      return console.warn("Ошибка валидации данных категории");

    const body = new FormData();
    body.append("name", nameInput.value);
    if (file) body.append("icon", file);
    body.append("description", descInput.value);

    const { ok, status } = await apiFetch(`/categories/new`, {
      method: "POST",
      body,
    });
    if (!ok) {
      if (status === 400)
        this.inputField.setError(
          [nameInput, iconInput, descInput],
          true,
          "Некорректные данные категории",
        );
      else if (status === 409)
        this.inputField.setError(
          [nameInput],
          true,
          "Такая категория уже существует",
        );
      else setServerCreateCategoryError();
      router.navigate("/transactions");
    }
  }

  private async handleCategoryRedactRequest(
    form: HTMLFormElement,
  ): Promise<void> {
    const nameInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Название категории (обяз.)"]',
    );
    const typeInput =
      form.querySelector<HTMLSelectElement>("#editCategoryType");
    const iconInput = form.querySelector<HTMLInputElement>("#editCategoryIcon");
    const descInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Описание категории (необяз.)"]',
    );
    if (!nameInput || !typeInput || !iconInput || !descInput)
      return console.error(
        "Не удалось найти все поля формы редактирования категории",
      );

    const file = iconInput.files?.[0] || null;
    if (
      !validateCategoryRedactForm(nameInput.value, file, descInput.value, form)
    )
      return console.warn("Ошибка валидации данных редактируемой категории");

    const body = new FormData();
    body.append("name", nameInput.value);
    if (file) body.append("icon", file);
    body.append("description", descInput.value);

    const { ok, status } = await apiFetch(`/categories/edit`, {
      method: "POST",
      body,
    });
    if (!ok) {
      if (status === 400)
        this.inputField.setError(
          [nameInput, iconInput, descInput],
          true,
          "Некорректные данные при редактировании категории",
        );
      else if (status === 409)
        this.inputField.setError(
          [nameInput],
          true,
          "Категория с таким именем уже существует",
        );
      else setServerEditCategoryError();
      return;
    }
  }
}
