import Handlebars from "handlebars";
import importTransaction from "../../templates/components/ImportTransaction.hbs?raw";
import {apiFetch} from "../../api/fetchWrapper.js";
import {convertToISO} from "../../utils/helpers.js";
import {router} from "../../router.js";

export class ImportTransaction {
    private template: Handlebars.TemplateDelegate;
    private container: HTMLElement;
    constructor(container: HTMLElement) {
        this.container = container;
        this.template = Handlebars.compile(importTransaction);
    }

    getSelf(): Handlebars.TemplateDelegate {
        return this.template;
    }

    setEvents(): void {
        const importBttn = this.container.querySelector(".import-btn");
        const exportBttn = this.container.querySelector(".export-btn");
        const cancelImportBtn = this.container.querySelector("#cancel-import-btn");
        const fileInput = this.container.querySelector<HTMLInputElement>('#importCsv');
        const fileName = this.container.querySelector<HTMLElement>('#fileName');
        const importBtn = this.container.querySelector<HTMLButtonElement>('#ImportSubmitBtn');



        if (importBttn) {
            importBttn.addEventListener("click", () => {
                const popupBudgetsEdit =
                    this.container.querySelector<HTMLElement>("#ImportPopup");
                if (popupBudgetsEdit) {
                    popupBudgetsEdit.style.display = "flex";
                }
            })
        }

        if (cancelImportBtn) {
            cancelImportBtn.addEventListener("click", () => {
                const popupBudgetsEdit =
                    this.container.querySelector<HTMLElement>("#ImportPopup");
                if (popupBudgetsEdit) {
                    popupBudgetsEdit.style.display = "none";
                }
            })
        }


        if (fileInput && fileName && importBtn) {
            let selectedFile: File | null = null;


            fileInput.addEventListener('change', () => {
                selectedFile = fileInput.files?.[0] || null;

                if (!selectedFile) {
                    fileName.textContent = 'Файл не выбран';
                    return;
                }

                if (selectedFile.size > 5 * 1024 * 1024) {
                    fileInput.value = '';
                    selectedFile = null;
                    return;
                }

                fileName.textContent = selectedFile.name;
            });


            importBtn.addEventListener('click', async () => {
                if (!selectedFile) {
                    return;
                }

                const formData = new FormData();
                formData.append('file', selectedFile);

                try {
                    const response = await apiFetch('/operations/import', {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        router.navigate("/transactions");
                    }
                    if (!response.ok) {
                        throw new Error('Ошибка загрузки');
                    }

                } catch (err) {
                    console.log(err.message);
                }
            });


            if (exportBttn) {
                exportBttn.addEventListener("click", async () => {
                    try {
                        // Передаём флаг raw = true, чтобы получить настоящий Response
                        const response = await apiFetch('/operations/export', { method: 'GET' }, true);

                        if (!response.ok) throw new Error('Ошибка загрузки');

                        const blob = await response.blob();

                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = 'export.csv';
                        document.body.appendChild(link);
                        link.click();
                        link.remove();

                        URL.revokeObjectURL(link.href);

                    } catch (err) {
                        console.error('Ошибка:', err.message);
                    }
                });
            }

        }






    }

}
