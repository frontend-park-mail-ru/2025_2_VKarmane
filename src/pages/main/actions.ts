import { dispatcher } from "../../core/dispatcher/dispatcher.js";

export enum MainActionsType {
  LoadDataRequest = "LOAD_DATA_REQUEST",
  CreateDataRequest = "CREATE_DATA_REQUEST",
}

export const MainActions = {
  async loadData() {
    dispatcher.dispatch({
      type: MainActionsType.LoadDataRequest,
      payload: {},
    });
  },

  async createOperation(body) {
    dispatcher.dispatch({
      type: MainActionsType.CreateDataRequest,
      payload: { body },
    });
  },
};
