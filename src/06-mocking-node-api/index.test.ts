// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { readFile } from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const fn = jest.fn();
    const time = 1000;
    doStuffByTimeout(fn, time);
    jest.advanceTimersByTime(time);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const fn = jest.fn();
    const time = 1000;
    doStuffByTimeout(fn, time);
    jest.advanceTimersByTime(time - 1);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1); 
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const fn = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    const interval = 1000;
    doStuffByInterval(fn, interval);
    expect(spy).toHaveBeenCalledWith(fn, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fn = jest.fn();
    const interval = 1000;
    doStuffByInterval(fn, interval);
    jest.advanceTimersByTime(interval);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const file = 'index.ts';
    const fn = jest.spyOn(path, 'join');
    await readFileAsynchronously(file);
    expect(fn).toHaveBeenCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    const file = 'index.pp';
    expect(await readFileAsynchronously(file)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const file = 'index.ts';
    const read = (await readFile(path.join(__dirname, file))).toString()
    expect(await readFileAsynchronously(file)).toBe(read);
  });
});
