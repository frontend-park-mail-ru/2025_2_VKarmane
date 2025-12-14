import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import planBalTemplate from "../../templates/components/PlanBalance.hbs?raw";
import {router} from "../../router.js";
import {document} from "postcss";
import {apiFetch} from "../../api/fetchWrapper.js";

export class PlanBal {
  template: TemplateFn;
  private container: HTMLElement;
    constructor(container: HTMLElement) {
        this.container = container;
    this.template = Handlebars.compile(planBalTemplate);

  }
  getSelf(PlanSum: number, PlanDate : string, PlanID: string ): string {
    if (PlanSum === 0) {
      return this.template({
        is_empty: true,
      });
    }
    return this.template({
      PlanSum: this.shortNumber(PlanSum),
        PlanDate: this.formatDate(PlanDate),
        PlanID: PlanID,
      is_empty: false,
    });
  }
    shortNumber(num: number) {
        const format = new Intl.NumberFormat('ru-RU');

        if (num >= 1_000_000)
            return Math.round(num / 100_000) / 10 + " млн.";

        if (num >= 100_000)
            return Math.round(num / 100) / 10 + " тыc.";

        return format.format(num);
    }

    formatDate(dateString: string): string {
        if (!dateString) return "";

        const date = new Date(dateString);

        if (isNaN(date.getTime())) return "";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }


    setEvents(): void {
        const planButton = this.container.querySelector<HTMLElement>("#PlanBttn");
        const editButton = this.container.querySelector<HTMLElement>(".edit-btn");
        const delButton = this.container.querySelector<HTMLElement>(".delete-btn");
        const settingsBlock = this.container.querySelector('#plan-settings');
        const popup = this.container.querySelector('#plan-settings-popup');



        if (planButton){
            planButton.addEventListener("click", () => {
                const popupBudgets =
                    this.container.querySelector<HTMLElement>("#budjetsPopup");
                if (popupBudgets) {
                    popupBudgets.style.display = "flex";
                }
            });
        }

        if (settingsBlock && popup) {
            settingsBlock.addEventListener('click', (event) => {
                event.stopPropagation();
                popup.classList.toggle('show');
            });

            popup.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            this.container.addEventListener('click', () => {
                popup.classList.remove('show');
            });
        }

        if(editButton){
            editButton.addEventListener("click", () => {
                const popupBudgetsEdit =
                    this.container.querySelector<HTMLElement>("#budjetsPopupEdit");
                if (popupBudgetsEdit) {
                    popupBudgetsEdit.style.display = "flex";
                }
            })
        }

        if(delButton){
            delButton.addEventListener("click", async () => {
                const id_budget = this.container.querySelector<HTMLElement>(".PlanID").textContent;
                console.log(id_budget);
                const { ok, error } = await apiFetch(`/budgets/${id_budget}`, {
                    method: "DELETE",
                });
                if (ok) {
                    router.navigate("/");
                } else {
                    console.log("Ошибка при удалении данных:", error);
                }
            })
        }







    }

    }
