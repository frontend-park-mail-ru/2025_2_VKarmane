import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import menuTemplate from "../../templates/components/menu.hbs?raw";
import router from "../../index.js";
export class Menu {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(menuTemplate);
  }
  getSelf(): string {
    return this.template({});
  }
  setEvents(): void {
    const profileButton = document.getElementById("profile")
    profileButton?.addEventListener("click", () => {
      router.navigate("/profile")
    })
  }
}
