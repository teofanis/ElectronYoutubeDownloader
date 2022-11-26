import fs from 'fs';
import { ConversionFunction } from 'interfaces';
import { ytdl } from 'ytdl-core';
import { convertToMP3 } from '../libs/ffmpeg';
import { getYoutubeLinkInfo, youtubeDownload } from '../libs/youtube-dl';
import { sanitizeFileName } from '../utils/index';
import {
  getDownloadableItem,
  updateDownloadProgress,
  updateMetadata,
} from './reducers/Downloader';
import { getDownloadPath } from './util';

type Extension = 'mp3' | 'mp4';
type DownloadOutcome = 'success' | 'cancelled' | 'error';

const download = (
  ytdlResource: ytdl.videoInfo,
  ytdlDownloadOptions: ytdl.downloadOptions,
  downloadPath: string,
  destinationPath: string,
  youtubeLink: string,
  conversionFunction: ConversionFunction
) => {
  return new Promise<{ status: DownloadOutcome }>((resolve, reject) => {
    const { videoDetails } = ytdlResource;
    const { title, author, lengthSeconds } = videoDetails;

    const stream = youtubeDownload(ytdlResource, ytdlDownloadOptions);
    const fileStream = fs.createWriteStream(downloadPath);

    const cancelDownload = () => {
      stream.destroy();
      fileStream.close();
      fs.unlink(downloadPath, () => {});
      resolve({ status: 'cancelled' });
    };

    stream.on('response', (response) => {
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

    stream.on('error', () => {
      fs.unlink(downloadPath, () => {});
      reject(new Error(`Failed to download ${title}`));
    });

    stream.on('end', () => {
      fileStream.close();
      conversionFunction(
        downloadPath,
        destinationPath,
        (error: any) => {
          fs.unlink(downloadPath, () => {});
          console.log(error);
          reject(new Error(`Failed to convert ${title}`));
        },
        () => {
          fs.unlink(downloadPath, () => {});
          resolve({ status: 'success' });
        },
        (progress: number) => {
          console.log(`Processing: ${progress}% done`);
        }
      );
    });

    stream.pipe(fileStream);
  });
};

const downloadMP3 = async (youtubeLink: string) => {
  const extension: Extension = 'mp3';
  const options: ytdl.downloadOptions = {
    quality: 'highestaudio',
    filter: 'audioonly',
  };

  return getYoutubeLinkInfo(youtubeLink).then((info) => {
    const { title } = info.videoDetails;
    const downloadPath = getDownloadPath(
      sanitizeFileName(`${title}.${extension}-temp`)
    );

    const destinationPath = downloadPath.replace('-temp', '');

    return download(
      info,
      options,
      downloadPath,
      destinationPath,
      youtubeLink,
      convertToMP3
    );
  });
};

export { download, downloadMP3 };
