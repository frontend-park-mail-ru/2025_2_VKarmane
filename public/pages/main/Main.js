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
        const template = Handlebars.templates["main"];
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
                    budgetsData.budgets[0].actual,
                    2323232,
                    budgetsData.budgets[0].updated,
                ),
                cards: card.getSelf(
                    balanceData.accounts[0].balance,
                    true,
                    32323,
                    1523,
                    "Развлечения"
                ),
                PlanBal: planBal.getSelf(budgetsData.budgets[0].amount),
                menu: menu.getSelf(),
                Add: add.getSelf(),
                operations: operations.getList([]),
                addCard: addCard.getSelf(),
            };

            container.innerHTML = template(data);
            const logout = document.querySelector(".logout");
            logout.addEventListener("click", async () => {
                try {
                    const response = await fetch("http://217.16.23.67:8080/api/v1/auth/logout", {
                        method: "POST",
                        credentials: "include"
                    });

                    const data = await response.json();

                    if (!data.message === "\"Logged out successfully\"") {
                        window.location.href = "/login";
                    } else{
                        console.error("Error happend: ", data.message);
                    }
                } catch (err){
                    console.error("Error happened: ", err);
                }
            })
        } catch (err) {
            console.error(err);
            container.innerHTML = `<p style="color:red">Ошибка загрузки данных</p>`;
        }


    }
}



