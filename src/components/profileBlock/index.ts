import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import profileBlock from "../../templates/components/ProfileBlock.hbs?raw";
import { router } from "../../router.js";

export class ProfileBlock {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(profileBlock);
  }
  getSelf(userName: string, userId: number, logo: string): string {
    return this.template({
      user_name: userName,
      user_id: userId,
      avatar: logo ? logo : "/imgs/empty_avatar.png",
    });
  }
  setEvents(): void {
    const profileBlock = document.getElementById("profileBlock");
    profileBlock?.addEventListener("click", () => {
      router.navigate("/profile");
    });
  }
}
