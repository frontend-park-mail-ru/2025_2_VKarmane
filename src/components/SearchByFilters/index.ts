import Handlebars from "handlebars";
import SearchingWithFilters from "../../templates/components/SeachingWithFilters.hbs?raw";
import { apiFetch } from "../../api/fetchWrapper.js";

export class SearchByFilters {
    private template: Handlebars.TemplateDelegate;
    private allOperations: Transaction[] = [];
    private categoriesList: any[] = [];
    private transactionsComponent: any = null;

    private selectedCategories: Set<number> = new Set();

    constructor(
        operations: Transaction[],
        categoriesItems: CategoriesArray,
        transactions: TransactionsList
    ) {
        this.allOperations = operations;
        this.categoriesList = categoriesItems || [];
        this.transactionsComponent = transactions;
        this.template = Handlebars.compile(SearchingWithFilters);
    }

    getSelf() {
        return this.template({
            categoriesItems: this.categoriesList
        });
    }

    setEvents(container: HTMLElement) {
        this.setupFilterPopup(container);
        this.populateCategorySelect(container);
        this.enableCategoriesMultiSelect(container);
        this.enableCategorySearch(container);

    }

    private populateCategorySelect(container: HTMLElement) {
        const selectCategory = container.querySelector("#find-operation-category") as HTMLSelectElement;
        if (!selectCategory) return;

        selectCategory.innerHTML = '<option value="" disabled selected>Сфера услуг</option>';

        this.categoriesList.forEach(category => {
            const option = document.createElement("option");
            option.value = String(category.id);
            option.textContent = category.name;
            selectCategory.appendChild(option);
        });
    }

    public setData(operations: Transaction[], categories: any[]) {
        this.allOperations = operations;
        this.categoriesList = categories;
        console.log("Categories set:", categories);
    }

    private enableCategoriesMultiSelect(container: HTMLElement) {
        const cards = container.querySelectorAll(".category-card") as NodeListOf<HTMLElement>;
        const tagsContainer = container.querySelector("#selectedTags") as HTMLElement;

        if (!cards) return;



        cards.forEach(card => {
            card.addEventListener("click", () => {
                const id = Number(card.getAttribute("data-id"));
                const name = card.getAttribute("data-name");

                if (!id) return;

                if (this.selectedCategories.has(id)) {
                    this.selectedCategories.delete(id);
                    card.classList.remove("selected");
                } else {
                    this.selectedCategories.add(id);
                    card.classList.add("selected");
                }

                this.renderSelectedCategoryTags(tagsContainer);
            });
        });

        tagsContainer?.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains("remove-tag")) return;

            const id = Number(target.dataset.id);
            if (!id) return;

            this.selectedCategories.delete(id);

            const card = container.querySelector(`.category-card[data-id="${id}"]`) as HTMLElement;
            card?.classList.remove("selected");

