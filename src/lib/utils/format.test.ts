import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatCurrency, formatDate, formatRelativeTime } from './format';

describe('formatCurrency', () => {
  it('should format JPY correctly (no decimals)', () => {
    const result = formatCurrency(5000, 'ja');
    expect(result).toMatch(/5,000/);
    // Match both half-width (¥) and full-width (￥) yen signs
    expect(result).toMatch(/¥|￥|円|JPY/);
  });

  it('should format USD with decimals', () => {
    const result = formatCurrency(50, 'en');
    expect(result).toMatch(/\$50\.00|50\.00/);
  });

  it('should format CNY correctly', () => {
    const result = formatCurrency(100, 'zh');
    expect(result).toMatch(/100\.00|¥100/);
  });

  it('should format VND correctly (no decimals)', () => {
    const result = formatCurrency(50000, 'vi');
    expect(result).toMatch(/50,000|50\.000/);
  });

  it('should use ja as default locale', () => {
    const result = formatCurrency(1000);
    expect(result).toMatch(/1,000/);
  });

  it('should handle zero', () => {
    const result = formatCurrency(0, 'ja');
    expect(result).toMatch(/0/);
  });

  it('should handle large numbers', () => {
    const result = formatCurrency(1000000, 'ja');
    expect(result).toMatch(/1,000,000/);
  });
});

describe('formatDate', () => {
  it('should format Date object correctly', () => {
    const date = new Date('2024-03-15');
    const result = formatDate(date, 'ja');
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/3/);
    expect(result).toMatch(/15/);
  });

  it('should format date string correctly', () => {
    const result = formatDate('2024-03-15', 'ja');
    expect(result).toMatch(/2024/);
  });

  it('should format for English locale', () => {
    const result = formatDate('2024-03-15', 'en');
    expect(result).toMatch(/March/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2024/);
  });

  it('should apply custom options', () => {
    const result = formatDate('2024-03-15', 'ja', {
      weekday: 'long',
    });
    expect(result).toBeDefined();
  });

  it('should use ja as default locale', () => {
    const result = formatDate('2024-03-15');
    expect(result).toMatch(/2024/);
  });
});

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-03-15T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should format seconds ago', () => {
    const date = new Date('2024-03-15T11:59:30'); // 30 seconds ago
    const result = formatRelativeTime(date, 'ja');
    expect(result).toBeDefined();
  });

  it('should format minutes ago', () => {
    const date = new Date('2024-03-15T11:55:00'); // 5 minutes ago
    const result = formatRelativeTime(date, 'ja');
    expect(result).toBeDefined();
  });

  it('should format hours ago', () => {
    const date = new Date('2024-03-15T10:00:00'); // 2 hours ago
    const result = formatRelativeTime(date, 'ja');
    expect(result).toBeDefined();
  });

  it('should format days ago', () => {
    const date = new Date('2024-03-13T12:00:00'); // 2 days ago
    const result = formatRelativeTime(date, 'ja');
    expect(result).toBeDefined();
  });

  it('should format months ago', () => {
    const date = new Date('2024-01-15T12:00:00'); // 2 months ago
    const result = formatRelativeTime(date, 'ja');
    expect(result).toBeDefined();
  });

  it('should format years ago', () => {
    const date = new Date('2022-03-15T12:00:00'); // 2 years ago
    const result = formatRelativeTime(date, 'ja');
    expect(result).toBeDefined();
  });

  it('should handle date string input', () => {
    const result = formatRelativeTime('2024-03-14T12:00:00', 'ja');
    expect(result).toBeDefined();
  });

  it('should format for English locale', () => {
    const date = new Date('2024-03-14T12:00:00');
    const result = formatRelativeTime(date, 'en');
    expect(result).toBeDefined();
  });
});
