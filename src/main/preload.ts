import { contextBridge, ipcRenderer } from 'electron';
import { IpcRequest } from 'interfaces';
import { IpcService } from 'IPC';

import { CONSTANTS } from '../utils/constants';

export type Channels = keyof typeof CONSTANTS | 'ipc-example';

const service = new IpcService(ipcRenderer);
contextBridge.exposeInMainWorld('electron', {
  ipc: {
    send: <T>(channel: string, request: IpcRequest) => {
      return service.send<T>(channel, request);
    },
  },
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    removeAllListeners(channel?: Channels | string | null) {
      ipcRenderer.removeAllListeners(channel || '');
    },
  },
});
