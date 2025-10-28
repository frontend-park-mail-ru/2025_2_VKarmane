import Handlebars from "handlebars";
import TransactionsTemplate from "../../templates/pages/transactions.hbs?raw";
import { Menu } from "../../components/menu/index.js";
import { AddOperation } from "../../components/addTransactions/index.js";
import { AddCategory } from "../../components/addCategory/index.js";
import { TransactionsList } from "../../components/OperationCardWindow/index.js";
import { CategoriesList } from "../../components/CaregoryCardWindow/index.js";
import {ProfileBlock} from "../../components/profileBlock/index.js";
import {redactOpers} from "../../components/redactOpers/index.js"
import {RedactCategory} from "../../components/redactCategory/index.js";
import { InputField } from "../../components/inputField/index.js";
import {
   addEventListeners
} from "../transactions/events.js";



import {
    validateField,
    validateOperationForm,
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
    validateOperationField, setServerCreateOperError
} from "../transactions/validationForForms.js";


import {openPopup, openEditPopup, closeEditPopup, closePopup, formatDateForInput} from "../transactions/operations.js"
import {closeCategoryPopup, openCategoryPopup, openEditCategoryPopup, closeEditCategoryPopup} from "./categories.js";
import {setBody} from "../../utils/bodySetters.js";

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
        }) => void;
        closeEditPopup: () => void;
        openEditCategoryPopup:  () => void;
        closeEditCategoryPopup:  () => void;
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
        this.addOperations = new AddOperation(closePopup.bind(this), this.handleOperationTypeChange.bind(this));
        this.addCategory = new AddCategory();
        this.RedactCategory = new RedactCategory();
        this.inputField = new InputField();



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
        this.redactOpers = new redactOpers(closeEditPopup.bind(this), this.handleOperationTypeChange.bind(this));

    }

    async render(container: HTMLElement | null): Promise<void> {
        if (!container) throw new Error("Container element not found!");
        document.body.classList.remove("hide-scroller");

        // пока нет ручек для работы с аккаунтами
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
                    return [];
                }

                return data.operations.map((operation: OperationFromBackend) => ({
                    OrganizationTitle: "Мок",
                    CategoryName: `Категория ${operation.category_id}`,
                    OperationPrice: operation.sum,
                    OperationTime: new Date(operation.date).toLocaleDateString("ru-RU"),
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

        const data = {
            menu: this.menu.getSelf(),
            addOperations: this.addOperations.getSelf(),
            addCategories: this.addCategory.getSelf(),
            transactions: this.transactions.getList(operations),
            categories: this.categories.getList(dataCategories),
            profile_block: this.profileBlock.getSelf("aboba", 1111),
        };

        container.innerHTML = this.template(data);
        setBody();
        addEventListeners(this);
        this.setupEventListeners(container);
    }

    setupEventListeners(container: HTMLElement): void {
        this.menu.setEvents();
        this.profileBlock.setEvents();
        const form: HTMLFormElement | null = container.querySelector("#create-oper-form");
        if (!form) return;
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleOperationRequest(form);
            });
        }

        const form2: HTMLFormElement | null = container.querySelector("#editPopup form");
        if (!form2) return;
        form2.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleOperationRedactRequest(form2);
        });

        const createCategoryForm: HTMLFormElement | null = container.querySelector("#editCategoryForm");
        if (createCategoryForm) {
            createCategoryForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleCategoryRequest(createCategoryForm);
            });
        } else {
            console.warn("Форма создания категории (#create-category-form) не найдена при инициализации");
        }

        const editCategoryForm: HTMLFormElement | null = container.querySelector("#categoryEditPopup");
        if (editCategoryForm) {
            editCategoryForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleCategoryRedactRequest(editCategoryForm);
            });
        } else {
            console.warn("Форма редактирования категории (#categoryEditPopup form) не найдена при инициализации");
        }




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

        async handleOperationRedactRequest(form: HTMLFormElement): Promise<void> {const [
            costInput,
            operationTypeInput,
            operationDateInput,
            commentInput,
            accountInput,
        ] = getEditOperationInputs(form);

            if (
                !costInput ||
                !operationTypeInput ||
                !operationDateInput ||
                !commentInput ||
                !accountInput
            ) {
                console.error("Не удалось найти все поля формы операции");
                return;
            }

            const isValid = validateOperationRedactForm(
                costInput.value,
                operationTypeInput.value,
                operationDateInput.value,
                commentInput.value,
                accountInput.value,
                form
            );

            if (!isValid) {
                console.warn("Ошибка валидации данных операции");
                return;
            }
            const body = {
                cost: parseFloat(costInput.value),
                type: operationTypeInput.value,
                date: operationDateInput.value,
                comment: commentInput.value,
                account: accountInput.value,
            };
            const { ok, status } = await apiFetch(`/operations/new`, {
                method: "POST",
                body: JSON.stringify(body),
            });

            if (!ok) {
                if (status === 400) {
                    this.inputField.setError(
                        [costInput, operationTypeInput, operationDateInput, commentInput, accountInput],
                        true,
                        "Некорректные данные операции"
                    );
                } else if (status === 409) {
                    this.inputField.setError(
                        [commentInput],
                        true,
                        "Такая операция уже существует"
                    );
                } else if (status === 500) {
                    setServerEditOperError();
                } else {
                    setServerEditOperError();
                }
                return;
            }
        }


    async handleOperationRequest(form: HTMLFormElement): Promise<void> {
        const [
            costInput,
            operationTypeInput,
            operationDateInput,
            commentInput,
            accountInput,
            categoryInput,
            receiverInput,
            nameInput,
        ] = getOperationInputs(form);

        if (
            !costInput ||
            !operationTypeInput ||
            !operationDateInput ||
            !commentInput ||
            !accountInput ||
            !categoryInput ||
            !nameInput
        ) {
            console.error("Не удалось найти все необходимые поля формы операции");
            return;
        }

        const isValid = validateOperationForm(
            costInput.value,
            operationTypeInput.value,
            operationDateInput.value,
            commentInput.value,
            accountInput.value,
            form
        );

        if (!isValid) {
            console.warn("Ошибка валидации данных операции");
            return;
        }

        const accountId = parseInt(accountInput.value, 10);
        const categoryId = parseInt(categoryInput.value, 10);
        const receiverId = receiverInput?.value ? parseInt(receiverInput.value, 10) : undefined;

        const body = {
            account_id: accountId,
            category_id: categoryId,
            receiver_id: receiverId,
            sum: parseFloat(costInput.value),
            name: nameInput.value.trim(),
            type: operationTypeInput.value,
            description: commentInput.value.trim() || "",
            created_at: new Date(operationDateInput.value).toISOString(),
        };

        try {
            const { ok, status } = await apiFetch(`/api/v1/account/${accountId}/operations`, {
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
                            nameInput,
                        ],
                        true,
                        "Некорректные данные операции"
                    );
                } else if (status === 409) {
                    this.inputField.setError([nameInput], true, "Такая операция уже существует");
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
    }

    async handleCategoryRequest(form: HTMLFormElement): Promise<void> {
            const nameInput = form.querySelector<HTMLInputElement>(
                'input[placeholder="Название категории (обяз.)"]'
            );
            const typeInput = form.querySelector<HTMLSelectElement>('#categoryType');
            const iconInput = form.querySelector<HTMLInputElement>('#categoryIcon');
            const descInput = form.querySelector<HTMLInputElement>(
                'input[placeholder="Описание категории (необяз.)"]'
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
                form
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
                        "Некорректные данные категории"
                    );
                } else if (status === 409) {
                    this.inputField.setError([nameInput], true, "Такая категория уже существует");
                } else {
                    setServerCreateCategoryError();
                }
                return;
            }
        }


        async handleCategoryRedactRequest(form: HTMLFormElement): Promise<void> {
            const nameInput = form.querySelector<HTMLInputElement>(
                'input[placeholder="Название категории (обяз.)"]'
            );
            const typeInput = form.querySelector<HTMLSelectElement>('#editCategoryType');
            const iconInput = form.querySelector<HTMLInputElement>('#editCategoryIcon');
            const descInput = form.querySelector<HTMLInputElement>(
                'input[placeholder="Описание категории (необяз.)"]'
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
                form
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
                        "Некорректные данные при редактировании категории"
                    );
                } else if (status === 409) {
                    this.inputField.setError([nameInput], true, "Категория с таким именем уже существует");
                } else {
                    setServerEditCategoryError();
                }
                return;
            }
        }








}
