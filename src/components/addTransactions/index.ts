import Handlebars from "handlebars";
import AddOperTemplate from "../../templates/components/addOperForm.hbs?raw";
import { apiFetch } from "../../api/fetchWrapper.js";
import { convertToISO } from "../../utils/helpers.js";
import { router } from "../../router.js";

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
  template: Handlebars.TemplateDelegate;

  constructor(
    ClosePopupCallback: () => void,
    handleOperationTypeChange: () => void,
  ) {
    this.template = Handlebars.compile(AddOperTemplate);
    window.closePopup = ClosePopupCallback.bind(this);
    window.handleOperationTypeChange = handleOperationTypeChange.bind(this);
  }

  getSelf(): Handlebars.TemplateDelegate {
    return this.template;
  }

  setEventListeners(): void {
    const form = document.getElementById(
      "add-operation-form",
    ) as HTMLFormElement;
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
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
    const costInput = document.getElementById(
      "create-operation-name",
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
}
