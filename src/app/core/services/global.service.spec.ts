import { TestBed } from '@angular/core/testing';

import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test valid cases
  it('should round a number to the default precision of 2', () => {
    const result = service.roundNumber(3.125);
    expect(result).toBe(3.13);
  });

  it('should round a number to the specified precision of 4', () => {
    const result = service.roundNumber(3.14159, 4);
    expect(result).toBe(3.1416);
  });

  it('should round a negative number to the specified precision of 3', () => {
    const result = service.roundNumber(-3.14159, 3);
    expect(result).toBe(-3.142);
  });

  // Test edge cases
  it('should round a very small number to the specified precision', () => {
    const result = service.roundNumber(0.0004567, 4);
    expect(result).toBe(0.0005);
  });

  it('should handle zero correctly', () => {
    const result = service.roundNumber(0, 3);
    expect(result).toBe(0);
  });

  // Test invalid input cases
  it('should throw an error if _number is not a valid number', () => {
    const result = service.roundNumber('string' as any, 2);
    expect(result).toBe('Error: Invalid input: _number must be a valid number.');
  });

  it('should throw an error if _precision is a negative value', () => {
    const result = service.roundNumber(3.14159, -2);
    expect(result).toBe('Error: Invalid input: _precision must be a non-negative integer.');
  });

  it('should throw an error if _precision is not an integer', () => {
    const result = service.roundNumber(3.14159, 2.5 as any);
    expect(result).toBe('Error: Invalid input: _precision must be a non-negative integer.');
  });

  it('should throw an error if _precision is not a valid number', () => {
    const result = service.roundNumber(3.14159, 'two' as any);
    expect(result).toBe('Error: Invalid input: _precision must be a non-negative integer.');
  });

});
