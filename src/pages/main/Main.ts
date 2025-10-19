import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";
import { AddCard } from "../../components/addCard/index.js";
import { getBudgets, getBalance } from "../../api/index.js";
import { ProfileBlock } from "../../components/profileBlock/index.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { AddOperation } from "../../components/addTransactions/index.js";
import {router} from "../../router.js";
import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import mainTemplate from "../../templates/pages/main.hbs?raw";
import { setBody, unsetBody } from "../../utils/bodySetters.js";

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
    addOperation: AddOperation;
    template: TemplateFn;
    constructor() {
        this.factBal = new FactBal();
        this.card = new Card();
        this.planBal = new PlanBal();
        this.menu = new Menu();
        this.add = new Add();
        this.operations = new Operations(this.openPopup);
        this.addOperation = new AddOperation(this.closePopup, this.handleOperationTypeChange);
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

            const data = {
                FactBal: this.factBal.getSelf(
                    budgetsData?.budgets?.[0]?.actual ?? 0,
                    100,
                    120,
                ),
                cards: this.card.getSelf(
                    balanceData?.accounts?.[0]?.balance ?? 0,
                    true,
                    32323,
                    1523,
                    "Развлечения",
                ),
                PlanBal: this.planBal.getSelf(budgetsData?.budgets?.[0]?.amount ?? 0),
                menu: this.menu.getSelf(),
                Add: this.add.getSelf(),
                operations: this.operations.getList([]),
                addCard: this.addCard.getSelf(),
                exist_card: true,
                profile_block: this.profileBlock.getSelf("aboba", 1111),
            };

      container.innerHTML = this.template(data);
      this.addEventListeners(); 
      this.setupEventListeners();
    } catch (err) {
      console.error(err);
      router.navigate("/login");
      unsetBody();
      return;
    }
    setBody();
  }
    openPopup():
        void {
        const popup = document.getElementById("popup");
        if(popup) popup.style.display = "flex";
    }

    closePopup():
        void {
        const popup = document.getElementById("popup");
        if(popup) popup.style.display = "none";
    }

    handleOperationTypeChange()
        :
        void {
        const select = document.getElementById("operationType") as HTMLSelectElement;
        if(!
            select
        )
            return;

        const selectedType = select.value;
        const incomeField = document.querySelector<HTMLElement>(".income-field");
        const expenseField = document.querySelector<HTMLElement>(".expense-field");

        if (incomeField) incomeField.classList.add("hidden");
        if (expenseField) expenseField.classList.add("hidden");

        if (selectedType === "income" && incomeField) incomeField.classList.remove("hidden");
        else if (selectedType === "expense" && expenseField) expenseField.classList.remove("hidden");
    }

    addEventListeners():
        void {
        const openBtn = document.querySelector<HTMLButtonElement>("#openPopupBtn");
        const closeBtn = document.querySelector<HTMLButtonElement>("#closePopupBtn");

        if(openBtn) openBtn.addEventListener("click", () => this.openPopup());
        if(closeBtn) closeBtn.addEventListener("click", () => this.closePopup());

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

  setupEventListeners() {
    this.menu.setEvents();
  }
}
