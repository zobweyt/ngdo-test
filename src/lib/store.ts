import { signal, WritableSignal } from "@angular/core";

export type Store<T> = {
  [K in keyof T]: T[K] extends object ? Store<T[K]> : T[K];
};

export function store<T extends object>(initialValue: T) {
  const state = signal(initialValue);

  const nest = <N extends object, F extends () => N>(obj: F): Store<F> =>
    new Proxy(obj, {
      get(target: F, prop: string | symbol) {
        const value = target()[prop as keyof N];
        return typeof value === "object" && value !== null
          ? nest(() => value)
          : value;
      },
      set(target: F, prop: string | symbol, value: any) {
        state.update((prev) => ({ ...prev, [prop as keyof F]: value }));
        return true;
      },
    });

  const proxy = new Proxy(nest(() => state()) as Store<T>, {
    get(target: any, prop: string | symbol) {
      return target[prop];
    },
    apply() {
      return state();
    },
  }) as Store<T> & {
    (): T;
    set: WritableSignal<T>["set"];
    update: WritableSignal<T>["update"];
  };

  proxy.set = state.set;
  proxy.update = state.update;

  return proxy;
}
