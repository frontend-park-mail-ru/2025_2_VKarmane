import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";
import { AddCard } from "../../components/addCard/index.js";
import {
  getBudgets,
  getBalance,
  getAllUserTransactionsByAccIDs,
} from "../../api/index.js";
import { ProfileBlock } from "../../components/profileBlock/index.js";
import { AddOperation } from "../../components/addTransactions/index.js";
import { router } from "../../router.js";
import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import mainTemplate from "../../templates/pages/main.hbs?raw";
import { setBody, unsetBody } from "../../utils/bodySetters.js";
import { InputField } from "../../components/inputField/index.js";
import { addEventListeners } from "../transactions/events.js";

import {
  getOperationInputs,
  setServerCreateOperError,
  validateOperationFormDohod,
  validateOperationFormRashod,
} from "../transactions/validationForForms.js";
import { apiFetch } from "../../api/fetchWrapper.js";

interface BalanceData {
  accounts?: { balance: number }[];
}

interface BudgetsData {
  budgets?: { actual: number; amount: number }[];
}

/**
 * Класс главной страницы приложения
 * @class
 */
export class MainPage {
  factBal: FactBal;
  card: Card;
  planBal: PlanBal;
  menu: Menu;
  add: Add;
  operations: Operations;
  addCard: AddCard;
  profileBlock: ProfileBlock;
  addOperations: AddOperation;
  template: TemplateFn;
  inputField: InputField;
  constructor() {
    this.factBal = new FactBal();
    this.card = new Card();
    this.planBal = new PlanBal();
    this.menu = new Menu();
    this.add = new Add();
    this.operations = new Operations(this.openPopup);
    this.addOperations = new AddOperation(
      this.closePopup,
      this.handleOperationTypeChange,
    );
    this.inputField = new InputField();
    this.addCard = new AddCard();
    this.profileBlock = new ProfileBlock();
    this.template = Handlebars.compile(mainTemplate);
  }
  /**
   * Рендерит главную страницу в контейнер
   * @param {HTMLElement} container - Контейнер для рендеринга
   * @returns {Promise<void>}
   * @async
   */
  async render(container: HTMLElement): Promise<void> {
    if (!container) throw new Error("Container element not found!");
    document.body.classList.remove("hide-scroller");

    try {
      const balanceData: BalanceData = await getBalance();
      const budgetsData: BudgetsData = await getBudgets();
      const { ok, data } = await apiFetch("/profile");
      if (!ok) throw new Error("failed to get user profile");

      if (!balanceData || !budgetsData)
        throw new Error("failed to get user data");

      const operations = await getAllUserTransactionsByAccIDs([1, 2]);
      const cards =
        balanceData.accounts.length !== 0
          ? balanceData.accounts.map((account: Record<string, any>) =>
              this.card.getSelf(
                account.balance,
                true,
                32323,
                1523,
                "Развлечения",
              ),
            )
          : [this.card.getSelf(null, true, 0, 0, "Нет счетов")];

      const data_ = {
        FactBal: this.factBal.getSelf(
          balanceData.accounts.length !== 0
            ? balanceData.accounts[0].balance
            : null,
          100,
          120,
        ),
        cards: cards,
        PlanBal: this.planBal.getSelf(
          budgetsData.budgets.length !== 0
            ? budgetsData.budgets[0].amount
            : null,
        ),
        menu: this.menu.getSelf(),
        Add: this.add.getSelf(),
        operations: this.operations.getList(operations),
        addCard: this.addCard.getSelf(),
        exist_card: true,
        profile_block: this.profileBlock.getSelf(data.login, data.user_id),
        addOperations: this.addOperations.getSelf(),
      };

      container.innerHTML = this.template(data_);
      this.setupEventListeners(container);
      addEventListeners(this);
    } catch (err) {
      console.error(err);
      router.navigate("/login");
      unsetBody();
      return;
    }
    setBody();
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

    this.addEventListeners();
  }
  openPopup(): void {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "flex";
  }

  closePopup(): void {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "none";
  }

  handleOperationTypeChange(): void {
    const select = document.getElementById(
      "operationType",
    ) as HTMLSelectElement;
    if (!select) return;

    const selectedType = select.value;
    const incomeField = document.querySelector<HTMLElement>(".income-field");
    const expenseField = document.querySelector<HTMLElement>(".expense-field");

    if (incomeField) incomeField.classList.add("hidden");
    if (expenseField) expenseField.classList.add("hidden");

    if (selectedType === "income" && incomeField)
      incomeField.classList.remove("hidden");
    else if (selectedType === "expense" && expenseField)
      expenseField.classList.remove("hidden");
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
    router.navigate("/");
  }

  addEventListeners(): void {
    const openBtn = document.querySelector<HTMLButtonElement>("#openPopupBtn");
    const closeBtn =
      document.querySelector<HTMLButtonElement>("#closePopupBtn");

    if (openBtn) openBtn.addEventListener("click", () => this.openPopup());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closePopup());

    document.body.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.type === "file" && target.id === "categoryIcon") {
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
  }
}
