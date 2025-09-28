import { FactBal } from "../../components/Fact_Bal";
import { Card } from "../../components/cards";
import { PlanBal } from "../../components/Plan_Bal";
import { Menu } from "../../components/menu";
import { Add } from "../../components/add";
import { Operations } from "../../components/operations";
import {AddCard} from "../../components/addCard";
import {getBudgets, getBalance} from "../../api";
import { config, goToPage } from "../../index.js";


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
                    budgetsData?.budgets?.[0]?.actual ?? 0,
                    100,
                    120,
                ),
                cards: card.getSelf(
                    balanceData?.accounts?.[0]?.balance ?? 0,
                    true,
                    32323,
                    1523,
                    "Развлечения"
                ),
                PlanBal: planBal.getSelf(budgetsData?.budegts?.[0]?.amount ?? 0),
                menu: menu.getSelf(),
                Add: add.getSelf(),
                operations: operations.getList([]),
                addCard: addCard.getSelf(),
            };

            container.innerHTML = template(data);
        } catch (err) {
            console.error(err);
            goToPage(config.login)
        }
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
                console.error("Error happend: ", err);
            }
        })

    }
}



