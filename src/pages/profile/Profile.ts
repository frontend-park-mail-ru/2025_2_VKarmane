import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import profileTemplate from "../../templates/pages/Profile.hbs?raw";
import { Menu } from "../../components/menu/index.js";
import { Calendar } from "../../components/calendar/index.js";
import { apiFetch } from "../../api/fetchWrapper.js";

export class ProfilePage {
  menu: Menu;
  calendar: Calendar;
  template: TemplateFn;

  constructor() {
    this.menu = new Menu();
    this.calendar = new Calendar();
    this.template = Handlebars.compile(profileTemplate);
  }

  async render(container: HTMLElement) {
    const { ok, data } = await apiFetch(`/profile`, {
      method: "GET",
    });
    if (!ok) {
      console.log("error");
      return;
    }
    container.innerHTML = this.template({
      menu: this.menu.getSelf(),
      calendar: this.calendar.getSelf(),
      name: data.FirstName + " " + data.LastName,
      date:  (new Date(data.CreatedAt).toLocaleDateString("ru-RU")),
      login: data.Login,
      mail: data.Email
    });
  }
}
