import { IpcRequest, PromisedIpcResponse } from 'interfaces';
import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipc: {
        send: <T>(
          channel: string,
          request: IpcRequest
        ) => PromisedIpcResponse<T>;
      };

      ipcRenderer: {
        removeAllListeners(channel?: Channels | string | null): void;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
