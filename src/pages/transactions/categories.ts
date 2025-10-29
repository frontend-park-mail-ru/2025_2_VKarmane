export function openCategoryPopup(): void {
    const popup = document.getElementById("categoryPopup");
    if (popup) popup.style.display = "flex";
}

export function closeCategoryPopup(): void {
    const popup = document.getElementById("categoryPopup");
    if (popup) popup.style.display = "none";
}

export function openEditCategoryPopup(data: {
    name?: string;
    type?: "income" | "expense";
    description?: string;
    fileName?: string;
}): void {
    const nameInput = document.getElementById("editCategoryName") as HTMLInputElement | null;
    const typeSelect = document.getElementById("editCategoryType") as HTMLSelectElement | null;
    const descInput = document.getElementById("editCategoryDescription") as HTMLInputElement | null;
    const fileNameBox = document.getElementById("fileName") as HTMLElement | null;

    if (nameInput) nameInput.value = data.name || "";
    if (typeSelect) typeSelect.value = data.type || "";
    if (descInput) descInput.value = data.description || "";
    if (fileNameBox) fileNameBox.textContent = data.fileName || "Файл не выбран";

    const popup = document.getElementById("categoryEditPopup");
    if (popup) popup.style.display = "flex";

}

export function closeEditCategoryPopup(): void {
    const popup = document.getElementById("categoryEditPopup");
    if (popup) popup.style.display = "none";
}