// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const val = "myval";
    expect(await resolveValue(val)).toBe(val);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const er = 'som error';
    expect(() => throwError(er)).toThrow(er);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrowError(Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrowError(MyAwesomeError);
  });
});
