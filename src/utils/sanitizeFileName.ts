export default function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[<>:"/\\|?*]/g, '');
}
