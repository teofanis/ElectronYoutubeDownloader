/* eslint-disable global-require */
/* eslint-disable promise/always-return */
/* eslint-disable no-case-declarations */
/* eslint-disable import/no-named-as-default-member */
import path from 'path';
import { getYoutubeLinkInfo } from '../libs/youtube-dl';
import { setState } from '../main/store';
import { errorResponse, successResponse, validateYoutubeLink } from '../utils';
/* eslint-disable class-methods-use-this */
import {
  DownloadQueueItem,
  IpcChannelInterface,
  IpcRequest,
} from '../interfaces';
import { DownloaderActions } from '../main/actions/Downloader';
import { DownloaderReducer, updateMetadata } from '../main/reducers/Downloader';

export default class DownloaderChannel implements IpcChannelInterface {
  getName(): string {
    return 'downloader-channel';
  }

  handleFileDialog(): {
    status: string;
    file?: string;
    message?: string;
    data?: string[];
    error?: string;
  } {
    const { dialog } = require('electron');
    const selectedFile = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
    });
    if (!selectedFile?.length) {
      return {
        status: 'error',
        message: 'No file selected',
      };
    }
    let reply = {
      status: 'success',
      file: path.basename(selectedFile[0]),
      data: [],
    };
    try {
      const fs = require('fs');
      const data = fs.readFileSync(selectedFile[0], 'utf8');
      const urls = data.trim().split('\n');
      const validatedUrls = urls
        .map((url: string) => url.trim())
        .filter((url: string) => validateYoutubeLink(url));
      reply = { ...reply, data: validatedUrls };
    } catch (err) {
      console.error(err);
      reply = { ...reply, status: 'error' };
    }
    return reply;
  }

  handle(event: Electron.IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }
    const { responseChannel } = request;
    const { action, payload } = request;
    if (!action || !payload) return;
    const {
      START_DOWNLOAD,
      CANCEL_DOWNLOAD,
      ADD_TO_DOWNLOAD_QUEUE,
      CLEAR_DOWNLOAD_QUEUE,
      REMOVE_FROM_DOWNLOAD_QUEUE,
      DOWNLOAD_FROM_TEXT_FILE,
      LOAD_LINK_METADATA,
    } = DownloaderActions;
    switch (action) {
      case ADD_TO_DOWNLOAD_QUEUE:
        setState((state) =>
          DownloaderReducer[ADD_TO_DOWNLOAD_QUEUE](
            state,
            payload as DownloadQueueItem
          )
        );
        break;
      case REMOVE_FROM_DOWNLOAD_QUEUE:
        setState((state) =>
          DownloaderReducer[REMOVE_FROM_DOWNLOAD_QUEUE](
            state,
            payload as DownloadQueueItem
          )
        );
        break;
      case START_DOWNLOAD:
        const item = payload as DownloadQueueItem;
        setState((state) => DownloaderReducer[START_DOWNLOAD](state, item));

        break;
      case CANCEL_DOWNLOAD:
        setState((state) =>
          DownloaderReducer[CANCEL_DOWNLOAD](
            state,
            payload as DownloadQueueItem
          )
        );
        break;
      case CLEAR_DOWNLOAD_QUEUE:
        setState((state) =>
          DownloaderReducer[CLEAR_DOWNLOAD_QUEUE](
            state,
            {} as DownloadQueueItem
          )
        );
        break;
      case DOWNLOAD_FROM_TEXT_FILE:
        const { status, file, data } = this.handleFileDialog();
        if (status === 'success' && data) {
          event.sender.send(
            responseChannel,
            successResponse(this, 'File selected', { file, data })
          );
        } else {
          event.sender.send(
            responseChannel,
            errorResponse(this, 'Failed to start download')
          );
        }
        break;
      case LOAD_LINK_METADATA:
        const { url } = payload as DownloadQueueItem;
        getYoutubeLinkInfo(url)
          .then((response) => {
            const { videoDetails } = response;
            updateMetadata(url, videoDetails);
            event.sender.send(
              responseChannel,
              successResponse(this, 'Info Retrieved', videoDetails)
            );
          })
          .catch((error) => {
            console.log(error);
            event.sender.send(
              responseChannel,
              errorResponse(this, 'Failed to get youtube link info')
            );
          });
        break;
      default:
        break;
    }
    console.log(request);
  }
}
