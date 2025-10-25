type FieldRule = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  noSpaces?: boolean;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  minValue?: number;
};

type ruleType = Record<string, FieldRule>;

export class Validator {
  rules: ruleType;
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
      sum: {
        minValue: 0,
        pattern: /^[0-9]+$/,
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
      sum: {
        required: "Сумма обязательна",
        minValue: "Минимальное значение суммы - 0",
        pattern: "Сумма должна содержать только цифры 0-9",
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

    if (!value) {
      return messages.required;
    }

    if (!rules || !messages) return;
    if (rules.minLength && value.length < rules.minLength) {
      return messages.minLength;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return messages.maxLength;
    }
    if (rules.noSpaces && /\s/.test(value)) {
      return messages.spaces;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return messages.pattern;
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

    if (rules.minValue && !/\d/.test(value)) {
      return messages.minValue;
    }

    return;
  }
}

export class ValidateTransactionsAndCategory {
  rules: ruleType;
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
    };
  }
}
