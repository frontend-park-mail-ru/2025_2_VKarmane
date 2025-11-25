import Handlebars from "handlebars";
import SearchingWithFilters from "../../templates/components/SeachingWithFilters.hbs?raw";
import {apiFetch} from "../../api/fetchWrapper.js";

export class SearchByFilters {
    private template: Handlebars.TemplateDelegate;
private allOperations: Transaction[] = [];
private categoriesList: any[] = [];
private transactionsComponent: any = null;

constructor(
    operations: Transaction[],
    categoriesComponent: CategoriesList,
    transactions: TransactionsList
) {
    this.allOperations = operations;
    this.categoriesList = categoriesComponent; // если нужно, передаем сразу список
    this.transactionsComponent = transactions;
    this.template = Handlebars.compile(SearchingWithFilters);
}

getSelf() {
    return this.template();
}

setEvents(container: HTMLElement) {
    this.setupFilterPopup(container);
    this.setEvnetsList();
}

    async setEvnetsList() {
        const categoriesOrError = await this.getCategories();
        if (categoriesOrError instanceof Error) throw categoriesOrError;

        const selectCategory = document.getElementById("find-operation-category");
        if (!selectCategory) throw new Error("no category select element");

        selectCategory.innerHTML = '<option value="" disabled selected>Сфера услуг</option>';

        const ctgs = categoriesOrError.categories || [];
        console.log("Categories to add:", ctgs);

        for (const ctg of ctgs) {
            console.log("Adding:", ctg);
            const option = document.createElement("option");
            option.value = String(ctg.id);
            option.textContent = ctg.name;
            selectCategory.appendChild(option);
        }
    }


public setData(operations: Transaction[], categories: any[]) {
    this.allOperations = operations;
    this.categoriesList = categories;
    console.log("Categories set:", categories);
    console.log("Categories set:", this.categoriesList);
}

setupFilterPopup(container: HTMLElement) {
    console.log("ОПА:");
    const openBtn = container.querySelector('.filter-btn') as HTMLElement;
    const popup = document.getElementById('filterPopup') as HTMLElement;
    const closeBtn = document.getElementById('closeFilterPopup') as HTMLElement;

    const step1 = document.getElementById('filterStep1') as HTMLElement;
    const step2 = document.getElementById('filterStep2') as HTMLElement;
    const stepIndicator = document.getElementById('filterStepIndicator') as HTMLElement;

    const operationsBox = document.getElementById('filterOperationsBox') as HTMLElement;
    const nextBtn = document.getElementById('filterNextBtn') as HTMLElement;
    const prevBtn = document.getElementById('filterPrevBtn') as HTMLElement;

    const selectCategory = document.getElementById("find-operation-category") as HTMLSelectElement;
    if (!selectCategory) throw new Error("no category select element");


    openBtn.addEventListener('click', () => {
        popup.style.display = "block";
        step1.style.display = "block";
        step2.style.display = "none";
        stepIndicator.textContent = "1 / 2";
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = "none";
    });

    nextBtn.addEventListener('click', () => {
        const selectedCategoryTexts = Array.from(selectCategory.selectedOptions)
            .map(o => o.textContent?.trim() || "");

        if (selectedCategoryTexts.length === 0) return;

        const filtered = this.allOperations.filter(op =>
            selectedCategoryTexts.includes(op.CategoryName)
        );

        console.log("Selected texts:", selectedCategoryTexts);
        console.log("Filtered operations:", filtered.map(op => op.CategoryName));

        operationsBox.innerHTML = this.transactionsComponent.getCards(filtered);

        step1.style.display = "none";
        step2.style.display = "block";
        stepIndicator.textContent = "2 / 2";
    });


    prevBtn.addEventListener('click', () => {
        step2.style.display = "none";
        step1.style.display = "block";
        stepIndicator.textContent = "1 / 2";
    });
}

    private async getCategories() {
        const { ok, data, error } = await apiFetch("/categories", {
            method: "GET",
        });
        if (ok) {
            return data;
        }
        console.error(error);
        return error;
    }
}
