// src/pages/main/index.js
import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";
import { AddCard } from "../../components/addCard/index.js";
import { ProfileBlock } from "../../components/profileBlock/index.js";
import { AddOperation } from "../../components/addTransactions/index.js";
import { InputField } from "../../components/inputField/index.js";
import Handlebars from "handlebars";
import mainTemplate from "../../templates/pages/main.hbs?raw";
import { MainActions } from "./actions.js";
import { mainStore, type MainPageState } from "./store.js";
import { setBody } from "../../utils/bodySetters.js";
import {
  getOperationInputs,
  validateOperationFormRashod,
  validateOperationFormDohod,
} from "../transactions/validationForForms.js";
import { setServerCreateOperError } from "../transactions/validationForForms.js";
import type { TemplateFn } from "../../types/handlebars.js";

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
  inputField: InputField;
  template: TemplateFn;

  constructor() {
    this.factBal = new FactBal();
    this.card = new Card();
    this.planBal = new PlanBal();
    this.menu = new Menu();
    this.add = new Add();
    this.operations = new Operations(this.openPopup);
    this.addCard = new AddCard();
    this.profileBlock = new ProfileBlock();
    this.addOperations = new AddOperation(
      this.closePopup,
      this.handleOperationTypeChange,
      true,
    );
    this.inputField = new InputField();
    this.template = Handlebars.compile(mainTemplate);
  }

  async render(container: HTMLElement) {
    if (!container) throw new Error("Container not found");
    document.body.classList.remove("hide-scroller");

    mainStore.on("change", () => {
      this.#renderState(container, mainStore.getState());
    });

    await MainActions.loadData();
  }

  #renderState(container: HTMLElement, state: MainPageState) {
    const { balance, budgets, operations, profile } = state;

    if (!balance || !budgets || !profile) return;

    const logoMatch = profile?.logo_url?.match(/\/images\/[^?]+/);
    const logo = logoMatch
      ? `https://vkarmane.duckdns.org/test/${logoMatch[0]}`
      : "imgs/empty_avatar.png";

    const cards =
      balance.accounts.length !== 0
        ? balance.accounts.map((account) =>
            this.card.getSelf(
              account.id,
              account.balance,
              true,
              32323,
              1523,
              "Развлечения",
            ),
          )
        : [this.card.getSelf(0, null, true, 0, 0, "Нет счетов")];

    const data_ = {
      FactBal: this.factBal.getSelf(
        balance.accounts.length !== 0 ? balance.accounts[0].balance : 0,
        100,
        120,
      ),
      cards,
      PlanBal: this.planBal.getSelf(
        budgets.budgets.length !== 0 ? budgets.budgets[0].amount : 0,
      ),
      menu: this.menu.getSelf(),
      Add: this.add.getSelf(),
      operations: this.operations.getList(operations),
      addCard: this.addCard.getSelf(),
      exist_card: true,
      profile_block: this.profileBlock.getSelf(profile.login, profile.id, logo),
      addOperations: this.addOperations.getSelf(),
    };

    container.innerHTML = this.template(data_);
    this.setupEventListeners(container);
    setBody();
  }

  setupEventListeners(container: HTMLElement) {
    this.menu.setEvents();
    this.profileBlock.setEvents();
    this.addOperations.setEventListeners();

    const form = container.querySelector("#create-oper-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleOperationRequest(form);
      });
    }
  }

  openPopup() {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "flex";
  }

  closePopup() {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "none";
  }

  handleOperationTypeChange() {
    const select = document.getElementById("operationType");
    if (!select) return;
    const selectedType = select.value;
    const incomeField = document.querySelector(".income-field");
    const expenseField = document.querySelector(".expense-field");
    incomeField?.classList.add("hidden");
    expenseField?.classList.add("hidden");
    if (selectedType === "income") incomeField?.classList.remove("hidden");
    if (selectedType === "expense") expenseField?.classList.remove("hidden");
  }

  async handleOperationRequest(form) {
    const [
      costInput,
      operationTypeInput,
      operationDateInput,
      commentInput,
      accountInput,
      categoryInput,
      titleInput,
    ] = getOperationInputs(form);

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

    if (!isValidRashod && !isValidDohod) {
      console.warn("Ошибка валидации данных операции");
      return;
    }

    const body = {
      account_id: parseInt(accountInput.value, 10),
      category_id: parseInt(categoryInput.value, 10),
      sum: parseFloat(costInput.value),
      name: titleInput?.value || "no name",
      type: operationTypeInput.value,
      description: commentInput.value.trim() || "",
      created_at: new Date(operationDateInput.value).toISOString(),
    };

    try {
      MainActions.createOperation(body);
    } catch (error) {
      console.error("Ошибка при создании операции:", error);
      setServerCreateOperError();
    }
  }
}