            this.renderSelectedCategoryTags(tagsContainer);
        });
    }

    private renderSelectedCategoryTags(container: HTMLElement) {
        container.innerHTML = "";

        this.selectedCategories.forEach(id => {
            const category = this.categoriesList.find(c => c.id === id);
            console.log(category);
            if (!category) return;

            const tag = document.createElement("div");
            tag.className = "tag";
            tag.innerHTML = `
                 <img src="${category.logo}" style="max-width: 30px; max-height: 30px" alt="" onerror="this.src='/imgs/default_transaction.svg'"/>
                ${category.name}
                <span class="remove-tag" data-id="${id}">×</span>
            `;

            container.appendChild(tag);
        });
    }

    private gatherFilterData(): any {
        const step1 = document.getElementById('filterStep1') as HTMLElement;

        const accountTypeBtn = step1.querySelector('#toggleType .toggle-option.active') as HTMLElement;
        const operationTypeBtn = step1.querySelector('#toggleOper .toggle-option.active') as HTMLElement;
        const dateInput = step1.querySelector('.date-input') as HTMLInputElement;


        let accountType = accountTypeBtn?.textContent?.trim() || '';
        if (accountType === 'Личный') accountType = 'private';
        else if (accountType === 'Совместный') accountType = 'shared';

        let operationType = operationTypeBtn?.textContent?.trim() || '';
        if (operationType === 'Доход') operationType = 'income';
        else if (operationType === 'Расход') operationType = 'expense';


        let category_ids = Number(Array.from(this.selectedCategories)[0])

        console.log(category_ids)

        const data = {
            account_type: accountType,
            operation: operationType,
            date: dateInput?.value || '',
            category_id: category_ids
        };

        return data;
    }

    private formatDate(dateString: string): string {
        if (!dateString) return "";

        const date = new Date(dateString);

        if (isNaN(date.getTime())) return "";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }





    private async loadAccounts() {
        try {
            const accounts = await apiFetch('/accounts', { method: 'GET' });
            console.log('Счета получены:', accounts);
            return accounts.data.accounts; // массив объектов счетов
        } catch (err) {
            console.error('Ошибка загрузки счетов', err);
            return [];
        }
    }

    private async submitFilters() {
        const data = this.gatherFilterData();
        const accounts = await this.loadAccounts();
        const matchingAccounts = accounts.filter(acc => acc.type === data.account_type);

        if (matchingAccounts.length === 0) {
            console.warn(`Нет счетов с типом "${data.account_type}"`);
            return [];
        }

        let collectedOperations: any[] = [];

        const requests = matchingAccounts.map(async (account) => {
            const queryParams = new URLSearchParams({
                ...data,
                account_id: account.id
            } as Record<string, string>).toString();

            try {
                const response = await apiFetch(`/account/${account.id}/operations?${queryParams}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                console.log(`Фильтры отправлены для счета ID=${account.id}`, response);

                if (response?.data?.operations) {
                    collectedOperations.push(...response.data.operations);
                }

            } catch (err) {
                console.error(`Ошибка при отправке фильтров для счета ID=${account.id}`, err);
            }
        });

        await Promise.all(requests);

        this.renderFilteredOperations(collectedOperations);
    }



    private renderFilteredOperations(operations: any[]) {
        const container = document.getElementById("operationsContainer");
        if (!container) return;

        container.innerHTML = "";

        if (operations.length === 0) {
            container.innerHTML = "<p>Нет операций по вашему запросу.</p>";
            return;
        }

        operations.forEach(op => {
            const item = document.createElement("div");
            item.className = "operations-item";

            item.innerHTML = `
            <div class="operation" style="display: flex">
                <img
                    class="operation_img"
                    src="${op.category_logo || '/imgs/default_transaction.svg'}"
                    onerror="this.src='/imgs/default_transaction.svg'"
                />
                <div class="title_with_category">
                    <div class="title_oper">${op.name}</div>
                    <div class="category_oper">${op.category_name}</div>
                </div>
                <div class="price_and_time">
                    <div class="price_oper">${op.sum}₽</div>
                    <div class="time_oper">${this.formatDate(op.date)}</div>
                </div>
            </div>
        `;

            container.appendChild(item);
        });
    }




    private enableCategorySearch(container: HTMLElement) {
        const searchInput = container.querySelector('#filterStep2 .search-box input') as HTMLInputElement;
        const list = container.querySelector('#filterStep2 .category-search-card') as HTMLElement;

        if (!searchInput || !list) {
            console.warn("Search input or list not found");
            return;
        }

        searchInput.addEventListener('input', () => {
            const value = searchInput.value.toLowerCase().trim();

            const cards = list.querySelectorAll('.category-card') as NodeListOf<HTMLElement>;

            cards.forEach(card => {
                const title = card.querySelector('.category-card-info-title');
                const name = title?.textContent?.toLowerCase() || "";

                card.style.display = name.includes(value) ? "" : "none";
            });
        });
    }


    setupFilterPopup(container: HTMLElement) {
        const step1 = document.getElementById('filterStep1') as HTMLElement;
        const step2 = document.getElementById('filterStep2') as HTMLElement;
        const step3 = document.getElementById('filterStep3') as HTMLElement;
        const stepIndicator = document.getElementById('filterStepIndicator') as HTMLElement;

        const step1NextBtn = step1.querySelector('#filterNextBtn') as HTMLElement;
        const step2NextBtn = step2.querySelector('#filterNextBtn') as HTMLElement;
        const prevBtn = document.getElementById('filterPrevBtn') as HTMLElement;
        const prevBtn2 = document.getElementById('filterPrevBtn2') as HTMLElement;

        const openBtn = container.querySelector('.filter-btn') as HTMLElement;
        const popup = document.getElementById('filterPopup') as HTMLElement;
        const closeBtn = document.getElementById('closeFilterPopup') as HTMLElement;

        const toggle_type = container.querySelector('#toggleType') as HTMLElement;
        const toggle_oper = container.querySelector('#toggleOper') as HTMLElement;

        // открытие/закрытие попапа
        openBtn.addEventListener('click', () => {
            popup.style.display = "block";
            step1.style.display = "block";
            step2.style.display = "none";
            step3.style.display = "none";
            stepIndicator.textContent = "1 / 3";
        });

        closeBtn.addEventListener('click', () => popup.style.display = "none");

        toggle_type.querySelectorAll('.toggle-option').forEach(btn => {
            btn.addEventListener('click', () => {
                toggle_type.querySelector('.toggle-option.active')?.classList.remove('active');
                btn.classList.add('active');
            });
        });

        toggle_oper.querySelectorAll('.toggle-option').forEach(btn => {
            btn.addEventListener('click', () => {
                toggle_oper.querySelector('.toggle-option.active')?.classList.remove('active');
                btn.classList.add('active');
            });
        });


        step1NextBtn.addEventListener('click', () => {
            step1.style.display = "none";
            step2.style.display = "block";
            step3.style.display = "none";
            stepIndicator.textContent = "2 / 3";
        });

        step2NextBtn.addEventListener('click', async () => {
            await this.submitFilters();
            step2.style.display = "none";
            step3.style.display = "block";
            stepIndicator.textContent = "3 / 3";
        });

        prevBtn.addEventListener('click', () => {
            step2.style.display = "none";
            step1.style.display = "block";
            stepIndicator.textContent = "1 / 3";
        });

        prevBtn2.addEventListener('click', () => {
            step3.style.display = "none";
            step2.style.display = "block";
            stepIndicator.textContent = "2 / 3";
        });
    }




}
