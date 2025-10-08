import Handlebars from "handlebars";
import type { TemplateFn } from "../../types/handlebars.js";
import profileBlock from "../../templates/components/ProfileBlock.hbs?raw";

export class ProfileBlock {
  template: TemplateFn;
  constructor() {
    this.template = Handlebars.compile(profileBlock);
  }
  getSelf(userName: string, userId: number): string {
    return this.template({
      user_name: userName,
      user_id: userId,
    });
  }
}