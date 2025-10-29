import { Validator } from "../../utils/validation.js";
import { InputField } from "../../components/inputField/index.js";

const inputField = new InputField();

export function validateField(
  fieldName: string,
  fieldValue: string | File | null,
  inputElem: HTMLInputElement | HTMLSelectElement,
): boolean {
  const validator = new Validator();
  const error = validator.validate(fieldName, fieldValue as any);

  if (error !== undefined) {
    inputField.setError([inputElem as HTMLInputElement], true, error);
    return false;
  } else {
    inputField.setError([inputElem as HTMLInputElement], false, "");
    inputElem.classList.remove("border-red");
    inputElem.classList.add("border-grey");
    return true;
  }
}

export function validateOperationField(
  fieldName: string,
  fieldValue: string | File | null,
  inputElem: HTMLInputElement | HTMLSelectElement,
) {
  const validator = new Validator();
  const error = validator.validate(fieldName, fieldValue as any);

  if (error !== undefined) {
    inputField.setError([inputElem as HTMLInputElement], true, error);
    return false;
  } else {
    inputField.setError([inputElem as HTMLInputElement], false, "");
    inputElem.classList.remove("border-red");
    inputElem.classList.add("border-grey");
    return true;
  }
}

export function validateCategoryForm(
  categoryName: string,
  categoryIcon: File | null,
  categoryDescription: string,
  form: HTMLFormElement,
) {
  const validator = new Validator();

  const checkField = (
    fieldName: string,
    fieldValue: string | File | null,
    inputElem: HTMLInputElement | HTMLSelectElement,
  ) => {
    const error = validator.validate(fieldName, fieldValue as any);
    if (error !== undefined) {
      inputField.setError([inputElem as HTMLInputElement], true, error);
      return false;
    }
    return true;
  };

  const nameInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Название категории (обяз.)"]',
  );
  const iconInput = form.querySelector<HTMLInputElement>("#categoryIcon");
  const descInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Описание категории (необяз.)"]',
  );

  if (!nameInput || !iconInput || !descInput) return false;

  return (
    checkField("categoryName", categoryName, nameInput) &&
    (categoryIcon
      ? checkField("categoryIcon", categoryIcon, iconInput)
      : true) &&
    checkField("categoryDescription", categoryDescription, descInput)
  );
}

export function validateCategoryRedactForm(
  categoryName: string,
  categoryIcon: File | null,
  categoryDescription: string,
  form: HTMLFormElement,
) {
  const validator = new Validator();

  const checkField = (
    fieldName: string,
    fieldValue: string | File | null,
    inputElem: HTMLInputElement | HTMLSelectElement,
  ) => {
    const error = validator.validate(fieldName, fieldValue as any);
    if (error !== undefined) {
      inputField.setError([inputElem as HTMLInputElement], true, error);
      return false;
    }
    return true;
  };

  const nameInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Название категории (обяз.)"]',
  );
  const iconInput = form.querySelector<HTMLInputElement>("#editCategoryIcon");
  const descInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Описание категории (необяз.)"]',
  );

  if (!nameInput || !iconInput || !descInput) return false;

  return (
    checkField("categoryName", categoryName, nameInput) &&
    (categoryIcon
      ? checkField("categoryIcon", categoryIcon, iconInput)
      : true) &&
    checkField("categoryDescription", categoryDescription, descInput)
  );
}

export function getOperationInputs(form: HTMLFormElement) {
  const costInput = form.querySelector<HTMLInputElement>('input[name="cost"]');
  const operationTypeInput = form.querySelector<HTMLSelectElement>(
    'select[name="operationType"]',
  );
  const operationDateInput = form.querySelector<HTMLInputElement>(
    'input[name="operationDate"]',
  );
  const commentInput = form.querySelector<HTMLInputElement>(
    'input[name="comment"]',
  );
  const accountInput = form.querySelector<HTMLSelectElement>(
    'select[name="account"]',
  );
  const categoryInput = form.querySelector<HTMLSelectElement>(
    'select[name="category"]',
  );

  if (
    !costInput ||
    !operationTypeInput ||
    !operationDateInput ||
    !commentInput ||
    !accountInput
  )
    throw new Error("Не удалось найти все поля формы операции");

  return [
    costInput,
    operationTypeInput,
    operationDateInput,
    commentInput,
    accountInput,
    categoryInput,
  ];
}

