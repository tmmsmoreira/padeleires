import { describe, it, expect, vi } from 'vitest';
import { generateAlphanumericCode, debounce, formatDate } from '../index'; // Replace with the correct path

describe('generateAlphanumericCode', () => {
  it('should generate a code of the specified length', () => {
    const length = 12;
    const code = generateAlphanumericCode(length);
    expect(code).toHaveLength(length);
  });

  it('should generate a code with only alphanumeric characters', () => {
    const code = generateAlphanumericCode();
    expect(code).toMatch(/^[A-Z0-9]+$/); // Adjust regex if you need to include lowercase letters
  });

  it('should use the default length of 10 when no length is provided', () => {
    const code = generateAlphanumericCode();
    expect(code).toHaveLength(10);
  });

  it('should return the code in uppercase', () => {
    const code = generateAlphanumericCode();
    expect(code).toEqual(code.toUpperCase());
  });
});

describe('debounce', () => {
  it('should debounce the provided function', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);
    
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();
    
    expect(func).not.toHaveBeenCalled();
    
    // Wait for more than the debounce delay
    return new Promise((resolve) => setTimeout(resolve, 150)).then(() => {
      expect(func).toHaveBeenCalled();
    });
  });

  it('should call the function only once after the delay', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);
    
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();
    
    return new Promise((resolve) => setTimeout(resolve, 150)).then(() => {
      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});

describe('formatDate', () => {
  it('should format a date string into DD/MM/YYYY format', () => {
    const dateText = '2024-09-08';
    const formattedDate = formatDate(dateText);
    expect(formattedDate).toBe('08/09/2024');
  });

  it('should handle invalid date strings gracefully', () => {
    const dateText = 'invalid-date';
    const formattedDate = formatDate(dateText);
    expect(formattedDate).toBe('Invalid Date'); // Adjust according to the actual implementation
  });

  it('should handle edge cases', () => {
    const dateText = '2000-02-29'; // Leap year date
    const formattedDate = formatDate(dateText);
    expect(formattedDate).toBe('29/02/2000');
  });
});
