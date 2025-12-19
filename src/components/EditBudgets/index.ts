import Handlebars from "handlebars";
import editBudget from "../../templates/components/EditBudgets.hbs?raw";
import {apiFetch} from "../../api/fetchWrapper.js";
import {convertToISO} from "../../utils/helpers.js";
import {router} from "../../router.js";

export class EditBudget {
    private template: Handlebars.TemplateDelegate;
    private container: HTMLElement;
    constructor(container: HTMLElement) {
        this.container = container;
        this.template = Handlebars.compile(editBudget);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }

    setEvents(): void {
        const closePopupBudgets = this.container.querySelector<HTMLElement>("#close-btn-budget-edit");
        if (!closePopupBudgets) return;
        let id_budget = 0;
        const form = this.container.querySelector<HTMLFormElement>("#BudgetEditForm");
        if (!form) return;



        closePopupBudgets.addEventListener("click", () => {
            const popupBudgets = this.container.querySelector<HTMLElement>("#budjetsPopupEdit");
            if (popupBudgets) {
                popupBudgets.style.display = "none"; // Закрываем попап
            }
        });



        async function loadBudgetData() {
            const { ok, data, error } = await apiFetch(`/budgets`, {
                method: "GET"
            });


            if (ok && data) {
                const dateInput = form.querySelector<HTMLInputElement>('input[type="date"]');
                const sumInput = form.querySelector<HTMLInputElement>('input[type="text"]');
                if (data.budgets.length > 0) {
                    if (dateInput && data.budgets[0].period_end) {
                        const date = new Date(data.budgets[0].period_end);
                        const formattedDate = date.toISOString().split('T')[0];
                        dateInput.value = formattedDate;
                    }

                    if (sumInput && data.budgets[0].sum) {
                        sumInput.value = String(data.budgets[0].sum);
                    }
                    id_budget = data.budgets[0].id;
                } else {
                }
                }
        }

        loadBudgetData();

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const dateInput = form.querySelector<HTMLInputElement>('input[type="date"]').value;
            const sumInput = form.querySelector<HTMLInputElement>('input[type="text"]').value;


            const data = {
                period_end: new Date(dateInput),
                sum: Number(sumInput),
            };

            const { ok, error } = await apiFetch(`/budgets/${id_budget}`, {
                method: "PUT",
                body: JSON.stringify(data),
            });

            if (ok) {
                router.navigate("/");
            } else {
            }
        });




    }



}
