export interface Action {
    type: string,
    payload: Object,
}

export class Dispatcher {
    #callbacks: CallableFunction[] = [];

    register(cb: CallableFunction) {
        this.#callbacks.push(cb);
    }

    dispatch(action: Action) {
        this.#callbacks.forEach((cb) => {
            cb(action);
        })
    }
}

export const dispatcher = new Dispatcher();