/* eslint-disable global-require */
import { IpcRenderer } from 'electron';
import { IpcRequest, PromisedIpcResponse } from 'interfaces';

export default class IpcService {
  ipcRenderer?: IpcRenderer;

  public constructor(ipcRenderer: IpcRenderer) {
    this.ipcRenderer = ipcRenderer;
  }

  public send<T>(channel: string, request: IpcRequest): PromisedIpcResponse<T> {
    if (!this.ipcRenderer) {
      throw new Error(`Unable to require renderer process`);
    }
    const responseChannel = request?.responseChannel ?? `${channel}_response`;
    const { ipcRenderer } = this;

    if (!ipcRenderer) {
      throw new Error(`Unable to send message to channel ${channel}`);
    }

    ipcRenderer.send(channel, request);

    return new Promise((resolve) => {
      return ipcRenderer.once(responseChannel, (_event, response) =>
        resolve(response)
      );
    });
  }
}
