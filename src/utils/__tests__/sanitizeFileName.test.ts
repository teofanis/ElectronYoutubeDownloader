import { sanitizeFileName } from '../index';

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
