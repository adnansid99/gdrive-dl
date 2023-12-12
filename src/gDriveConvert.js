export default function gDriveConvert(url) {
  const regexFileId = /\/file\/d\/([\w-]+)\//;
  const regexOpenId = /\/open\?id=([\w-]+)/;
  const regexDownloadId = /\/uc\?export=download&id=([\w-]+)/;

  let match =
    url.match(regexFileId) ||
    url.match(regexOpenId) ||
    url.match(regexDownloadId);

  if (match) {
    return match[1];
  }

  return null;
}
