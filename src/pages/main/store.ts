import { Emitter } from "../../core/emitter/emitter.js";
import { dispatcher } from "../../core/dispatcher/dispatcher.js";
import type { Action } from "../../core/dispatcher/dispatcher.js";
import { MainActionsType } from "./actions.js";
import {
  getBalance,
  getBudgets,
  getAllUserTransactionsByAccIDs,
} from "../../api/index.js";
import { apiFetch } from "../../api/fetchWrapper.js";
import { router } from "../../router.js";

export interface MainPageState {
  loading: boolean;
  success: boolean;
  error: string | null;
  balance: any;
  budgets: any;
  operations: any[];
  profile: any;
}

class MainStore extends Emitter {
  #state: MainPageState = {
    loading: false,
    success: false,
    error: null,
    balance: null,
    budgets: null,
    operations: [],
    profile: null,
  };

  constructor() {
    super();

    dispatcher.register(async (action: Action) => {
      switch (action.type) {
        case MainActionsType.LoadDataRequest:
          await this.#handleLoadData();
          this.emit("change");
          break;
        case MainActionsType.CreateDataRequest:
          await this.#handleCreateOperation(action.payload.body);
          this.emit("change");
          break;
      }
    });
  }

  getState() {
    return this.#state;
  }

  async #handleLoadData() {
    this.#state.loading = true;
    this.emit("change");

    try {
      const balanceData = await getBalance();
      const budgetsData = await getBudgets();
      const { ok, data } = await apiFetch("/profile");
      if (!ok) {
        router.navigate("/login");
        throw new Error("Failed to load profile");
      }
      const accounts = balanceData.accounts?.map((acc: any) => acc.id) || [];
      const operations = await getAllUserTransactionsByAccIDs(accounts);

      this.#state = {
        ...this.#state,
        loading: false,
        success: true,
        error: null,
        balance: balanceData,
        budgets: budgetsData,
        operations,
        profile: data,
      };
    } catch (err: any) {
      this.#state = {
        ...this.#state,
        loading: false,
        success: false,
        error: err?.message ?? "Ошибка загрузки данных",
      };
      router.navigate("/login");
    }

    this.emit("change");
  }
  async #handleCreateOperation(body: HTMLElement) {
    this.#state.loading = true;
    this.emit("change");

    try {
      const { ok } = await apiFetch(`/account/${body.account_id}/operations`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!ok) throw new Error("Ошибка создания операции");

      await this.#handleLoadData();

      this.#state.success = true;
      this.#state.error = null;
    } catch (err: any) {
      this.#state.success = false;
      this.#state.error = err?.message ?? "Ошибка создания операции";
    } finally {
      this.#state.loading = false;
      this.emit("change");
    }
  }
}

export const mainStore = new MainStore();
