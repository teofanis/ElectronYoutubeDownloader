import { IpcRequest, PromisedIpcResponse } from 'interfaces';

declare global {
  interface Window {
    electron: {
      store: {
        getState: <T>() => T;
        setState: <T>(
          recipe: (draft: T) => void,
          description?: string | undefined
        ) => T;
        subscribe: <T>(
          listener: (state: T, description?: string | undefined) => void
        ) => () => void;
      };
      ipc: {
        send: <T>(
          channel: string,
          request: IpcRequest
        ) => PromisedIpcResponse<T>;
      };
    };
  }
}

export {};
