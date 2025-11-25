import Handlebars from "handlebars";
import EditBillsTemplate from "../../templates/components/redactCards.hbs?raw";
import { apiFetch } from "../../api/fetchWrapper.js";
import { setServerCreateOperError } from "../../pages/transactions/validationForForms.js";
import { router } from "../../router.js";

export class EditBill {
    private template: Handlebars.TemplateDelegate;
    constructor() {
        this.template = Handlebars.compile(EditBillsTemplate);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }

    setEvents() {
        this.initializePopup();
        this.initializeSteps();
        this.resetToFirstStep();
    }

    private initializePopup() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const container = document.querySelector('.cards__list') as HTMLElement;
        if (!container) return;

        container.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const btn = target.closest('.card-edi');
            if (!btn) return;

            const card = btn.closest('.cards__item');
            if (!card) return;

            const accountName = card.querySelector('.cards__title')?.textContent || '';
            const accountType = card.querySelector('.cards__status')?.textContent.includes('Фактический') ? 'actual' : 'planned';
            let balance = card.querySelector('.cards__price')?.textContent || '';

            const nameInput = popup.querySelector('#editBillAccName') as HTMLInputElement;
            const typeSelect = popup.querySelector('#editBillAccountType') as HTMLSelectElement;
            const balanceInput = popup.querySelector('#editBillInitialBalance') as HTMLInputElement;

            if (nameInput) nameInput.value = accountName;
            if (typeSelect) typeSelect.value = accountType;
            balance = balance.replace(/[^\d.]/g, '');
            if (balanceInput) balanceInput.value = balance;

