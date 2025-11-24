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

export class CardsPage {
    menu: Menu;
    template: TemplateFn;
    profileBlock: ProfileBlock;
    calendar: Calendar;
    AddBill: AddBills;
    cards: CardList;


    constructor() {
        this.menu = new Menu();
        this.template = Handlebars.compile(CardsTemplate);
        this.profileBlock = new ProfileBlock();
        this.calendar = new Calendar();
        this.AddBill = new AddBills();
        this.cards = new CardList();

    }

    async render(container: HTMLElement): Promise<void> {
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
        let operations = [];
        try {
            const allOps = await Promise.all(
                balanceData.accounts.map(async (acc) => {
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
            profile_block: this.profileBlock.getSelf(
                profileData.login || "User",
                profileData.id,
                profileData.logo,
            ),
            calendar: this.calendar.getSelf(operations),
            AddBill: this.AddBill.getSelf(),
            cards_list: this.cards.getList(card_list),
        });

        setBody();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.menu.setEvents();
        this.profileBlock.setEvents();
        setTimeout(() => {
            this.AddBill.setEvents();
            console.log("AddBill events set");
        }, 0);
    }

    private async loadAccounts() {
        try {
            const { ok, data, error } = await apiFetch("/accounts");
            if (ok) {
                return data.accounts || [];
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
            const accounts = await this.loadAccounts();
            if (!accounts || accounts.length === 0) {
                console.log("Нет доступных счетов");
                return [];
            }

            console.log("Загруженные счета:", accounts);

            const cards = accounts.map((account) => {
                return {
                    card_id: account.id,
                    card_balance: account.balance,
                    card_type: account.type,
                    card_created_at: account.created_at,
                };
            });

            console.log("Преобразованные карточки:", cards);
            return cards;

        } catch (err) {
            console.error("Ошибка при загрузке карточек:", err);
            return [];
        }
    }
}