export function getEditOperationInputs(
  form: HTMLFormElement,
): (HTMLInputElement | HTMLSelectElement | string | null)[] {
  const costInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Стоимость (обяз.)"]',
  );
  const operationDateInput =
    form.querySelector<HTMLInputElement>('input[type="date"]');
  // const categoryInput = form.querySelector<HTMLSelectElement>("#editCategory");
  // const organizationInput = form.querySelector<HTMLInputElement>('input[placeholder="Наименование организации"]');
  const commentInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Комментарий к операции (необяз.)"]',
  );
  const transaction_id = form.dataset.transactionId ?? null;
  console.log(form.dataset);
  const account_id = form.dataset.accountId ?? null;

  if (!costInput || !operationDateInput || !commentInput) {
    throw new Error(
      "Один или несколько инпутов формы редактирования операции не найдены",
    );
  }

  return [
    costInput,
    operationDateInput,
    commentInput,
    transaction_id,
    account_id,
  ];
}

export function getCategoryInputs(
  form: HTMLFormElement,
): (HTMLInputElement | HTMLSelectElement)[] {
  const nameInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Название категории (обяз.)"]',
  );
  const iconInput = form.querySelector<HTMLInputElement>(
    'input[type="file"]#categoryIcon',
  );
  const descriptionInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Описание категории (необяз.)"]',
  );

  if (!nameInput || !iconInput || !descriptionInput)
    throw new Error("Один или несколько инпутов формы категории не найдены");

  return [nameInput, iconInput, descriptionInput];
}

export function getEditCategoryInputs(
  form: HTMLFormElement,
): (HTMLInputElement | HTMLSelectElement)[] {
  const nameInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Название категории (обяз.)"]',
  );
  const iconInput = form.querySelector<HTMLInputElement>(
    'input[type="file"]#editCategoryIcon',
  );
  const descriptionInput = form.querySelector<HTMLInputElement>(
    'input[placeholder="Описание категории (необяз.)"]',
  );

  if (!nameInput || !iconInput || !descriptionInput)
    throw new Error(
      "Один или несколько инпутов формы редактирования категории не найдены",
    );

  return [nameInput, iconInput, descriptionInput];
}

export function setInputsError(
  input: HTMLInputElement | HTMLInputElement[],
  text_error: string,
  to_color: boolean = true,
): void {
  const arr = Array.isArray(input) ? input : [input];
  inputField.setError(arr, to_color, text_error);
}

export function setServerCreateOperError(): void {
  const form = document.querySelector<HTMLFormElement>(".create-oper-form");
  if (!form) return;
  const inputs = getOperationInputs(form).at(-1);
  if (!inputs) return;
  setInputsError(
    inputs,
    "При создании операции произошла ошибка. Повторите попытку позже",
    false,
  );
}

export function setServerEditOperError(): void {
  const form = document.querySelector<HTMLFormElement>("#editPopup form");
  if (!form) return;
  const inputs = getEditOperationInputs(form).at(-1);
  if (!inputs) return;
  setInputsError(
    inputs,
    "При редактировании операции произошла ошибка. Повторите попытку позже",
    false,
  );
}

export function setServerCreateCategoryError(): void {
  const form = document.querySelector<HTMLFormElement>(".create-category-form");
  if (!form) return;
  const inputs = form.querySelector<HTMLInputElement>(
    'input[placeholder="Название категории (обяз.)"]',
  );
  if (!inputs) return;
  setInputsError(
    inputs,
    "При создании категории произошла ошибка. Повторите попытку позже",
    false,
  );
}

export function setServerEditCategoryError(): void {
  const form = document.querySelector<HTMLFormElement>(
    "#categoryEditPopup form",
  );
  if (!form) return;
  const inputs = form.querySelector<HTMLInputElement>(
    'input[placeholder="Название категории (обяз.)"]',
  );
  if (!inputs) return;
  setInputsError(
    inputs,
    "При редактировании категории произошла ошибка. Повторите попытку позже",
    false,
  );
}

