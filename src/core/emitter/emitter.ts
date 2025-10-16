
export class Emitter {
    #events: Record<string, CallableFunction[]> = {};

    on(evt: string, cb: CallableFunction) {
        (this.#events[evt] = this.#events[evt] || []).push(cb)
    }

    off(evt: string, cb: CallableFunction) {
        if (!this.#events[evt]) return;
        this.#events[evt] = this.#events[evt].filter(f => f !== cb)
    }

    emit(evt: string, ...args: unknown[]) {
        (this.#events[evt] || []).slice().forEach(f => f(...args))
    }
}
