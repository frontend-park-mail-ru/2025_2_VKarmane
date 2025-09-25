export class Validator {
  constructor() {
    this.rules = {
      login: {
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_-]+$/,
        noSpaces: true,
        noEmoji: true,
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLength: 254,
        noEmoji: true,
      },
      password: {
        minLength: 6,
        maxLength: 100,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        noEmoji: true,
      },
    };

    this.messages = {
      login: {
        required: "Логин обязателен",
        minLength: `Логин должен быть не менее ${this.rules.login.minLength} символов`,
        maxLength: `Логин должен быть не более ${this.rules.login.maxLength} символов`,
        pattern:
          "Логин может содержать только латинские буквы, цифры, дефис и подчеркивание",
        spaces: "Логин не должен содержать пробелы",
        emoji: "Логин не должен содержать смайлики и специальные символы",
      },
      email: {
        required: "Email обязателен",
        pattern: "Введите корректный email адрес",
        maxLength: "Email слишком длинный",
        emoji: "Email не должен содержать смайлики",
      },
      password: {
        required: "Пароль обязателен",
        minLength: `Пароль должен быть не менее ${this.rules.password.minLength} символов`,
        maxLength: `Пароль должен быть не более ${this.rules.password.minLength} символов`,
        uppercase: "Пароль должен содержать хотя бы одну заглавную букву",
        lowercase: "Пароль должен содержать хотя бы одну строчную букву",
        numbers: "Пароль должен содержать хотя бы одну цифру",
        emoji: "Пароль не должен содержать смайлики и специальные символы",
      },
    };
  }

  validate(fieldName, value) {
    const rules = this.rules[fieldName];
    const messages = this.messages[fieldName];

    if (!value && value !== "") {
      return messages.required;
    }

    value = value.toString().trim();

    if (!value) {
      return messages.required;
    }

    if (rules.noEmoji && this.containsEmoji(value)) {
      return messages.emoji;
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

    return;
  }

  containsEmoji(str) {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    return emojiRegex.test(str);
  }
}
