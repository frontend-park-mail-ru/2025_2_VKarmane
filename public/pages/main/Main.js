import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";
import {AddCard} from "../../components/addCard/index.js";

export class MainPage {
    render(container) {
        if (!container) throw new Error("Container element not found!");

        const template = Handlebars.templates["main"];
        const factBal = new FactBal();
        const card = new Card();
        const planBal = new PlanBal();
        const menu = new Menu();
        const add = new Add();
        const operations = new Operations();
        const addCard = new AddCard();

        const operationsData = [
            {title_oper: "Яндекс Доставка", category_oper: "Еда и напитки", price_oper: 850, time_oper: "Сегодня в 18.26", image_oper: "../../static/imgs/yandex.png" },
            {title_oper: "Spotify", category_oper: "Подписки", price_oper: 1092, time_oper: "Сегодня в 10.43", image_oper: "'../../static/imgs/spotify.png"},
            {title_oper: "Spotify", category_oper: "Подписки", price_oper: 1092, time_oper: "Сегодня в 8.43", image_oper: "../../static/imgs/kinopoisk.png"} ,
            {title_oper: "Газпром", category_oper: "Бензин", price_oper: 2392, time_oper: "Сегодня в 17.52", image_oper: "../../static/imgs/gasprom.png"}];


        console.log(operationsData);

        const data = {
            FactBal: factBal.getSelf(1522442, 2424424, 42442),
            cards: card.getSelf(1522442, true, 32323, 1523, "Развлечения"),
            PlanBal: planBal.getSelf(365432),
            menu: menu.getSelf(),
            Add: add.getSelf(),
            operations: operations.getList(operationsData),
            addCard: addCard.getSelf(),
        };

        console.log( operationsData.length > 0 );

        container.innerHTML = template(data);
    }
}
