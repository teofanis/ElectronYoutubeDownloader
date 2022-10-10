/* eslint-disable import/no-named-as-default-member */
import { contextBridge, ipcRenderer } from 'electron';
import { IpcRequest } from 'interfaces';
import { IpcService } from 'IPC';
import store from 'main/store';
import { CONSTANTS } from '../utils/constants';

export type Channels = keyof typeof CONSTANTS | 'ipc-example';

const service = new IpcService(ipcRenderer);

contextBridge.exposeInMainWorld('electron', {
  store: {
    getState: store.getState,
    setState: store.setState,
    subscribe: (listener: (state: unknown, description?: string) => void) => {
      return store.subscribe(listener);
    },
  },
  ipc: {
    send: <T>(channel: string, request: IpcRequest) => {
      return service.send<T>(channel, request);
    },
  },
});
