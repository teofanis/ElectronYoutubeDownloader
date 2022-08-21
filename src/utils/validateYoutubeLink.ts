const validateYoutubeLink = (link: string): boolean => {
  const youtubeLinkRegex = new RegExp(
    /(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|clip|v|vi)\/))([^?&"'<> #]+)/,
    'gmi'
  );
  return youtubeLinkRegex.test(link);
};

export default validateYoutubeLink;
