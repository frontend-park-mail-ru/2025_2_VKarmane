import Handlebars from "handlebars";
import AddBillsTemplate from "../../templates/components/addBill.hbs?raw";
import {apiFetch} from "../../api/fetchWrapper.js";
import {setServerCreateOperError} from "../../pages/transactions/validationForForms.js";
import {router} from "../../router.js";
import {convertToISO} from "../../utils/helpers.js";

export class AddBills {
    private template: Handlebars.TemplateDelegate;

    constructor() {
        this.template = Handlebars.compile(AddBillsTemplate);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }

    setEvents() {
        this.initializePopup();
        this.initializeSteps();
    }

    private initializePopup() {
        const openBtn = document.querySelector('.open-btn');
        const popup = document.querySelector('.create-account-popup') as HTMLElement;

        if (openBtn && popup) {
            openBtn.addEventListener('click', () => {
                popup.style.display = 'block';
                this.resetToFirstStep();
            });
        }

        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn && popup) {
            closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        }

        const overlay = document.querySelector('.overlay');
        if (overlay && popup) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    popup.style.display = 'none';
                }
            });
        }
    }

    private resetToFirstStep() {
        const steps = document.querySelectorAll('.step');
        const stepIndicator = document.getElementById('stepIndicator');


        steps.forEach(step => {
            (step as HTMLElement).style.display = 'none';
        });

        const firstStep = document.querySelector('[data-step="1"]') as HTMLElement;
        if (firstStep) {
            firstStep.style.display = 'block';
        }


        if (stepIndicator) {
            stepIndicator.textContent = '1 / 4';
        }

        this.resetAvatarUpload();


        this.resetFormFields();
    }

    private resetFormFields() {

        const inputs = document.querySelectorAll('.step input, .step textarea, .step select');
        inputs.forEach(input => {
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement) {
                input.value = '';


                if (input.id === 'plannedDate' || input.id === 'plannedBalance') {
                    input.disabled = true;
                    input.required = false;
                }
            }
        });


        const accountType = document.getElementById('accountType') as HTMLSelectElement;
        if (accountType) {
            accountType.value = 'actual';
        }
    }

    private initializeSteps() {
        const steps = document.querySelectorAll('.step');
        const stepIndicator = document.getElementById('stepIndicator');

        const goToStep = (stepNumber: number) => {

            steps.forEach(step => {
                (step as HTMLElement).style.display = 'none';
            });

            const targetStep = document.querySelector(`[data-step="${stepNumber}"]`) as HTMLElement;
            if (targetStep) {
                targetStep.style.display = 'block';
            }

            if (stepIndicator) {
                stepIndicator.textContent = `${stepNumber} / 4`;
            }
        };

        document.querySelectorAll('[data-next]').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const currentStep = target.closest('.step') as HTMLElement;

                if (!currentStep) return;

                const currentStepNumber = parseInt(currentStep.dataset.step || '1');
                const nextStepNumber = currentStepNumber + 1;

                if (currentStep.tagName === 'FORM') {
                    const form = currentStep as HTMLFormElement;
                    if (!form.checkValidity()) {
                        form.reportValidity();
                        return;
                    }
                }

                if (nextStepNumber <= 4) {
                    goToStep(nextStepNumber);

                    if (nextStepNumber === 4) {
                        this.updateSummary();
                    }
                }
            });
        });

        document.querySelectorAll('[data-prev]').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const currentStep = target.closest('.step') as HTMLElement;

                if (!currentStep) return;

                const currentStepNumber = parseInt(currentStep.dataset.step || '1');
                const prevStepNumber = currentStepNumber - 1;

                if (prevStepNumber >= 1) {
                    goToStep(prevStepNumber);
                }
            });
        });

        const accountType = document.getElementById('accountType') as HTMLSelectElement;
        const plannedDate = document.getElementById('plannedDate') as HTMLInputElement;
        const plannedBalance = document.getElementById('plannedBalance') as HTMLInputElement;

        if (accountType && plannedDate && plannedBalance) {
            accountType.addEventListener('change', function() {
                if (this.value === 'planned') {
                    plannedDate.disabled = false;
                    plannedBalance.disabled = false;
                    plannedDate.required = true;
                    plannedBalance.required = true;
                } else {
                    plannedDate.disabled = true;
                    plannedBalance.disabled = true;
                    plannedDate.required = false;
                    plannedBalance.required = false;
                    plannedDate.value = '';
                    plannedBalance.value = '';
                }
            });
        }


        this.initializeAvatarUpload();

        const createBtn = document.getElementById('createBtn');
        if (createBtn) {
            createBtn.addEventListener('click', async () => {
                try {
                    const accountData = this.collectFormData();
                    const { ok, status } = await apiFetch(
                        `/accounts`,
                        { method: "POST",
                            body: JSON.stringify({
                                balance: accountData.balance,
                                type: accountData.type === 'personal' ? 'private' : 'shared',
                                currency_id: 1,
                            }),
                         },
                    );
                    if (!ok) {
                        if (status === 400) {
                            this.showError('Некорректные данные счета');
                        } else if (status === 401) {
                            this.showError('Необходима авторизация');
                            router.navigate('/login');
                        } else if (status === 409) {
                            this.showError('Счет с таким названием уже существует');
                        } else {
                            console.log(accountData.balance);
                            console.log(accountData.type);
                            console.log(accountData.currency_id);
                            this.showError('Ошибка сервера при создании счета');
                        }
                        return;
                    }

                    console.info('Счет успешно создан');
                    router.navigate("/cards");
                } catch (error) {
                    console.error("Ошибка при выполнении запроса:", error);
                    setServerCreateOperError();
                }
                const popup = document.querySelector('.create-account-popup') as HTMLElement;
                if (popup) {
                    popup.style.display = 'none';
                }
            });
        }
        goToStep(1);
    }

    private initializeAvatarUpload() {
        const avatarInput = document.getElementById('avatarUpload') as HTMLInputElement;
        const fileUploadTrigger = document.getElementById('fileUploadTrigger') as HTMLButtonElement;
        const fileName = document.getElementById('fileName') as HTMLSpanElement;
        const imagePreview = document.getElementById('imagePreview') as HTMLDivElement;
        const previewImage = document.getElementById('previewImage') as HTMLImageElement;
        const removeImage = document.getElementById('removeImage') as HTMLButtonElement;

        if (!avatarInput || !fileUploadTrigger || !fileName || !imagePreview || !previewImage || !removeImage) {
            return;
        }

        fileUploadTrigger.addEventListener('click', () => {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];

            if (file) {
                if (!file.type.startsWith('image/')) {
                    alert('Пожалуйста, выберите файл изображения');
                    this.resetAvatarUpload();
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    alert('Размер файла не должен превышать 5MB');
                    this.resetAvatarUpload();
                    return;
                }

                fileName.textContent = file.name;

                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target?.result as string;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        removeImage.addEventListener('click', () => {
            this.resetAvatarUpload();
        });

        this.resetAvatarUpload();
    }

    private resetAvatarUpload() {
        const avatarInput = document.getElementById('avatarUpload') as HTMLInputElement;
        const fileName = document.getElementById('fileName') as HTMLSpanElement;
        const imagePreview = document.getElementById('imagePreview') as HTMLDivElement;
        const previewImage = document.getElementById('previewImage') as HTMLImageElement;

        if (avatarInput) avatarInput.value = '';
        if (fileName) fileName.textContent = 'Файл не выбран';
        if (imagePreview) imagePreview.style.display = 'none';
        if (previewImage) previewImage.src = '';
    }

    private updateSummary() {
        const summaryBox = document.getElementById('summaryBox');
        if (!summaryBox) return;

        const accountType = (document.getElementById('accountType') as HTMLSelectElement)?.value;
        const accountTypeText = accountType === 'actual' ? 'Фактический' : 'Планируемый';
        const accountName = (document.getElementById('accName') as HTMLInputElement)?.value;
        const comment = (document.getElementById('comment') as HTMLTextAreaElement)?.value;
        const initialBalance = (document.getElementById('initialBalance') as HTMLInputElement)?.value;
        const currency = (document.getElementById('currency') as HTMLSelectElement)?.value;
        const accountTag = (document.getElementById('accountTag') as HTMLInputElement)?.value;

        const avatarInput = document.getElementById('avatarUpload') as HTMLInputElement;
        const hasAvatar = avatarInput?.files?.length > 0;
        const avatarFileName = hasAvatar ? avatarInput.files[0].name : 'Не загружено';

        let summaryHTML = `
            <div class="summary-item"><strong>Тип счета:</strong> ${accountTypeText}</div>
            <div class="summary-item"><strong>Название:</strong> ${accountName}</div>
            <div class="summary-item"><strong>Баланс:</strong> ${initialBalance} ${currency}</div>
            <div class="summary-item"><strong>Аватар:</strong> ${avatarFileName}</div>
        `;

        if (accountType === 'planned') {
            const plannedDate = (document.getElementById('plannedDate') as HTMLInputElement)?.value;
            const plannedBalance = (document.getElementById('plannedBalance') as HTMLInputElement)?.value;
            summaryHTML += `<div class="summary-item"><strong>Планируемая дата:</strong> ${plannedDate}</div>`;
            summaryHTML += `<div class="summary-item"><strong>Планируемый баланс:</strong> ${plannedBalance} ${currency}</div>`;
        }

        if (comment) {
            summaryHTML += `<div class="summary-item"><strong>Комментарий:</strong> ${comment}</div>`;
        }

        if (accountTag) {
            summaryHTML += `<div class="summary-item"><strong>Тег:</strong> ${accountTag}</div>`;
        }

        summaryBox.innerHTML = summaryHTML;
    }


    private collectFormData() {
        const accountType = (document.getElementById('accountType') as HTMLSelectElement)?.value;
        const accountName = (document.getElementById('accName') as HTMLInputElement)?.value;
        const comment = (document.getElementById('comment') as HTMLTextAreaElement)?.value;
        const initialBalance = (document.getElementById('initialBalance') as HTMLInputElement)?.value;
        const currency = (document.getElementById('currency') as HTMLSelectElement)?.value;
        const plannedDate = (document.getElementById('plannedDate') as HTMLInputElement)?.value;
        const plannedBalance = (document.getElementById('plannedBalance') as HTMLInputElement)?.value;

        const formData: any = {
            name: accountName,
            type: accountType,
            balance: parseFloat(initialBalance || '0'),
            currency: currency,
            description: comment || '',
        };
        if (accountType === 'planned' && plannedDate && plannedBalance) {
            formData.planned_date = plannedDate;
            formData.planned_balance = parseFloat(plannedBalance || '0');
        }

        return formData;
    }
}