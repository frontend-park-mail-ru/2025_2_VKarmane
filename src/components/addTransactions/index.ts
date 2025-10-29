import Handlebars from "handlebars";
import AddOperTemplate from "../../templates/components/addOperForm.hbs?raw";
import { InputField } from "../inputField/index.js";
import type { TemplateFn } from "../../types/handlebars.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { convertToISO } from "../../utils/helpers.js";
import { router } from "../../router.js";
import { Validator } from "../../utils/validation.js";

declare global {
  interface Window {
    handleOperationTypeChange?: () => void;
  }
}

export class AddOperation {
  #Type: Record<string, string> = {
    Доход: "income",
    Расход: "expense",
  };
  inputField: InputField;
  template: TemplateFn;

  constructor(
    ClosePopupCallback: () => void,
    handleOperationTypeChange: () => void,
  ) {
    this.template = Handlebars.compile(AddOperTemplate);
    this.inputField = new InputField();
    window.closePopup = ClosePopupCallback.bind(this);
    window.handleOperationTypeChange = handleOperationTypeChange.bind(this);
  }

  getSelf(): string {
    return this.template({
      sumInput: this.inputField.getSelf("text", "sum", "Стоимость (обяз.)"),
    });
  }

  setEventListeners(): void {
    const form = document.getElementById(
      "add-operation-form",
    ) as HTMLFormElement;
    if (!form) return;

    const sumInput = document.querySelector(".input-field") as HTMLInputElement;
    if (!sumInput) throw new Error("no sum input element");

    sumInput.addEventListener("input", () => {
      this.validateSingleField("sum", sumInput.value, sumInput);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const validator = new Validator();
      const sumError = validator.validate("sum", sumInput.value);
      if (sumError) {
        this.inputField.setError([sumInput], true, sumError);
        return;
      }
      const { cost, type, date, comment, account, category, receiver } =
        this.getValuesFromForm();
      const { ok, error } = await apiFetch(`/account/${account}/operations`, {
        method: "POST",
        body: JSON.stringify({
          account_id: Number(account),
          category_id: Number(category),
          receiver_id: receiver,
          sum: Number(cost),
          name: "Operation",
          type: type,
          description: comment,
          created_at: convertToISO(date),
        }),
      });
      if (ok) {
        router.navigate("/transactions");
        return;
      }
      console.log(error);
    });
  }

  getValuesFromForm() {
    const costInput = document.querySelector(
      ".input-field",
    ) as HTMLInputElement;
    const typeSelect = document.getElementById(
      "operationType",
    ) as HTMLSelectElement;
    const dateInput = document.getElementById(
      "create-operation-date",
    ) as HTMLInputElement;
    const commentInput = document.querySelector(
      'input[placeholder="Комментарий к операции (необяз.)"]',
    ) as HTMLInputElement;
    const accountSelect = document.getElementById(
      "create-operation-account-num",
    ) as HTMLSelectElement;
    const categorySelect = document.getElementById(
      "create-operation-category",
    ) as HTMLSelectElement;

    const cost = costInput.value.trim();
    const type = typeSelect.value;
    const date = dateInput.value;
    const comment = commentInput?.value.trim() || "";
    const account = accountSelect.value;
    const category = categorySelect.value;

    //пока категорий на беке нет будет так
    // с именами организций пока нет бд не работаем
    const receiver = type === "expense" ? 1 : null;

    return {
      cost,
      type,
      date,
      comment,
      account,
      category,
      receiver,
    };
  }

  validateSingleField(
    fieldName: string,
    fieldValue: string,
    inputElem: HTMLInputElement,
  ) {
    const validator = new Validator();

    let error = validator.validate(fieldName, fieldValue);

    if (error !== undefined) {
      this.inputField.setError([inputElem], true, error);
      return false;
    } else {
      this.inputField.setError([inputElem], false, "");
      inputElem.classList.remove("border-red");
      inputElem.classList.add("border-grey");
      return true;
    }
  }
}
