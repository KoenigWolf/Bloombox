import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateEGiftToken,
  isEGiftValid,
  getEGiftClaimUrl,
  type EGift,
  type EGiftStatus,
} from './types';

// Helper to create mock eGift
function createMockEGift(overrides: Partial<EGift> = {}): EGift {
  return {
    id: 'egift-001',
    orderId: 'order-001',
    token: 'abc123xyz456',
    senderName: '山田太郎',
    recipientName: '佐藤花子',
    message: 'お誕生日おめでとう！',
    status: 'pending' as EGiftStatus,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    claimedAt: null,
    shippingAddress: null,
    ...overrides,
  };
}

describe('generateEGiftToken', () => {
  it('should generate a 24 character token', () => {
    const token = generateEGiftToken();
    expect(token).toHaveLength(24);
  });

  it('should only contain alphanumeric characters', () => {
    const token = generateEGiftToken();
    expect(token).toMatch(/^[A-Za-z0-9]+$/);
  });

  it('should generate unique tokens', () => {
    const tokens = new Set<string>();
    for (let i = 0; i < 100; i++) {
      tokens.add(generateEGiftToken());
    }
    // All tokens should be unique
    expect(tokens.size).toBe(100);
  });
});

describe('isEGiftValid', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-03-15T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return false for expired status', () => {
    const egift = createMockEGift({ status: 'expired' });
    expect(isEGiftValid(egift)).toBe(false);
  });

  it('should return true for claimed status', () => {
    const egift = createMockEGift({ status: 'claimed' });
    expect(isEGiftValid(egift)).toBe(true);
  });

  it('should return true for shipped status', () => {
    const egift = createMockEGift({ status: 'shipped' });
    expect(isEGiftValid(egift)).toBe(true);
  });

  it('should return true for delivered status', () => {
    const egift = createMockEGift({ status: 'delivered' });
    expect(isEGiftValid(egift)).toBe(true);
  });

  it('should return true for pending status with future expiration', () => {
    const egift = createMockEGift({
      status: 'pending',
      expiresAt: new Date('2024-03-20T12:00:00').toISOString(),
    });
    expect(isEGiftValid(egift)).toBe(true);
  });

  it('should return false for pending status with past expiration', () => {
    const egift = createMockEGift({
      status: 'pending',
      expiresAt: new Date('2024-03-10T12:00:00').toISOString(),
    });
    expect(isEGiftValid(egift)).toBe(false);
  });

  it('should return false when expiration is exactly now', () => {
    const egift = createMockEGift({
      status: 'pending',
      expiresAt: new Date('2024-03-15T12:00:00').toISOString(),
    });
    expect(isEGiftValid(egift)).toBe(false);
  });
});

describe('getEGiftClaimUrl', () => {
  it('should generate URL with default base', () => {
    const url = getEGiftClaimUrl('abc123');
    expect(url).toContain('/gift/abc123');
  });

  it('should include the token in the URL', () => {
    const token = 'myUniqueToken123';
    const url = getEGiftClaimUrl(token);
    expect(url).toContain(token);
  });

  it('should handle special characters in token', () => {
    const token = 'token_with-dash';
    const url = getEGiftClaimUrl(token);
    expect(url).toContain(token);
  });
});

describe('EGift type', () => {
  it('should allow valid EGift object', () => {
    const egift: EGift = createMockEGift();

    expect(egift.id).toBeDefined();
    expect(egift.orderId).toBeDefined();
    expect(egift.token).toBeDefined();
    expect(egift.senderName).toBeDefined();
    expect(egift.status).toBeDefined();
    expect(egift.expiresAt).toBeDefined();
  });

  it('should allow null recipientName', () => {
    const egift: EGift = createMockEGift({ recipientName: null });
    expect(egift.recipientName).toBeNull();
  });

  it('should allow null message', () => {
    const egift: EGift = createMockEGift({ message: null });
    expect(egift.message).toBeNull();
  });

  it('should allow null shippingAddress', () => {
    const egift: EGift = createMockEGift({ shippingAddress: null });
    expect(egift.shippingAddress).toBeNull();
  });
});

describe('EGiftStatus type', () => {
  it('should accept all valid status values', () => {
    const statuses: EGiftStatus[] = ['pending', 'claimed', 'shipped', 'delivered', 'expired'];

    statuses.forEach(status => {
      const egift = createMockEGift({ status });
      expect(egift.status).toBe(status);
    });
  });
});
