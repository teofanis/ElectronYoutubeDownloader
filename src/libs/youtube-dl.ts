/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable global-require */
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

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static').replace(
  'app.asar',
  'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
  'app.asar',
  'app.asar.unpacked'
);

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

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
          const { title, author, lengthSeconds } = videoDetails;
          const audioStream = ytdl.downloadFromInfo(resource, {
            quality: 'highestaudio',
          });
          const downloadPath = path.join(
            DEFAULT_DOWNLOAD_FOLDER,
            sanitizeFileName(`${title}.mp3-tmp`)
          );
          const destinationPath = path.join(
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
              updateMetadata(youtubeLink, { title, author, lengthSeconds });
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
            // const shell = require('any-shell-escape');
            // const convertToMp3 = shell([
            //   ffmpeg,
            //   '-y',
            //   '-v',
            //   'error',
            //   '-i',
            //   downloadPath,
            //   '-acodec',
            //   'mp3',
            //   '-format',
            //   'mp3',
            //   destinationPath,
            // ]);
            // exec(convertToMp3, (err: any) => {
            //   if (err) {
            //     console.error(err);
            //     fs.unlink(downloadPath, () => {});
            //     reject(new Error(`Failed to convert ${title}`));
            //     return;
            //   }
            //   fs.unlink(downloadPath, () => {});
            //   resolve({ status: 'success' });
            // });

            const command = ffmpeg()
              .input(downloadPath)
              .output(destinationPath)
              .outputFormat('mp3')
              .noVideo()
              .audioCodec('libmp3lame')
              .audioBitrate(128)
              .on('progress', (progress) => {
                console.log(`Processing: ${progress.percent}% done`);
              })
              .on('end', () => {
                fs.unlink(downloadPath, () => {});
                resolve({ status: 'success' });
              })
              .on('error', (error: any) => {
                console.error(error);
                fs.unlink(downloadPath, () => {});
                reject(new Error(`Failed to convert ${title}`));
              });

            command.run();
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
