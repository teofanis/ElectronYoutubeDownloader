import { BrowserWindow, ipcMain } from 'electron';
/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
import { CONSTANTS } from '../utils/constants';

export async function downloadMP3(youtubeLink: string, win: BrowserWindow) {
  let isCancelled = false;
  ipcMain.on(CONSTANTS.CANCEL_DOWNLOAD, (event, arg) => (isCancelled = true));
  return new Promise((resolve, reject) => {
    return (
      ytdl
        .getInfo(youtubeLink, {
          quality: 'highestaudio',
        })
        // eslint-disable-next-line promise/always-return
        .then((resource) => {
          const { videoDetails } = resource;
          const { title } = videoDetails;
          const audioStream = ytdl.downloadFromInfo(resource, {
            quality: 'highestaudio',
          });

          const cancelDownload = () => audioStream.destroy();
          audioStream.on('response', (response) => {
            const fileSize = response.headers['content-length'];
            win.webContents.send(CONSTANTS.CURRENT_DOWNLOAD_META_DATA, {
              fileSize,
              title,
              videoDetails,
            });
            let downloaded = 0;
            response.on('data', (data: string | any[]) => {
              if (isCancelled) {
                cancelDownload();
              }
              downloaded += data.length;
              const percentage = ((downloaded / fileSize) * 100).toFixed(2);
              // console.log(`Percentage ${percentage}`);
              win.webContents.send(CONSTANTS.PROGRESS_UPDATE, percentage);
            });
          });

          audioStream.on('error', () => {
            reject(new Error(`Failed to download ${title}`));
          });

          audioStream.on('end', () => {
            resolve(`${title} was downloaded successfully!`);
          });

          audioStream.on('close', () => {
            resolve(`${title} download was cancelled`);
          });

          audioStream.pipe(
            fs.createWriteStream(
              path.join(`${__dirname}../../`, `${title}.mp3`)
            )
          );
        })
        .catch((error) => {
          console.log('WTF');
          reject(error);
        })
        .finally(() => console.log('It is what it is...'))
    );
  });
}
