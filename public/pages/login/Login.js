import { StartButton } from "../../components/startbutton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { Category } from "../../components/category/index.js";
import { ExpenseCard } from "../../components/expenseCard/index.js";
import { goToPage, config } from "../../index.js";

export class LoginPage {
  render(container) {
    const template = Handlebars.templates["Login"];
    const startButton = new StartButton();
    const inputField = new InputField();
    const absText = new absenceText();
    const category = new Category();
    const expCard = new ExpenseCard();
    const expCards = [
      expCard.getSelf(
        "₽",
        50102,
        "Планируемый расход за период",
        "Сбалансировано",
      ),
      expCard.getSelf("₽", 152104, "Расходы за прошлый период"),
    ];
    const categories = [
      category.getSelf("green", "Банковские"),
      category.getSelf("red", "Развлечения"),
      category.getSelf("pink", "Покупки"),
      category.getSelf("blue", "Подписки"),
    ];
    const data = {
      title: "Войти",
      loginInput: inputField.getSelf("login", "login", "логин"),
      passwordInput: inputField.getSelf("password", "password", "пароль"),
      absenceText: absText.getSelf(
        "Нет аккаунта?",
        config.signup.href,
        "Зарегистрируйтесь!",
      ),
      expenseCards: expCards,
      loginButton: startButton.getSelf("login", "Войти"),
      categories: categories,
    };
    container.innerHTML = template(data);

    const form = container.querySelector("#login");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const login = form.querySelector('input[name="login"]').value;
      const password = form.querySelector('input[name="password"]').value;

      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status !== "ok") {
            if (response.text === "wrong login or password") {
              const errorLogin = form.querySelector('input[name="login"]');
              const errorPassword = form.querySelector(
                'input[name="password"]',
              );
              inputField.setError(
                [errorLogin, errorPassword],
                "Неверный логин или пароль",
              );
              return;
            }
            return;
          }
        });
    });

    const signupLink = container.querySelector(".absence-text a");
    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(config.signup);
    });
  }
}
