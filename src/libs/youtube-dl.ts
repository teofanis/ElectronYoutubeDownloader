import { app } from 'electron';
/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
import {
  getDownloadableItem,
  updateDownloadProgress,
  updateMetadata,
} from '../main/reducers/Downloader';
import { sanitizeFileName } from '../utils';

export async function getYoutubeLinkInfo(youtubeLink: string) {
  return ytdl.getInfo(youtubeLink);
}

export async function downloadMP3(youtubeLink: string) {
  const DEFAULT_DOWNLOAD_FOLDER = app.getPath('downloads');
  return new Promise<{ status: string }>((resolve, reject) => {
    return (
      ytdl
        .getInfo(youtubeLink)
        // eslint-disable-next-line promise/always-return
        .then((resource) => {
          const { videoDetails } = resource;
          const { title } = videoDetails;
          const audioStream = ytdl.downloadFromInfo(resource, {
            quality: 'highestaudio',
          });
          const downloadPath = path.join(
            DEFAULT_DOWNLOAD_FOLDER,
            sanitizeFileName(`${title}.mp3`)
          );
          const fileStream = fs.createWriteStream(downloadPath);

          const cancelDownload = () => {
            audioStream.destroy();
            fileStream.close();
            fs.unlink(downloadPath, () => {});
            resolve({ status: 'cancelled' });
          };

          audioStream.on('response', (response) => {
            const item = getDownloadableItem(youtubeLink);
            const fileSize = response.headers['content-length'];
            if (!item?.metadata) {
              updateMetadata(youtubeLink, videoDetails);
            }
            let downloaded = 0;
            response.on('data', (data: string | any[]) => {
              const downloadableItem = getDownloadableItem(youtubeLink);
              if (downloadableItem?.status === 'cancelled') {
                cancelDownload();
              }
              downloaded += data.length;
              const percentage = ((downloaded / fileSize) * 100).toFixed(2);
              updateDownloadProgress(youtubeLink, Number(percentage));
            });
          });

          audioStream.on('error', () => {
            fs.unlink(downloadPath, () => {});
            reject(new Error(`Failed to download ${title}`));
          });

          audioStream.on('end', () => {
            fileStream.close();
            resolve({ status: 'success' });
          });

          audioStream.pipe(fileStream);
        })
        .catch((error) => {
          reject(error);
        })
      // .finally(() => console.log('It is what it is...'))
    );
  });
}
