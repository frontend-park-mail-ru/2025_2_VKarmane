import Handlebars from "handlebars";
import addPeople from "../../templates/components/AddPeople.hbs?raw";
import {apiFetch} from "../../api/fetchWrapper.js";
import {convertToISO} from "../../utils/helpers.js";
import {router} from "../../router.js";

export class AddPeople {
    private template: Handlebars.TemplateDelegate;
    private container: HTMLElement;
    constructor(container: HTMLElement) {
        this.container = container;
        this.template = Handlebars.compile(addPeople);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }

    setEvents(): void {
        this.container.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;

            const addPeopleBtn = target.closest("#btn-add-people") as HTMLElement;
            if (!addPeopleBtn) return;

            const cardId = addPeopleBtn.dataset.cardId;
            if (cardId) {

                const popupAddPeople = this.container.querySelector("#AddPeoplePopup");
                if (popupAddPeople) {
                    popupAddPeople.style.display = "flex";
                    popupAddPeople.setAttribute("data-card-id", cardId);  // Передаем ID в popup
                }
            }
        });

        const closePeoplePopupBtn = this.container.querySelector("#close-btn-add-people");
        if (closePeoplePopupBtn) {
            closePeoplePopupBtn.addEventListener("click", () => {
                const popupAddPeople = this.container.querySelector("#AddPeoplePopup");
                if (popupAddPeople) {
                    popupAddPeople.style.display = "none";
                }
            });
        }

        const form = this.container.querySelector("#AddPeopleForm") as HTMLFormElement;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const popup = this.container.querySelector("#AddPeoplePopup") as HTMLElement;
            const accountId = popup.dataset.cardId;  // Используем cardId из popup

            if (!accountId) {
                console.error("account_id не найден");
                return;
            }

            const formData = new FormData(form);
            const login = formData.get("planSum");

            const body = {
                account_id: Number(accountId),
                user_login: login,
            };

            try {
                const ok = await apiFetch("/accounts/add", {
                    method: "POST",
                    body: JSON.stringify(body),
                });

                if (ok){
                    router.navigate("/cards");
                }
            } catch (e) {
                console.error("Ошибка добавления пользователя", e);
            }
        });
    }


}
