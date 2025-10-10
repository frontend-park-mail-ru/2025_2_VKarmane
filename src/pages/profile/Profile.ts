import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import profileTemplate from "../../templates/pages/Profile.hbs?raw";
import { Menu } from "../../components/menu/index.js";
import { Calendar } from "../../components/calendar/index.js";

export class ProfilePage {
  menu: Menu;
  calendar: Calendar;
  template: TemplateFn;

  constructor() {
    this.menu = new Menu();
    this.calendar = new Calendar();
    this.template = Handlebars.compile(profileTemplate);
  }

  render(container: HTMLElement): void {
    container.innerHTML = this.template({
      menu: this.menu.getSelf(),
      calendar: this.calendar.getSelf(),
      name: "",
      date: "22.02.2222",
      login: "shrek",
      mail: "qwerty@ya.ru"
    });
  }
}