            popup.style.display = 'block';
        });

        // Закрытие
        popup.querySelector('.close-btn')?.addEventListener('click', () => popup.style.display = 'none');
        popup.querySelector('.popup-edit-overlay')?.addEventListener('click', (e) => {
            if (e.target === popup.querySelector('.popup-edit-overlay')) popup.style.display = 'none';
        });
    }




    private resetToFirstStep() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const steps = popup.querySelectorAll('.step') as NodeListOf<HTMLElement>;
        const stepIndicator = popup.querySelector('#editStepIndicator') as HTMLElement;

        steps.forEach(step => (step.style.display = 'none'));

        const firstStep = popup.querySelector('.step[data-step="1"]') as HTMLElement;
        if (firstStep) firstStep.style.display = 'block';

        if (stepIndicator) stepIndicator.textContent = '1 / 4';

        this.resetFormFields();
        this.resetAvatarUpload();
    }

    private resetFormFields() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const inputs = popup.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
        inputs.forEach(input => {
            input.value = '';

            if (input.id === 'editPlannedDate' || input.id === 'editPlannedBalance') {
                input.disabled = true;
                input.required = false;
            }
        });

        const accountType = popup.querySelector('#editAccountType') as HTMLSelectElement;
        if (accountType) accountType.value = 'actual';
    }

    private initializeSteps() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const steps = popup.querySelectorAll('.step') as NodeListOf<HTMLElement>;
        const stepIndicator = popup.querySelector('#editStepIndicator') as HTMLElement;

        const goToStep = (stepNumber: number) => {
            steps.forEach(step => (step.style.display = 'none'));
            const targetStep = popup.querySelector(`.step[data-step="${stepNumber}"]`) as HTMLElement;
            if (targetStep) targetStep.style.display = 'block';
            if (stepIndicator) stepIndicator.textContent = `${stepNumber} / 4`;
    };

    popup.querySelectorAll('[data-next]').forEach(button => {
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
                if (nextStepNumber === 4) this.updateSummary();
            }
        });
    });

    popup.querySelectorAll('[data-prev]').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const currentStep = target.closest('.step') as HTMLElement;
            if (!currentStep) return;

            const currentStepNumber = parseInt(currentStep.dataset.step || '1');
            const prevStepNumber = currentStepNumber - 1;

            if (prevStepNumber >= 1) goToStep(prevStepNumber);
        });
    });

    const accountType = popup.querySelector('#editAccountType') as HTMLSelectElement;
    const plannedDate = popup.querySelector('#editPlannedDate') as HTMLInputElement;
    const plannedBalance = popup.querySelector('#editPlannedBalance') as HTMLInputElement;

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

    const createBtn = popup.querySelector('#editBillFinishBtn') as HTMLElement;
    if (createBtn) {
        createBtn.addEventListener('click', async () => {
            try {
                const accountData = this.collectFormData();
                const id = accountData.accountName.replace(/\s+/g, '');
                const { ok, status } = await apiFetch(`/account/${id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        balance: parseFloat(accountData.initialBalance || '0'),
                    }),
                });
                if (!ok) {
                    if (status === 401) router.navigate('/login');
                    return;
                }
                router.navigate("/cards");
            } catch (error) {
                console.error(error);
                setServerCreateOperError();
            }
            const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
            if (popup) popup.style.display = 'none';
        });
    }

    goToStep(1);
    }

    private initializeAvatarUpload() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const avatarInput = popup.querySelector('#editAvatarUpload') as HTMLInputElement;
        const fileUploadTrigger = popup.querySelector('#editFileUploadTrigger') as HTMLButtonElement;
        const fileName = popup.querySelector('#editFileName') as HTMLSpanElement;
        const imagePreview = popup.querySelector('#editImagePreview') as HTMLDivElement;
        const previewImage = popup.querySelector('#editPreviewImage') as HTMLImageElement;
        const removeImage = popup.querySelector('#editRemoveImage') as HTMLButtonElement;

        if (!avatarInput || !fileUploadTrigger || !fileName || !imagePreview || !previewImage || !removeImage) return;

        fileUploadTrigger.addEventListener('click', () => avatarInput.click());

        avatarInput.addEventListener('change', (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) { alert('Выберите изображение'); this.resetAvatarUpload(); return; }
            if (file.size > 5 * 1024 * 1024) { alert('Макс 5MB'); this.resetAvatarUpload(); return; }

            fileName.textContent = file.name;
            const reader = new FileReader();
            reader.onload = (e) => { previewImage.src = e.target?.result as string; imagePreview.style.display = 'block'; };
            reader.readAsDataURL(file);
        });

        removeImage.addEventListener('click', () => this.resetAvatarUpload());

        this.resetAvatarUpload();
    }

    private resetAvatarUpload() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const avatarInput = popup.querySelector('#editAvatarUpload') as HTMLInputElement;
        const fileName = popup.querySelector('#editFileName') as HTMLSpanElement;
        const imagePreview = popup.querySelector('#editImagePreview') as HTMLDivElement;
        const previewImage = popup.querySelector('#editPreviewImage') as HTMLImageElement;

        if (avatarInput) avatarInput.value = '';
        if (fileName) fileName.textContent = 'Файл не выбран';
        if (imagePreview) imagePreview.style.display = 'none';
        if (previewImage) previewImage.src = '';
    }

    private updateSummary() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const summaryBox = popup.querySelector('#editBillSummaryBox') as HTMLElement;
        if (!summaryBox) return;

        const accountType = (popup.querySelector('#editBillAccountType') as HTMLSelectElement)?.value;
        const accountName = (popup.querySelector('#editBillAccName') as HTMLInputElement)?.value;
        const comment = (popup.querySelector('#editBillComment') as HTMLTextAreaElement)?.value;
        const initialBalance = (popup.querySelector('#editBillInitialBalance') as HTMLInputElement)?.value;

        const currency = '₽';

        const avatarInput = popup.querySelector('#editBillAvatarUpload') as HTMLInputElement;


        const hasAvatar = avatarInput?.files?.length > 0;
        const avatarFileName = hasAvatar ? avatarInput.files[0].name : 'Не загружено';

        console.log(accountType,accountName,avatarFileName);

        let summaryHTML = `
            <div class="summary-item"><strong>Тип счета:</strong> ${accountType === 'actual' ? 'Фактический' : 'Планируемый'}</div>
            <div class="summary-item"><strong>Название:</strong> ${accountName}</div>
            <div class="summary-item"><strong>Баланс:</strong> ${initialBalance} ${currency}</div>
            <div class="summary-item"><strong>Аватар:</strong> ${avatarFileName}</div>
        `;

        if (accountType === 'planned') {
            const plannedDate = (popup.querySelector('#editPlannedDate') as HTMLInputElement)?.value;
            const plannedBalance = (popup.querySelector('#editPlannedBalance') as HTMLInputElement)?.value;
            summaryHTML += `<div class="summary-item"><strong>Планируемая дата:</strong> ${plannedDate}</div>`;
            summaryHTML += `<div class="summary-item"><strong>Планируемый баланс:</strong> ${plannedBalance} ${currency}</div>`;
        }

        if (comment) summaryHTML += `<div class="summary-item"><strong>Комментарий:</strong> ${comment}</div>`;

        summaryBox.innerHTML = summaryHTML;
    }

    private collectFormData() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return {};

        const accountType = (popup.querySelector('#editBillAccountType') as HTMLSelectElement)?.value;
        const accountName = (popup.querySelector('#editBillAccName') as HTMLInputElement)?.value;
        const comment = (popup.querySelector('#editBillComment') as HTMLTextAreaElement)?.value;
        const initialBalance = (popup.querySelector('#editBillInitialBalance') as HTMLInputElement)?.value;

        const plannedDate = (popup.querySelector('#editBillPlannedDate') as HTMLInputElement)?.value;
        const plannedBalance = (popup.querySelector('#editBillPlannedBalance') as HTMLInputElement)?.value;

        const accessType = (popup.querySelector('#editBillAccessType') as HTMLSelectElement)?.value;

        return {
            accountType,
            accountName,
            comment,
            initialBalance,
            plannedDate,
            plannedBalance,
            accessType
        };
    }

}
