/* eslint-disable import/prefer-default-export */
// eslint-disable import/prefer-default-export
// const youtubedl = require('youtube-dl-exec');
import youtubedl from 'youtube-dl-exec';

export async function downloadMP3(youtubeLink: string) {
  return youtubedl(youtubeLink, {
    extractAudio: true,
    audioFormat: 'mp3',
  });
}
