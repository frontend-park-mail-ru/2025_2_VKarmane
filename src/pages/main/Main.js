import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";
import { AddCard } from "../../components/addCard/index.js";
import { getBudgets, getBalance } from "../../api/index.js";
import { config, goToPage } from "../../index.js";
import { apiFetch } from "../../api/fetchWrapper.js";

import Handlebars from "handlebars";
import mainTemplate from "../../templates/pages/main.hbs?raw";

/**
 * Класс главной страницы приложения
 * @class
 */
export class MainPage {
  constructor() {
    this.factBal = new FactBal();
    this.card = new Card();
    this.planBal = new PlanBal();
    this.menu = new Menu();
    this.add = new Add();
    this.operations = new Operations();
    this.addCard = new AddCard();
    this.template = Handlebars.compile(mainTemplate);
  }
  /**
   * Рендерит главную страницу в контейнер
   * @param {HTMLElement} container - Контейнер для рендеринга
   * @returns {Promise<void>}
   * @async
   */
  async render(container) {
    if (!container) throw new Error("Container element not found!");
    document.body.classList.remove("hide-scroller");

    try {
      const balanceData = await getBalance();
      const budgetsData = await getBudgets();

      const data = {
        FactBal: this.factBal.getSelf(
          budgetsData?.budgets?.[0]?.actual ?? 0,
          100,
          120,
        ),
        cards: this.card.getSelf(
          balanceData?.accounts?.[0]?.balance ?? 0,
          true,
          32323,
          1523,
          "Развлечения",
        ),
        PlanBal: this.planBal.getSelf(budgetsData?.budgets?.[0]?.amount ?? 0),
        menu: this.menu.getSelf(),
        Add: this.add.getSelf(),
        operations: this.operations.getList([]),
        addCard: this.addCard.getSelf(),
      };

      container.innerHTML = this.template(data);
    } catch (err) {
      console.error(err);
      goToPage(config.login);
      this.unsetBody();
      return;
    }
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", async () => {
      const { ok } = await apiFetch(`/auth/logout`, {
        method: "POST",
      });

      if (ok) {
        goToPage(config.login);
        this.setBody();
        return;
      }
    });
    this.setBody();
  }

  setBody() {
    document.body.classList.remove("hide-scroller");
    document.body.classList.add("body_background");
  }
  unsetBody() {
    document.body.classList.add("hide-scroller");
    document.body.style.margin = "0px";
    document.body.style.backgroundColor = "";
  }
}
