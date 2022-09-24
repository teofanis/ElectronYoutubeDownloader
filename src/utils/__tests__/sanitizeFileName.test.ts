import { sanitizeFileName } from "utils/sanitizeFileName";


describe('sanitizeFileName', () => {
  it('should remove all invalid characters', () => {
    const fileName = 'test<>:"/\\|?*';
    const result = sanitizeFileName(fileName);
    expect(result).toBe('test');
  });

  it('should not remove valid characters', () => {
    const fileName = 'test';
    const result = sanitizeFileName(fileName);
    expect(result).toBe('test');
  });
});
