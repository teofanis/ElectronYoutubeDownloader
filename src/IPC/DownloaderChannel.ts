/* eslint-disable class-methods-use-this */
import { execSync } from 'child_process';
import { IpcChannelInterface, IpcRequest } from '../interfaces';
import { successResponse } from '../utils';

export default class DownloaderChannel implements IpcChannelInterface {
  getName(): string {
    return 'downloader-channel';
  }

  handle(event: Electron.IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    event.sender.send(
      request.responseChannel,
      successResponse(this, 'DOWNLOADING', {
        kernel: execSync('uname -a').toString(),
      })
    );
  }
}
