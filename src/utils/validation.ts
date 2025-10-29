export class Validator {
    rules: Record<string, any>;
    messages: Record<string, Record<string, string>>;

    constructor() {
        this.rules = {
            login: {
                minLength: 3,
                maxLength: 20,
                pattern: /^[a-zA-Z0-9_-]+$/,
                noSpaces: true,
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                maxLength: 254,
            },
            password: {
                minLength: 6,
                maxLength: 100,
                pattern: /^[a-zA-Z0-9@_#%&*\-$]+$/,
                requireUppercase: true,
                requireLowercase: true,
                requireNumbers: true,
            },

            cost: {
                pattern: /^\d+(\.\d+)?$/,
                required: true,
            },
            operationType: {
                allowedValues: ["income", "expense"],
                required: true,
            },
            operationDate: {
                pattern: /^\d{2}\.\d{2}\.\d{4}$/,
                required: true,
                validDate: true,
            },
            comment: {
                required: false,
                minLength: 3,
                maxLength: 100,
            },
            // account: {
            //     required: true,
            //     pattern: /^Счет\s*№\d+$/, // пока сделал так, потом поправим
            // },
            categoryName: {
                required: true,
                minLength: 3,
                maxLength: 50,
            },
            categoryDescription: {
                required: false,
                maxLength: 200,
            },
            categoryIcon: {
                required: false,
                allowedExtensions: ["jpg", "jpeg", "png", "svg", "gif"],
            },
        };

        this.messages = {
            login: {
                required: "Логин обязателен",
                minLength: `Логин должен быть не менее ${this.rules.login!.minLength} символов`,
                maxLength: `Логин должен быть не более ${this.rules.login!.maxLength} символов`,
                pattern:
                    "Логин может содержать только латинские буквы, цифры, дефис и подчеркивание",
                spaces: "Логин не должен содержать пробелы",
            },
            email: {
                required: "Email обязателен",
                pattern: "Введите корректный email адрес",
                maxLength: "Email слишком длинный",
            },
            password: {
                required: "Пароль обязателен",
                minLength: `Пароль должен быть не менее ${this.rules.password!.minLength} символов`,
                maxLength: `Пароль должен быть не более ${this.rules.password!.maxLength} символов`,
                uppercase: "Пароль должен содержать хотя бы одну заглавную букву",
                lowercase: "Пароль должен содержать хотя бы одну строчную букву",
                numbers: "Пароль должен содержать хотя бы одну цифру",
                pattern:
                    "Пароль может содержать только латинские буквы, цифры, дефис, подчеркивание и символы @, #, *, &, %, $, -",
            },

            cost: {
                required: "Стоимость обязательна",
                pattern: "Стоимость должна быть числом (например 1080 или 1080.50)",
            },
            operationType: {
                required: "Тип операции обязателен",
                allowedValues: "Тип операции должен быть 'Доход' или 'Расход'",
            },
            operationDate: {
                required: "Дата операции обязательна",
                pattern: "Дата должна быть в формате ДД.ММ.ГГГГ",
                validDate: "Введите корректную дату операции",
            },
            comment: {
                required: "Комментарий обязателен",
                minLength: "Комментарий должен содержать не менее 3 символов",
                maxLength: "Комментарий должен быть не длиннее 100 символов",
            },
            account: {
                required: "Поле 'Счёт' обязательно",
                pattern: "Введите корректный счёт в формате 'Счет №3'",
            },
            categoryName: {
                required: "Название категории обязательно",
                minLength: "Название категории должно быть не менее 3 символов",
                maxLength: "Название категории должно быть не более 50 символов",
            },
            categoryDescription: {
                maxLength: "Описание категории должно быть не длиннее 200 символов",
            },
            categoryIcon: {
                allowedExtensions: "Иконка должна быть изображением (jpg, jpeg, png, svg, gif)",
            },
        };
    }

    validate(fieldName: string, value: string) {
        const rules = this.rules[fieldName];
        const messages = this.messages[fieldName];

        if (!rules || !messages) return;

        if (!value && value !== "") {
            return messages.required;
        }

        value = value.toString().trim();

        if (!value && rules.required) {
            return messages.required;
        }

        if (!value && !rules.required)
            return;




        if (rules.pattern && !rules.pattern.test(value)) {
            return messages.pattern;
        }

        if (rules.allowedValues && !rules.allowedValues.includes(value)) {
            return messages.allowedValues;
        }

        if (rules.validDate) {
            if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
                return messages.pattern;
            }


            const [day, month, year] = value.split(".").map(Number);
            const date = new Date(year, month - 1, day);
            const isValid =
                date.getFullYear() === year &&
                date.getMonth() === month - 1 &&
                date.getDate() === day;
            if (!isValid) return messages.validDate;
        }


        if (rules.minLength && value.length < rules.minLength) {
            return messages.minLength;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return messages.maxLength;
        }
        if (rules.noSpaces && /\s/.test(value)) {
            return messages.spaces;
        }

        if (rules.requireUppercase && !/[A-Z]/.test(value)) {
            return messages.uppercase;
        }
        if (rules.requireLowercase && !/[a-z]/.test(value)) {
            return messages.lowercase;
        }
        if (rules.requireNumbers && !/\d/.test(value)) {
            return messages.numbers;
        }
        if (rules.allowedExtensions && value instanceof File) {
            const ext = value.name.split(".").pop()?.toLowerCase();
            if (!ext || !rules.allowedExtensions.includes(ext)) {
                return messages.allowedExtensions;
            }
        }


        return;
    }
}
