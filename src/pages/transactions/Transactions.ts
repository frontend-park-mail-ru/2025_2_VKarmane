import Handlebars from "handlebars";
import TransactionsTemplate from "../../templates/pages/transactions.hbs?raw";
import { Menu } from "../../components/menu/index.js";
import { AddOperation } from "../../components/addTransactions/index.js";
import { AddCategory } from "../../components/addCategory/index.js";
import { TransactionsList } from "../../components/OperationCardWindow/index.js";
import { CategoriesList } from "../../components/CaregoryCardWindow/index.js";

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

declare global {
    interface Window {
        openPopup: () => void;
        closePopup: () => void;
        openCategoryPopup: () => void;
        closeCategoryPopup: () => void;
    }
}


export class TransactionsPage {
    private template: Handlebars.TemplateDelegate;
    private menu: Menu;
    private addOperations: AddOperation;
    private addCategory: AddCategory;
    private transactions: TransactionsList;
    private categories: CategoriesList;

    constructor() {
        this.template = Handlebars.compile(TransactionsTemplate);
        this.menu = new Menu();
        this.addOperations = new AddOperation(this.closePopup.bind(this), this.handleOperationTypeChange.bind(this));
        this.addCategory = new AddCategory();

        window.openPopup = this.openPopup.bind(this);
        window.closePopup = this.closePopup.bind(this);
        window.openCategoryPopup = this.openCategoryPopup.bind(this);
        window.closeCategoryPopup = this.closeCategoryPopup.bind(this);
        this.transactions = new TransactionsList();
        this.categories = new CategoriesList();
    }

    async render(container: HTMLElement | null) : Promise<void> {
        if (!container) throw new Error("Container element not found!");
        document.body.classList.remove("hide-scroller");

        const dataTransactions: Transaction[] = [
            {
                OrganizationTitle: "1212",
                CategoryName: "1212",
                OperationPrice: "1212",
                OperationTime: "121232",
            },
            {
                OrganizationTitle: "1212",
                CategoryName: "1212",
                OperationPrice: "1212",
                OperationTime: "121232",
            },
        ];

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

        const data = {
            menu: this.menu.getSelf(),
            addOperations: this.addOperations.getSelf(),
            addCategories: this.addCategory.getSelf(),
            transactions: this.transactions.getList(dataTransactions),
            categories: this.categories.getList(dataCategories),
        };

        container.innerHTML = this.template(data);
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
        const selectedType = (document.getElementById("operationType") as HTMLSelectElement)?.value;

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

    openCategoryPopup(): void {
        const popup = document.getElementById("categoryPopup");
        if (popup) popup.style.display = "flex";
    }

    closeCategoryPopup(): void {
        const popup = document.getElementById("categoryPopup");
        if (popup) popup.style.display = "none";
    }

    private addEventListeners(): void {
        const openBtn = document.querySelector<HTMLButtonElement>("#openPopupBtn");
        const closeBtn = document.querySelector<HTMLButtonElement>("#closePopupBtn");
        const openCategoryBtn = document.querySelector<HTMLButtonElement>("#openCategoryBtn");
        const closeCategoryBtn = document.querySelector<HTMLButtonElement>("#closeCategoryBtn");

        openBtn?.addEventListener("click", () => this.openPopup());
        closeBtn?.addEventListener("click", () => this.closePopup());
        openCategoryBtn?.addEventListener("click", () => this.openCategoryPopup());
        closeCategoryBtn?.addEventListener("click", () => this.closeCategoryPopup());

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
    }
}
