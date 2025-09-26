import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/signup/Signup.js";
import { MainPage } from "./pages/main/Main.js";

const rootElement = document.getElementById("root");

export const config = {
  user_page: {
    href: "/",
    render: renderUserPage,
  },
  login: {
    href: "/login",
    render: renderLoginPage,
  },
  signup: {
    href: "/signup",
    render: renderSignUpPage,
  },
};

function renderUserPage() {
  // const a = 1;
  // const b = 2;
  // // TODO сделать fetch
  // if (a !== b) {
  //   goToPage(config.user_page);
  //   return;
  // }
    const page = new MainPage();
    page.render();
}

function renderLoginPage() {
  const page = new LoginPage();
  page.render(rootElement);
}

function renderSignUpPage() {
  const page = new SignUpPage();
  page.render(rootElement);
}

export function goToPage(pageToGo) {
  rootElement.innerHTML = "";
  pageToGo.render();
}

renderUserPage();
