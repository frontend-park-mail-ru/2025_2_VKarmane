import Handlebars from "handlebars";

import type { TemplateFn } from "../../types/handlebars.js";
import menuTemplate from "../../templates/components/menu.hbs?raw";
import { router } from "../../index.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { unsetBody } from "../../utils/bodySetters.js";

export class Menu {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(menuTemplate);
  }
  getSelf(): string {
    return this.template({});
  }
  setEvents(): void {
    const profileButton = document.getElementById("profile");
    profileButton?.addEventListener("click", () => {
      router.navigate("/profile");
    });

    const logout = document.querySelector(".logout");
    if (!logout) return;
    logout.addEventListener("click", async () => {
      const { ok } = await apiFetch(`/auth/logout`, {
        method: "POST",
      });

      if (ok) {
        router.navigate("/login");
        unsetBody();
        return;
      }
    });

    const mainButton = document.getElementById("main");
    if (!mainButton) return;
    mainButton.addEventListener("click", () => {
      router.navigate("/");
    });
  }
}
