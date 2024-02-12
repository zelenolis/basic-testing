// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const start = [1, 2, 3];
    const finish = {next: {
      next: {
        next: {
          next: null, value: null
        }, value: 3
      }, value: 2
    }, value: 1};
    
    const actualLinkedList = generateLinkedList(start);
    expect(actualLinkedList).toStrictEqual(finish);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const secondstart = [4, 5, 6]; // Example input values
    const secondfinish = generateLinkedList(secondstart);

    // Use Jest's snapshot matcher
    expect(secondfinish).toMatchSnapshot();
  });
});
