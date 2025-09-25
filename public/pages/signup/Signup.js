import { StartButton } from "../../components/startbutton/index.js";
import { InputField } from "../../components/inputField/index.js";
import { absenceText } from "../../components/absenceText/index.js";
import { serviceItem } from "../../components/serviceItem/index.js";

export class SignUpPage {
  render(container) {
    const template = Handlebars.templates["SignUp"];
    const startButton = new StartButton();
    const inputField = new InputField();
    const absText = new absenceText();
    const servItem = new serviceItem();
    const serviceItems = [
      servItem.getSelf(
        {
          db_name: "spotify",
          name: "Spotify",
          logo: "♪",
        },
        "Списание 8.10.25",
        "₽",
        169,
      ),
      servItem.getSelf(
        {
          db_name: "beeline",
          name: "Билайн доставка",
          logo: "Б",
        },
        "Списание 4.10.25",
        "₽",
        133,
      ),
      servItem.getSelf(
        {
          db_name: "tg_oil",
          name: "Телеграм нефть",
          logo: "✈",
        },
        "Списание 7.10.25",
        "₽",
        893,
      ),
    ];
    const data = {
      title: "Регистрация",
      loginInput: inputField.getSelf("login", "login", "логин"),
      emailInput: inputField.getSelf("email", "email", "email"),
      passwordInput: inputField.getSelf("password", "password", "пароль"),
      absenceText: absText.getSelf("Есть аккаунт?", "/login", "Войти!"),
      items: serviceItems,
      signUpButton: startButton.getSelf("signup", "Зарегистрироваться"),
    };
    container.innerHTML = template(data);

    const form = container.querySelector("#signup");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const login = form.querySelector('input[name="login"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const password = form.querySelector('input[name="password"]').value;

      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          login: login,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status !== "ok") {
            if (response.text === "occupied email") {
              const errorInput = form.querySelector('input[name="email"]');
              inputField.setError([errorInput], "Адрес уже зарегистрирован");
              return;
            } else if (response.text === "occupied login") {
              const errorInput = form.querySelector('input[name="login"]');
              inputField.setError([errorInput], "Такой логин уже существует");
              return;
            }
            return;
          }
        });
    });
  }
}
