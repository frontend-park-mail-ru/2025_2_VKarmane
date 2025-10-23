import type { TemplateFn } from "../../types/handlebars.js";
import Handlebars from "handlebars";
import profileTemplate from "../../templates/pages/Profile.hbs?raw";
import { Menu } from "../../components/menu/index.js";
import { Calendar } from "../../components/calendar/index.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { setBody } from "../../utils/bodySetters.js";
import { EditProfile } from "../../components/editProfile/index.js";

export class ProfilePage {
  menu: Menu;
  calendar: Calendar;
  editProfile: EditProfile;
  template: TemplateFn;

  constructor() {
    this.menu = new Menu();
    this.calendar = new Calendar();
    this.editProfile = new EditProfile(this.closePopup.bind(this));
    this.template = Handlebars.compile(profileTemplate);
    window.openPopup = this.openPopup.bind(this);
    window.closePopup = this.closePopup.bind(this);
  }

  async render(container: HTMLElement): Promise<void> {
    if (!container) throw new Error("Container element not found!");
    document.body.classList.remove("hide-scroller");
    console.log("abb");
    const { ok, data } = await apiFetch(`/profile`, {
      method: "GET",
    });
    if (!ok) {
      console.log("error");
      return;
    }
    const name =
      data.first_name + data.last_name
        ? data.first_name + " " + data.last_name
        : "";
    container.innerHTML = this.template({
      menu: this.menu.getSelf(),
      calendar: this.calendar.getSelf(),
      name: name,
      date: new Date(data.created_at).toLocaleDateString("ru-RU"),
      login: data.login,
      mail: data.email,
      editProfile: this.editProfile.getSelf(name, data.email),
    });
    setBody();
    this.setupEventListeners();
  }
  setupEventListeners() {
    this.menu.setEvents();
    const openBtn = document.getElementById("open-profile-edit-btn");
    const closeBtn =
      document.querySelector<HTMLButtonElement>("#closePopupBtn");
    if (openBtn) openBtn.addEventListener("click", () => this.openPopup());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closePopup());
    this.menu.setEvents();
    this.editProfile.setEvents();
  }

  openPopup(): void {
    console.log("aaaa");
    const popup = document.getElementById("popup");
    console.log(popup);
    if (popup) popup.style.display = "flex";
  }

  closePopup(): void {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "none";
  }
}
