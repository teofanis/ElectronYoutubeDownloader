/* eslint import/prefer-default-export: off */
import { app } from 'electron';
import path from 'path';
import { URL } from 'url';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function getDefaultDownloadFolder() {
  return app.getPath('downloads');
}

export function getDownloadPath(fileName: string) {
  const selectedDownloadFolder = getDefaultDownloadFolder(); // TODO: get from settings once they're introduced
  return path.join(selectedDownloadFolder, fileName);
}
