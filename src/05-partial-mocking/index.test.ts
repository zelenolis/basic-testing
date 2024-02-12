// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  const mock = {
    mockOne: jest.fn(() => true),
    mockTwo: jest.fn(() => true),
    mockThree: jest.fn(() => true),
    unmockedFunction: originalModule.unmockedFunction,
  }
  return mock;
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consol = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consol).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consol = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consol).toBeCalled();
  });
});
