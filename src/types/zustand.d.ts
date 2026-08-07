declare module "zustand" {
  export type SetState<T> = (
    partial: Partial<T> | ((state: T) => Partial<T> | T),
    replace?: boolean
  ) => void;

  export type GetState<T> = () => T;

  export type Listener<T> = (state: T, previous: T) => void;

  export interface StoreApi<T> {
    setState: SetState<T>;
    getState: GetState<T>;
    subscribe: (listener: Listener<T>) => () => void;
    destroy: () => void;
  }

  export type UseStore<T> = {
    (): T;
    <S>(selector: (state: T) => S): S;
  } & StoreApi<T>;

  export type StateCreator<T> = (
    set: SetState<T>,
    get: GetState<T>,
    api: StoreApi<T>
  ) => T | void;

  export function create<T>(): (initializer: StateCreator<T>) => UseStore<T>;
  export function create<T>(initializer: StateCreator<T>): UseStore<T>;

  export function useStore<T>(store: UseStore<T>): T;
  export function useStore<T, S>(store: UseStore<T>, selector: (state: T) => S): S;
}

declare module "zustand/middleware" {
  import type { StateCreator } from "zustand";

  export function persist<T>(
    f: StateCreator<T>,
    config?: {
      name?: string;
      storage?: Storage;
      getStorage?: () => Storage;
      partialize?: (state: T) => unknown;
      skipHydration?: boolean;
      onRehydrateStorage?: () => (state: T | null) => void;
      serialize?: {
        serialize: (value: unknown) => string;
        deserialize: (value: string) => unknown;
      };
      whitelist?: string[];
      blacklist?: string[];
      debug?: boolean;
    }
  ): StateCreator<T>;

  export function createJSONStorage(
    callback?: () => Storage,
    options?: {
      reviver?: (key: string, value: unknown) => unknown;
      replacer?: (key: string, value: unknown) => unknown;
    }
  ): Storage;
}
