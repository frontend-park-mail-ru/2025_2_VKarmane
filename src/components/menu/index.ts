import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import menuTemplate from "../../templates/components/menu.hbs?raw";
import { router } from "../../router.js";
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

    const transactionButton = document.getElementById("transaction");
    transactionButton?.addEventListener("click", () => {
      router.navigate("/transactions");
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
    const mainButton = document.getElementById("mainButtn");
    if (!mainButton) return;
    mainButton.addEventListener("click", () => {
      router.navigate("/");
    });

      router.on('afterRouteLoad', () => {
          this.setActiveMenuButton();
      });
      this.setActiveMenuButton();
  }
    private setActiveMenuButton(): void {
        const currentPath = router.getCurrentPath();
        console.log('Setting active menu button for path:', currentPath);

        let page = 'main';
        if (currentPath.includes('/profile')) {
            page = 'profile';
        } else if (currentPath.includes('/cards')) {
            page = 'cards';
        } else if (currentPath.includes('/transactions')) {
            page = 'transactions';
        }

        const activeButton = document.querySelector(`button[data-page="${page}"]`);

        if (activeButton) {
            document.querySelectorAll('button[data-page]').forEach(btn => {
                btn.classList.remove('active');
            });
            activeButton.classList.add('active');
            console.log('Active menu button set to:', page);
        }
    }
}
