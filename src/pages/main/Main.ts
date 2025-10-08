import { FactBal } from "../../components/Fact_Bal/index.js";
import { Card } from "../../components/cards/index.js";
import { PlanBal } from "../../components/Plan_Bal/index.js";
import { Menu } from "../../components/menu/index.js";
import { Add } from "../../components/add/index.js";
import { Operations } from "../../components/operations/index.js";
import { AddCard } from "../../components/addCard/index.js";
import { getBudgets, getBalance } from "../../api/index.js";
import { ProfileBlock } from "../../components/profileBlock/index.js";
import { config, goToPage } from "../../index.js";
import { apiFetch } from "../../api/fetchWrapper.js";

import  router from "../../index.js"
import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import mainTemplate from "../../templates/pages/main.hbs?raw";


/**
 * Класс главной страницы приложения
 * @class
 */
export class MainPage {
  factBal: FactBal;
  card: Card;
  planBal: PlanBal;
  menu: Menu;
  add: Add;
  operations: Operations;
  addCard: AddCard;
  profileBlock :ProfileBlock;
  template: TemplateFn;
  constructor() {
    this.factBal = new FactBal();
    this.card = new Card();
    this.planBal = new PlanBal();
    this.menu = new Menu();
    this.add = new Add();
    this.operations = new Operations();
    this.addCard = new AddCard();
    this.profileBlock = new ProfileBlock();
    this.template = Handlebars.compile(mainTemplate);
  }
  /**
   * Рендерит главную страницу в контейнер
   * @param {HTMLElement} container - Контейнер для рендеринга
   * @returns {Promise<void>}
   * @async
   */
  async render(container: HTMLElement): Promise<void> {
    if (!container) throw new Error("Container element not found!");
    document.body.classList.remove("hide-scroller");

    try {
      const balanceData = await getBalance();
      const budgetsData = await getBudgets();

      const cards =
        balanceData.accounts.length !== 0
          ? balanceData.accounts.map((account: Record<string, any>) =>
              this.card.getSelf(
                account.balance,
                true,
                32323,
                1523,
                "Развлечения",
              ),
            )
          : [this.card.getSelf(null, true, 0, 0, "Нет счетов")];

      const data = {
        FactBal: this.factBal.getSelf(
          budgetsData.budgets.length !== 0
            ? budgetsData.budgets[0].amount
            : null,
          100,
          120,
        ),
        cards: cards,
        PlanBal: this.planBal.getSelf(
          budgetsData.budgets.length !== 0
            ? budgetsData.budgets[0].actual
            : null,
        ),
        menu: this.menu.getSelf(),
        Add: this.add.getSelf(),
        operations: this.operations.getList([]),
        addCard: this.addCard.getSelf(),
        exist_card: true,
        profile_block: this.profileBlock.getSelf("aboba", 1111)
      };

      container.innerHTML = this.template(data);

    } catch (err) {
      console.error(err);
      // goToPage(config.login!);
      router.navigate("/login")
      this.unsetBody();
      return;
    }
    const logout = document.querySelector(".logout");
    if (!logout) return;
    logout.addEventListener("click", async () => {
      const { ok } = await apiFetch(`/auth/logout`, {
        method: "POST",
      });

      if (ok) {
        router.navigate("/login")
        this.unsetBody();
        return;
      }
    });
    this.setBody();
  }

  setBody() {
    document.body.classList.remove("hide-scroller");
    document.body.classList.add("body_background");
  }
  unsetBody(): void {
    document.body.classList.add("hide-scroller");
    document.body.classList.remove("body_background");
  }
}
