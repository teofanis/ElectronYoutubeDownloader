/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/ban-types */
const ffmpegPath = require('ffmpeg-static-electron').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

const convertToMP3 = (
  inputFile: string,
  outputFile: string,
  onError: Function,
  onSuccess: Function,
  onProgress: Function
) => {
  return ffmpeg()
    .input(inputFile)
    .output(outputFile)
    .outputFormat('mp3')
    .noVideo()
    .audioCodec('libmp3lame')
    .audioBitrate(128)
    .on('progress', (progress: { percent: any }) => {
      onProgress(progress.percent);
    })
    .on('end', () => {
      onSuccess();
    })
    .on('error', (error: any) => {
      onError(error);
    })
    .run();
};

export { convertToMP3 };
