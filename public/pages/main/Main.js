import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";
import {AddCard} from "../../components/addCard/index.js";
import {getBudgets, getBalance} from "../../../api/index.js";

export class MainPage {
    async render(container) {
        if (!container) throw new Error("Container element not found!");

        const template = Handlebars.templates["main"];

        // Компоненты
        const factBal = new FactBal();
        const card = new Card();
        const planBal = new PlanBal();
        const menu = new Menu();
        const add = new Add();
        const operations = new Operations();
        const addCard = new AddCard();

        try {
            const balanceData = await getBalance();
            const budgetsData = await getBudgets();

            const data = {
                FactBal: factBal.getSelf(
                    budgetsData[0].actual,
                    budgetsData[0].updated,
                    balanceData[0].prevBalance
                ),
                cards: card.getSelf(
                    balanceData.accounts[0].balance,
                    true,
                    32323,
                    1523,
                    "Развлечения"
                ),
                PlanBal: planBal.getSelf(budgetsData[0].amount),
                menu: menu.getSelf(),
                Add: add.getSelf(),
                operations: operations.getList([]),
                addCard: addCard.getSelf(),
            };

            container.innerHTML = template(data);
        } catch (err) {
            console.error(err);
            container.innerHTML = `<p style="color:red">Ошибка загрузки данных</p>`;
        }
    }
}



