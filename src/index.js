import { LoginPage } from "./pages/login/Login.js";
import { SignUpPage } from "./pages/signup/Signup.js";
import "./index.css";
import { MainPage } from "./pages/main/Main.ts";
import { TransactionsPage } from "./pages/transactions/Transactions.ts";
import {CardsPage} from "./pages/cards/Cards.ts";

const rootElement = document.getElementById("root");

export const config = {
  user_page: {
    href: "/",
    render: renderUserPage,
  },

  transactions_page: {
    href: "/transactions",
    render: renderTransactionsPage,
  },
  login: {
    href: "/api/v1/login",
    render: renderLoginPage,
  },
  signup: {
    href: "/api/v1/register",
    render: renderSignUpPage,
  },
    cards:{
      href: "/cards",
        render: renderCardsPage,
    }
};

function renderUserPage() {
  const page = new MainPage();
  page.render(rootElement);
}

function renderTransactionsPage() {
  const page = new TransactionsPage();
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

function renderCardsPage()  {
    const page =  new CardsPage();
    page.render(rootElement);
}

renderUserPage();
