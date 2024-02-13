// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(500);
    expect(bankAccount.getBalance()).toEqual(500)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(500);
    expect(() => bankAccount.withdraw(1500)).toThrowError();
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(500);
    const secondBankAccount = getBankAccount(500);
    expect(() => bankAccount.transfer(1500, secondBankAccount)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(500);
    expect(() => bankAccount.transfer(1500, bankAccount)).toThrowError();
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(500);
    bankAccount.deposit(500);
    expect(bankAccount.getBalance()).toEqual(1000);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(500);
    bankAccount.withdraw(500);
    expect(bankAccount.getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(500);
    const secondBankAccount = getBankAccount(500);
    bankAccount.transfer(500, secondBankAccount);
    expect(bankAccount.getBalance()).toEqual(0);
    expect(secondBankAccount.getBalance()).toEqual(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(500);
    const result = await bankAccount.fetchBalance();
    if (typeof result === 'number') {
      expect(typeof result).toBe(typeof 500);
    } else {
      expect(result).toBeNull();
    }
    
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(500);
    const result = await bankAccount.fetchBalance();
    const spy = jest.spyOn(bankAccount, 'fetchBalance');
    if (typeof result === 'number') {
      spy.mockResolvedValue(500);
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).toBe(500);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(500);
    const spy = jest.spyOn(bankAccount, 'fetchBalance');
    spy.mockResolvedValue(null);
    expect(bankAccount.synchronizeBalance()).rejects.toThrowError();
  });
});
