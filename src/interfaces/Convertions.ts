/* eslint-disable @typescript-eslint/ban-types */
export type ConversionFunction = (
  inputFile: string,
  outputFile: string,
  onError: Function,
  onSuccess: Function,
  onProgress: Function
) => void;
