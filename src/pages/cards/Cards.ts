import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import CardsTemplate from "../../templates/pages/Cards.hbs?raw";
import { Menu } from "../../components/menu/index.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { setBody } from "../../utils/bodySetters.js";
import { router } from "../../router.js";
import {ProfileBlock} from "../../components/profileBlock/index.js";
import { Calendar } from "../../components/calendar/index.js";
import {getBalance} from "../../api/index.js";
import {AddBills} from "../../components/addBills/index.js";
import {CardList} from "../../components/card_list/index.js";
import {EditBill} from "../../components/EditBill/index.js";
import {AddPeople} from "../../components/addPeople/index.js";

export class CardsPage {
    menu: Menu;
    template: TemplateFn;
    profileBlock: ProfileBlock;
    calendar: Calendar;
    AddBill: AddBills;
    cards: CardList;
    EditBill : EditBill;
    addPeople : AddPeople;


    constructor() {
        this.menu = new Menu();
        this.template = Handlebars.compile(CardsTemplate);
        this.profileBlock = new ProfileBlock();
        this.calendar = new Calendar();
        this.AddBill = new AddBills();
        this.cards = new CardList();
        this.EditBill = new EditBill();


    }

    async render(container: HTMLElement): Promise<void> {
        this.addPeople = new AddPeople(container);
        if (!container) throw new Error("Container element not found!");

        const { ok, status, data: profileData } = await apiFetch("/profile");
        if (!ok) {
            if (status === 401) {
                router.navigate("/login");
                return;
            }
            throw new Error("Failed to get user profile");
        }

        const card_list = await this.loadCards();

        const balanceData = await getBalance();

        let accounts = await this.loadAccounts();

        let operations = [];
        try {
            const allOps = await Promise.all(
                balanceData.accounts.accounts.map(async (acc) => {
                    const { ok, data, error, status } = await apiFetch(
                        `/account/${acc.id}/operations`,
                    );
                    if (!ok) {
                        console.error("Ошибка получения операций:", error);
                        if (status !== 403) router.navigate("/login");
                        return [];
                    }
                    return data.operations.map((op) => ({
                        sum: op.sum,
                        date: op.date,
                    }));
                }),
            );
            operations = allOps.flat();
        } catch {
            operations = [];
        }

        container.innerHTML = this.template({
            menu: this.menu.getSelf(),
            budgets: this.shortNumber(accounts.total_sum),
            profile_block: this.profileBlock.getSelf(
                profileData.login || "User",
                profileData.id,
                profileData.logo,
            ),
            calendar: this.calendar.getSelf(operations),
            AddBill: this.AddBill.getSelf(),
            EditBill : this.EditBill.getSelf(),
            cards_list: this.cards.getList(card_list),
            addPeople: this.addPeople.getSelf(),
        });

        setBody();
        this.setupEventListeners();
    }


    setupEventListeners() {
        this.menu.setEvents();
        this.profileBlock.setEvents();
        this.AddBill.setEvents();
        this.EditBill.setEvents();
        this.addPeople.setEvents();
        this.setupCardDelegation()
    }


    private setupCardDelegation() {
        const container = document.querySelector('.cards__list');


        // общий контейнер карточек
        if (!container) return;

        container.addEventListener('click', async (e) => {
            let target = e.target as HTMLElement | null;
            if (!target) return;

            if (target.closest('.kebab-btn-card')) {
                const menu = target.closest('.kebab-card-menu')?.querySelector<HTMLElement>('.popup-menu-cards');
                if (!menu) return;
                const isVisible = menu.classList.contains('show');
                container.querySelectorAll<HTMLElement>('.popup-menu-cards').forEach(m => m.classList.remove('show'));
                if (!isVisible) menu.classList.add('show');
                return;
            }

            const deleteBtn = target.closest('.card-del');
            if (deleteBtn) {
                const card = deleteBtn.closest('.cards__item');
                if (!card) return;
                const cardID = card.querySelector('.cards__title')?.textContent
                    ?.replace('ID Счета: ', '')
                    ?.trim();
                console.log(cardID);
                if (!cardID) return;

                const { ok, error } = await apiFetch(`/account/${cardID}`, { method: 'DELETE' });
                if (ok) router.navigate('/cards');
                else console.error(error);
                return;
            }

            const editBtn = target.closest('.card-edi');
            if (editBtn) {
                const card = editBtn.closest('.cards__item');
                if (!card) return;
                this.EditBill.openPopup(card);
                return;
            }
        });
    }



    private async loadAccounts() {
        try {
            const { ok, data, error } = await apiFetch("/accounts");
            if (ok) {
                return {"accounts" : data.accounts, "total_sum": data.total_sum };
            }
            console.error("Ошибка загрузки счетов:", error);
            return [];
        } catch (err) {
            console.error("Ошибка при загрузке счетов:", err);
            return [];
        }
    }



    private async loadCards() {
        try {
            let accs = await this.loadAccounts();
            const accounts = accs.accounts;
            if (!accounts || accounts.length === 0) {
                console.log("Нет доступных счетов");
                return [];
            }

            console.log("Загруженные счета:", accounts);

            const cards = accounts.map((account) => {
                let isJoints = account.type !== "private";

                return {
                    card_id: account.id,
                    card_balance: this.shortNumber(account.balance),
                    card_type: (account.type === "private" ? "Личный" : "Совместный"),
                    card_created_at: this.formatDate(account.created_at),
                    isJoint : isJoints,
                };
            });

            console.log("Преобразованные карточки:", cards);
            return cards;

        } catch (err) {
            console.error("Ошибка при загрузке карточек:", err);
            return [];
        }
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

    private shortNumber(num: number) {
        const format = new Intl.NumberFormat('ru-RU');

        if (num >= 1_000_000)
            return Math.round(num / 100_000) / 10 + " млн.";

        if (num >= 100_000)
            return Math.round(num / 100) / 10 + " тыc.";

        return format.format(num);
    }



}