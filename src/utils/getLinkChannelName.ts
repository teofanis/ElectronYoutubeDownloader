import generateHash from './generateHash';

export default function getLinkChannelName(
  link: string,
  channel: string
): string {
  const hash = generateHash(link);
  return `${channel}_${hash}`;
}