export function validateOperationFormDohod(
  cost: string,
  operationType: string,
  operationDate: string,
  comment: string,
  account: string,
  form: HTMLFormElement,
) {
  const validator = new Validator();

  const checkField = (
    fieldName: string,
    fieldValue: string,
    inputElem: HTMLInputElement | HTMLSelectElement,
  ) => {
    const error = validator.validate(fieldName, fieldValue);
    if (error !== undefined) {
      inputField.setError([inputElem as HTMLInputElement], true, error);
      console.warn(error);
      return false;
    }
    return true;
  };

  const costInput = form.querySelector<HTMLInputElement>('input[name="cost"]');
  const typeInput = form.querySelector<HTMLInputElement | HTMLSelectElement>(
    '[name="operationType"]',
  );
  const dateInput = form.querySelector<HTMLInputElement>(
    'input[name="operationDate"]',
  );
  const commentInput = form.querySelector<HTMLInputElement>(
    'input[name="comment"]',
  );
  const accountInput = form.querySelector<HTMLInputElement | HTMLSelectElement>(
    'input[name="account"], select[name="account"]',
  );

  if (!costInput || !typeInput || !dateInput || !commentInput || !accountInput)
    return false;

  const formattedDate = operationDate
    ? operationDate.split("-").reverse().join(".")
    : "";

  return (
    checkField("cost", cost, costInput) &&
    checkField("operationType", operationType, typeInput) &&
    checkField("operationDate", formattedDate, dateInput) &&
    checkField("comment", comment, commentInput)
    // checkField("account", account, accountInput)
  );
}

export function validateOperationFormRashod(
  cost: string,
  operationType: string,
  operationDate: string,
  comment: string,
  account: string,
  categoryInput: string,
  form: HTMLFormElement,
) {
  const validator = new Validator();

  const checkField = (
    fieldName: string,
    fieldValue: string,
    inputElem: HTMLInputElement | HTMLSelectElement,
  ) => {
    const error = validator.validate(fieldName, fieldValue);
    if (error !== undefined) {
      inputField.setError([inputElem as HTMLInputElement], true, error);
      console.warn(error);
      return false;
    }
    return true;
  };

  const costInput = form.querySelector<HTMLInputElement>('input[name="cost"]');
  const typeInput = form.querySelector<HTMLInputElement | HTMLSelectElement>(
    '[name="operationType"]',
  );
  const dateInput = form.querySelector<HTMLInputElement>(
    'input[name="operationDate"]',
  );
  const commentInput = form.querySelector<HTMLInputElement>(
    'input[name="comment"]',
  );
  const accountInput = form.querySelector<HTMLInputElement | HTMLSelectElement>(
    'input[name="account"], select[name="account"]',
  );
  const categorieInput = form.querySelector<
    HTMLInputElement | HTMLSelectElement
  >(".select-category");

  if (
    !costInput ||
    !typeInput ||
    !dateInput ||
    !commentInput ||
    !accountInput ||
    categorieInput
  )
    return false;

  // Преобразуем дату к нужному формату, если нужно
  const formattedDate = operationDate
    ? operationDate.split("-").reverse().join(".")
    : "";

  return (
    checkField("cost", cost, costInput) &&
    checkField("operationType", operationType, typeInput) &&
    checkField("operationDate", formattedDate, dateInput) &&
    checkField("comment", comment, commentInput) &&
    checkField("account", account, accountInput)
    // checkField("comment", categoryInput, categorieInput)
  );
}

export function validateOperationRedactForm(
  cost: string,
  operationDate: string,
  comment: string,
  form: HTMLFormElement,
) {
  const validator = new Validator();

  const checkField = (
    fieldName: string,
    fieldValue: string,
    inputElem: HTMLInputElement | HTMLSelectElement,
  ) => {
    const error = validator.validate(fieldName, fieldValue);
    if (error !== undefined) {
      inputField.setError([inputElem as HTMLInputElement], true, error);
      return false;
    }
    return true;
  };

  const costInput = form.querySelector<HTMLInputElement>('input[name="cost"]');
  const dateInput = form.querySelector<HTMLInputElement>(
    'input[name="operationDate"]',
  );
  const commentInput = form.querySelector<HTMLInputElement>(
    'input[name="comment"]',
  );

  if (!costInput || !dateInput || !commentInput) return false;

  const formattedDate = operationDate
    ? operationDate.split("-").reverse().join(".")
    : "";

  return (
    checkField("cost", cost, costInput) &&
    checkField("operationDate", formattedDate, dateInput) &&
    checkField("comment", comment, commentInput)
  );
}
