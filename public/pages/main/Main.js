import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";

export class MainPage {
    render(container) {
        if (!container) {
            throw new Error("Container element not found!");
        }

        const template = Handlebars.templates["main"];
        const factBal = new FactBal();
        const card = new Card();
        const planBal = new PlanBal();
        const menu = new Menu();
        const add = new Add();
        const operations = new Operations();

        const data = {
            FactBal: factBal.getSelf(1522442, 2424424, 42442),
            cards: card.getSelf(1522442, true, 32323),
            PlanBal: planBal.getSelf(365432),
            menu: menu.getSelf(),
            Add: add.getSelf(),
            operations: operations.getSelf(),
        };

        container.innerHTML = template(data);
    }
}


