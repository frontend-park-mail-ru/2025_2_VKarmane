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

    async setEvents() {
        this.initializePopup();
        await this.initializeSteps();
        this.resetToFirstStep();
    }

    private async initializePopup() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const container = document.querySelector('.cards__list') as HTMLElement;
        if (!container) return;

        container.addEventListener('click', async (e) => {
            const target = e.target as HTMLElement;
            const btn = target.closest('.card-edi');
            if (!btn) return;

            const card = btn.closest('.cards__item');
            if (!card) return;

            // Берём ID из текста "ID Счета: 123"
            const titleEl = card.querySelector('.cards__title');
            if (!titleEl) return;

            const match = titleEl.textContent?.match(/\d+/);
            if (!match) return;

            const accountId = match[0];

            try {
                const { ok, data } = await apiFetch(`/account/${accountId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!ok) {
                    throw new Error('Ошибка загрузки счета');
                }

                const account = data;

                const nameInput = popup.querySelector('#editBillAccName') as HTMLInputElement;
                const typeSelect = popup.querySelector('#editBillAccountType') as HTMLSelectElement;
                const balanceInput = popup.querySelector('#editBillInitialBalance') as HTMLInputElement;
                const IDInput = popup.querySelector('#editBillAccID') as HTMLInputElement;

                if (nameInput) {
                    nameInput.value = account.name ?? '';
                }

                if (typeSelect) {
                    typeSelect.value = account.type ?? 'planned';
                }

                if (balanceInput) {
                    balanceInput.value = String(account.balance ?? '');
                }

                if (IDInput) {
                    IDInput.value = account.id;
                }

                popup.style.display = 'block';
            } catch (error) {
                console.error(error);
            }
        });

        popup.querySelector('.close-btn')?.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        popup.querySelector('.popup-edit-overlay')?.addEventListener('click', (e) => {
            if (e.target === popup.querySelector('.popup-edit-overlay')) {
                popup.style.display = 'none';
            }
        });
    }

    private updateSummary() {
        const summaryBox = document.getElementById('editBillSummaryBox');
        if (!summaryBox) return;

        const accountName = (document.getElementById('editBillAccName') as HTMLInputElement)?.value;
        const initialBalance = (document.getElementById('editBillInitialBalance') as HTMLInputElement)?.value;

        let summaryHTML = `
            <div class="summary-item"><strong>Название:</strong> ${accountName}</div>
            <div class="summary-item"><strong>Баланс:</strong> ${initialBalance} ₽</div>
        `;


        summaryBox.innerHTML = summaryHTML;
    }




    private resetToFirstStep() {
        const popup = document.querySelector('.popup-edit-bill') as HTMLElement;
        if (!popup) return;

        const steps = popup.querySelectorAll('.step') as NodeListOf<HTMLElement>;
        const stepIndicator = popup.querySelector('#editBillStepIndicator') as HTMLElement;

        steps.forEach(step => (step.style.display = 'none'));

        const firstStep = popup.querySelector('.step[data-step="1"]') as HTMLElement;
        if (firstStep) firstStep.style.display = 'block';

        if (stepIndicator) stepIndicator.textContent = '1 / 2';

        this.resetFormFields();
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
        const stepIndicator = popup.querySelector('#editBillStepIndicator') as HTMLElement;

        const goToStep = (stepNumber: number) => {
            steps.forEach(step => (step.style.display = 'none'));
            const targetStep = popup.querySelector(`.step[data-step="${stepNumber}"]`) as HTMLElement;
            if (targetStep) targetStep.style.display = 'block';
            if (stepIndicator) stepIndicator.textContent = `${stepNumber} / 2`;
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

                if (nextStepNumber <= 2) {
                    goToStep(nextStepNumber);
                }
                if (nextStepNumber === 2) this.updateSummary();
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
                if (currentStepNumber === 3) {
                    this.updateSummary();
                }
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


        const createBtn = popup.querySelector('#editBillFinishBtn') as HTMLElement;
        if (createBtn) {
            createBtn.addEventListener('click', async () => {
                try {
                    const accountData = await this.collectFormData();
                    const { ok, status } = await apiFetch(`/account/${accountData.accountID}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            balance: parseFloat(accountData.initialBalance || '0'),
                            name: accountData.accountName
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

        const accountID = (popup.querySelector('#editBillAccID') as HTMLSelectElement)?.value;

        return {
            accountType,
            accountName,
            comment,
            initialBalance,
            plannedDate,
            plannedBalance,
            accessType,
            accountID
        };
    }

}
