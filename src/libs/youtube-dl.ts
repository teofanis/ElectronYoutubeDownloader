import ytdl from 'ytdl-core';

export async function getYoutubeLinkInfo(youtubeLink: string) {
  return ytdl.getInfo(youtubeLink);
}

export function youtubeDownload(
  resource: ytdl.videoInfo,
  downloadOptions: ytdl.downloadOptions
) {
  return ytdl.downloadFromInfo(resource, downloadOptions);
}
