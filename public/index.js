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
    href: "/api/v1/login",
    render: renderLoginPage,
  },
  signup: {
    href: "/api/v1/register",
    render: renderSignUpPage,
  },
};

function renderUserPage() {
    const page = new MainPage();
    page.render(rootElement);
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
