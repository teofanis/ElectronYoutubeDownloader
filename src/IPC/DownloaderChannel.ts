/* eslint-disable import/no-named-as-default-member */
import store from '../main/store';
/* eslint-disable class-methods-use-this */
import {
  DownloadQueueItem,
  IpcChannelInterface,
  IpcRequest,
} from '../interfaces';
import { DownloaderActions } from '../main/actions/Downloader';
import { DownloaderReducer } from '../main/reducers/Downloader';

export default class DownloaderChannel implements IpcChannelInterface {
  getName(): string {
    return 'downloader-channel';
  }

  handle(event: Electron.IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const action = request.params?.action;
    const payload = request.params?.payload;
    console.log(request);
    if (!action || !payload) return;
    const { ADD_TO_DOWNLOAD_QUEUE } = DownloaderActions;
    switch (action) {
      case ADD_TO_DOWNLOAD_QUEUE:
        store.setState((state) => {
          console.log(state);
          DownloaderReducer[ADD_TO_DOWNLOAD_QUEUE](
            state,
            payload as DownloadQueueItem
          );
        });

        break;
      default:
        break;
    }
    console.log(request);
    // event.sender.send(
    //   request.responseChannel,
    //   successResponse(this, 'DOWNLOADING', {
    //     kernel: execSync('uname -a').toString(),
    //   })
    // );
  }
}
