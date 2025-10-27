import {Validator} from "../../utils/validation.js";
import { InputField } from "../../components/inputField/index.js";

const inputField = new InputField();

/**
 * Проверка одного поля.
 */

export function validateField(
    fieldName: string,
    fieldValue: string | File | null,
    inputElem: HTMLInputElement | HTMLSelectElement
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
    inputElem: HTMLInputElement | HTMLSelectElement
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

/**
 * Проверка формы создания категории.
 */
export function validateCategoryForm(
    categoryName: string,
    categoryIcon: File | null,
    categoryDescription: string,
    form: HTMLFormElement
) {
    const validator = new Validator();

    const checkField = (
        fieldName: string,
        fieldValue: string | File | null,
        inputElem: HTMLInputElement | HTMLSelectElement
    ) => {
        const error = validator.validate(fieldName, fieldValue as any);
        if (error !== undefined) {
            inputField.setError([inputElem as HTMLInputElement], true, error);
            return false;
        }
        return true;
    };

    const nameInput = form.querySelector<HTMLInputElement>('input[placeholder="Название категории (обяз.)"]');
    const iconInput = form.querySelector<HTMLInputElement>('#categoryIcon');
    const descInput = form.querySelector<HTMLInputElement>('input[placeholder="Описание категории (необяз.)"]');

    if (!nameInput || !iconInput || !descInput) return false;

    return (
        checkField("categoryName", categoryName, nameInput) &&
        (categoryIcon ? checkField("categoryIcon", categoryIcon, iconInput) : true) &&
        checkField("categoryDescription", categoryDescription, descInput)
    );
}

/**
 * Проверка формы редактирования категории.
 */
export function validateCategoryRedactForm(
    categoryName: string,
    categoryIcon: File | null,
    categoryDescription: string,
    form: HTMLFormElement
) {
    const validator = new Validator();

    const checkField = (
        fieldName: string,
        fieldValue: string | File | null,
        inputElem: HTMLInputElement | HTMLSelectElement
    ) => {
        const error = validator.validate(fieldName, fieldValue as any);
        if (error !== undefined) {
            inputField.setError([inputElem as HTMLInputElement], true, error);
            return false;
        }
        return true;
    };

    const nameInput = form.querySelector<HTMLInputElement>('input[placeholder="Название категории (обяз.)"]');
    const iconInput = form.querySelector<HTMLInputElement>('#editCategoryIcon');
    const descInput = form.querySelector<HTMLInputElement>('input[placeholder="Описание категории (необяз.)"]');

    if (!nameInput || !iconInput || !descInput) return false;

    return (
        checkField("categoryName", categoryName, nameInput) &&
        (categoryIcon ? checkField("categoryIcon", categoryIcon, iconInput) : true) &&
        checkField("categoryDescription", categoryDescription, descInput)
    );
}

/**
 * Получить инпуты формы создания операции.
 */
export function getOperationInputs(form: HTMLFormElement): HTMLInputElement[] {
    const costInput = form.querySelector<HTMLInputElement>('input[placeholder="Стоимость (обяз.)"]');
    const operationTypeInput = form.querySelector<HTMLSelectElement>("#operationType");
    const operationDateInput = form.querySelector<HTMLInputElement>('input[type="date"]');
    const commentInput = form.querySelector<HTMLInputElement>('input[placeholder="Комментарий к операции (необяз.)"]');
    const accountInput = form.querySelector<HTMLSelectElement>('select:last-of-type');

    if (!costInput || !operationTypeInput || !operationDateInput || !commentInput || !accountInput)
        throw new Error("Один или несколько инпутов формы операции не найдены");

    return [costInput, operationTypeInput, operationDateInput, commentInput, accountInput];
}

/**
 * Получить инпуты формы редактирования операции.
 */
export function getEditOperationInputs(form: HTMLFormElement): (HTMLInputElement | HTMLSelectElement)[] {
    const costInput = form.querySelector<HTMLInputElement>('input[placeholder="Стоимость (обяз.)"]');
    const operationDateInput = form.querySelector<HTMLInputElement>('input[type="date"]');
    const categoryInput = form.querySelector<HTMLSelectElement>("#editCategory");
    const organizationInput = form.querySelector<HTMLInputElement>('input[placeholder="Наименование организации"]');
    const commentInput = form.querySelector<HTMLInputElement>('input[placeholder="Комментарий к операции (необяз.)"]');

    if (!costInput || !operationDateInput || !commentInput)
        throw new Error("Один или несколько инпутов формы редактирования операции не найдены");

    return [costInput, operationDateInput, categoryInput, organizationInput, commentInput];
}

/**
 * Получить инпуты формы создания категории.
 */
export function getCategoryInputs(form: HTMLFormElement): (HTMLInputElement | HTMLSelectElement)[] {
    const nameInput = form.querySelector<HTMLInputElement>('input[placeholder="Название категории (обяз.)"]');
    const iconInput = form.querySelector<HTMLInputElement>('input[type="file"]#categoryIcon');
    const descriptionInput = form.querySelector<HTMLInputElement>('input[placeholder="Описание категории (необяз.)"]');

    if (!nameInput || !iconInput || !descriptionInput)
        throw new Error("Один или несколько инпутов формы категории не найдены");

    return [nameInput, iconInput, descriptionInput];
}

/**
 * Получить инпуты формы редактирования категории.
 */
export function getEditCategoryInputs(form: HTMLFormElement): (HTMLInputElement | HTMLSelectElement)[] {
    const nameInput = form.querySelector<HTMLInputElement>('input[placeholder="Название категории (обяз.)"]');
    const iconInput = form.querySelector<HTMLInputElement>('input[type="file"]#editCategoryIcon');
    const descriptionInput = form.querySelector<HTMLInputElement>('input[placeholder="Описание категории (необяз.)"]');

    if (!nameInput || !iconInput || !descriptionInput)
        throw new Error("Один или несколько инпутов формы редактирования категории не найдены");

    return [nameInput, iconInput, descriptionInput];
}

/**
 * Отображение ошибок на инпутах.
 */
export function setInputsError(
    input: HTMLInputElement | HTMLInputElement[],
    text_error: string,
    to_color: boolean = true,
): void {
    const arr = Array.isArray(input) ? input : [input];
    inputField.setError(arr, to_color, text_error);
}

/**
 * Ошибка при создании операции.
 */
export function setServerCreateOperError(): void {
    const form = document.querySelector<HTMLFormElement>(".create-oper-form");
    if (!form) return;
    const inputs = getOperationInputs(form).at(-1);
    if (!inputs) return;
    setInputsError(inputs, "При создании операции произошла ошибка. Повторите попытку позже", false);
}

/**
 * Ошибка при редактировании операции.
 */
export function setServerEditOperError(): void {
    const form = document.querySelector<HTMLFormElement>("#editPopup form");
    if (!form) return;
    const inputs = getEditOperationInputs(form).at(-1);
    if (!inputs) return;
    setInputsError(inputs, "При редактировании операции произошла ошибка. Повторите попытку позже", false);
}

/**
 * Ошибка при создании категории.
 */
export function setServerCreateCategoryError(): void {
    const form = document.querySelector<HTMLFormElement>(".create-category-form");
    if (!form) return;
    const inputs = form.querySelector<HTMLInputElement>('input[placeholder="Название категории (обяз.)"]');
    if (!inputs) return;
    setInputsError(inputs, "При создании категории произошла ошибка. Повторите попытку позже", false);
}

/**
 * Ошибка при редактировании категории.
 */
export function setServerEditCategoryError(): void {
    const form = document.querySelector<HTMLFormElement>("#categoryEditPopup form");
    if (!form) return;
    const inputs = form.querySelector<HTMLInputElement>('input[placeholder="Название категории (обяз.)"]');
    if (!inputs) return;
    setInputsError(inputs, "При редактировании категории произошла ошибка. Повторите попытку позже", false);
}


export function validateOperationForm(
    cost: string,
    operationType: string,
    operationDate: string,
    comment: string,
    account: string,
    form: HTMLFormElement
) {
    const validator = new Validator();

    const checkField = (
        fieldName: string,
        fieldValue: string,
        inputElem: HTMLInputElement | HTMLSelectElement
    ) => {
        const error = validator.validate(fieldName, fieldValue);
        if (error !== undefined) {
            inputField.setError([inputElem as HTMLInputElement], true, error);
            return false;
        }
        return true;
    };

    const costInput = form.querySelector<HTMLInputElement>('input[name="cost"]');
    const typeInput = form.querySelector<HTMLInputElement | HTMLSelectElement>('[name="operationType"]');
    const dateInput = form.querySelector<HTMLInputElement>('input[name="operationDate"]');
    const commentInput = form.querySelector<HTMLInputElement>('input[name="comment"]');
    const accountInput = form.querySelector<HTMLInputElement | HTMLSelectElement>('input[name="account"], select[name="account"]');

    if (!costInput || !typeInput || !dateInput || !commentInput || !accountInput)
        return false;

    // Преобразуем дату к нужному формату, если нужно
    const formattedDate = dateInput.value ? dateInput.value.split("-").reverse().join(".") : "";

    return (
        checkField("cost", cost, costInput) &&
        checkField("operationType", operationType, typeInput) &&
        checkField("operationDate", formattedDate, dateInput) &&
        checkField("comment", comment, commentInput) &&
        checkField("account", account, accountInput)
    );
}

/**
 * Проверка формы редактирования операции.
 */
export function validateOperationRedactForm(
    cost: string,
    operationType: string,
    operationDate: string,
    comment: string,
    account: string,
    form: HTMLFormElement
) {
    const validator = new Validator();

    const checkField = (
        fieldName: string,
        fieldValue: string,
        inputElem: HTMLInputElement | HTMLSelectElement
    ) => {
        const error = validator.validate(fieldName, fieldValue);
        if (error !== undefined) {
            inputField.setError([inputElem as HTMLInputElement], true, error);
            return false;
        }
        return true;
    };

    const costInput = form.querySelector<HTMLInputElement>('input[name="cost"]');
    const typeInput = form.querySelector<HTMLInputElement | HTMLSelectElement>('[name="operationType"]');
    const dateInput = form.querySelector<HTMLInputElement>('input[name="operationDate"]');
    const commentInput = form.querySelector<HTMLInputElement>('input[name="comment"]');
    const accountInput = form.querySelector<HTMLInputElement | HTMLSelectElement>('input[name="account"], select[name="account"]');

    if (!costInput || !typeInput || !dateInput || !commentInput || !accountInput)
        return false;

    const formattedDate = dateInput.value ? dateInput.value.split("-").reverse().join(".") : "";

    return (
        checkField("cost", cost, costInput) &&
        checkField("operationType", operationType, typeInput) &&
        checkField("operationDate", formattedDate, dateInput) &&
        checkField("comment", comment, commentInput) &&
        checkField("account", account, accountInput)
    );
}