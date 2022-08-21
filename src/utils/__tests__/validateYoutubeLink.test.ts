import { validateYoutubeLink } from '../index';

const VALID_LINKS = {
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ': true, // regular link
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ': true, // playlist
  'https://youtube.com/clip/Ugkx08lPfNWDh6OLEXxY-rtnieZ5kKDjKAr0': true, // clip link
  'https://youtu.be/dQw4w9WgXcQ': true, // short link
  'https://www.youtube.com/embed/dQw4w9WgXcQ': true, // embed link
};

const INVALID_LINKS = {
  'https://www.youtub312e.com/watch?v=dgsa': false,
  'https://www.google.com/': false,
  'https://something-else.com/': false,
};

describe('validateYoutubeLink Test', () => {
  it('should return true if the link is a valid youtube link', () => {
    Object.entries(VALID_LINKS).forEach(([link, expected]) => {
      const result = validateYoutubeLink(link);
      expect(result).toBe(expected);
    });
  });

  it('should return false if the link is not a valid youtube link', () => {
    Object.entries(INVALID_LINKS).forEach(([link, expected]) => {
      const result = validateYoutubeLink(link);
      expect(result).toBe(expected);
    });
  });
});
