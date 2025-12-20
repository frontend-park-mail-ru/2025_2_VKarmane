import Handlebars from "handlebars";
import AddBudgets from "../../templates/components/AddBudget.hbs?raw";
import {apiFetch} from "../../api/fetchWrapper.js";
import {convertToISO} from "../../utils/helpers.js";
import {router} from "../../router.js";

export class AddBudget {
    private template: Handlebars.TemplateDelegate;
    private container: HTMLElement;
    constructor(container: HTMLElement) {
        this.container = container;
        this.template = Handlebars.compile(AddBudgets);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }

    setEvents(): void {
        const closePopupBudgets = this.container.querySelector<HTMLElement>("#close-btn-budget");
        if (!closePopupBudgets) return;

        const form = this.container.querySelector<HTMLFormElement>("#categoryForm");
        if (!form) return;

        closePopupBudgets.addEventListener("click", () => {
            const popupBudgets =
                this.container.querySelector<HTMLElement>("#budjetsPopup");
            if (popupBudgets) {
                popupBudgets.style.display = "none";
            }
        });


        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const dateInput = form.querySelector<HTMLInputElement>('input[type="date"]').value;
            const sumInput = form.querySelector<HTMLInputElement>('input[type="text"]').value;

            if (!dateInput || !sumInput) return;

            const data = {
                period_end: new Date(String(dateInput)),
                sum: Number(sumInput),
                period_start: new Date().toISOString(),
                created_at: new Date().toISOString(),
            };

            const { ok, error } = await apiFetch(`/budgets`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            if (ok) {
                router.navigate("/");
                return;
            }
            console.log(error);
        });
    }


}
