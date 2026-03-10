import { describe, it, expect } from 'vitest';
import {
  RANK_THRESHOLDS,
  MILES_RATE,
  RESCUE_FLOWER_BONUS,
  calculateMilesToNextRank,
  getRankBenefits,
  type MilesBalance,
  type MilesRedemption,
} from './types';

describe('Constants', () => {
  describe('RANK_THRESHOLDS', () => {
    it('should have correct threshold values', () => {
      expect(RANK_THRESHOLDS.bronze).toBe(0);
      expect(RANK_THRESHOLDS.silver).toBe(1000);
      expect(RANK_THRESHOLDS.gold).toBe(5000);
      expect(RANK_THRESHOLDS.platinum).toBe(10000);
    });

    it('should have thresholds in ascending order', () => {
      expect(RANK_THRESHOLDS.bronze).toBeLessThan(RANK_THRESHOLDS.silver);
      expect(RANK_THRESHOLDS.silver).toBeLessThan(RANK_THRESHOLDS.gold);
      expect(RANK_THRESHOLDS.gold).toBeLessThan(RANK_THRESHOLDS.platinum);
    });
  });

  describe('MILES_RATE', () => {
    it('should be 0.01 (1%)', () => {
      expect(MILES_RATE).toBe(0.01);
    });

    it('should calculate correct miles for purchases', () => {
      const purchaseAmount = 10000;
      const expectedMiles = purchaseAmount * MILES_RATE;
      expect(expectedMiles).toBe(100);
    });
  });

  describe('RESCUE_FLOWER_BONUS', () => {
    it('should be 2 (double miles)', () => {
      expect(RESCUE_FLOWER_BONUS).toBe(2);
    });
  });
});

describe('calculateMilesToNextRank', () => {
  describe('bronze rank', () => {
    it('should calculate miles needed for silver', () => {
      const result = calculateMilesToNextRank('bronze', 0);
      expect(result.nextRank).toBe('silver');
      expect(result.milesNeeded).toBe(1000);
    });

    it('should calculate remaining miles when partially there', () => {
      const result = calculateMilesToNextRank('bronze', 500);
      expect(result.nextRank).toBe('silver');
      expect(result.milesNeeded).toBe(500);
    });

    it('should return 0 when already past threshold', () => {
      const result = calculateMilesToNextRank('bronze', 1500);
      expect(result.nextRank).toBe('silver');
      expect(result.milesNeeded).toBe(0);
    });
  });

  describe('silver rank', () => {
    it('should calculate miles needed for gold', () => {
      const result = calculateMilesToNextRank('silver', 1000);
      expect(result.nextRank).toBe('gold');
      expect(result.milesNeeded).toBe(4000);
    });

    it('should calculate remaining miles when partially there', () => {
      const result = calculateMilesToNextRank('silver', 3000);
      expect(result.nextRank).toBe('gold');
      expect(result.milesNeeded).toBe(2000);
    });
  });

  describe('gold rank', () => {
    it('should calculate miles needed for platinum', () => {
      const result = calculateMilesToNextRank('gold', 5000);
      expect(result.nextRank).toBe('platinum');
      expect(result.milesNeeded).toBe(5000);
    });

    it('should calculate remaining miles when partially there', () => {
      const result = calculateMilesToNextRank('gold', 8000);
      expect(result.nextRank).toBe('platinum');
      expect(result.milesNeeded).toBe(2000);
    });
  });

  describe('platinum rank', () => {
    it('should return null for next rank', () => {
      const result = calculateMilesToNextRank('platinum', 10000);
      expect(result.nextRank).toBeNull();
      expect(result.milesNeeded).toBe(0);
    });

    it('should return null even with more miles', () => {
      const result = calculateMilesToNextRank('platinum', 50000);
      expect(result.nextRank).toBeNull();
      expect(result.milesNeeded).toBe(0);
    });
  });
});

describe('getRankBenefits', () => {
  it('should return bronze benefits', () => {
    const benefits = getRankBenefits('bronze');
    expect(benefits).toBeInstanceOf(Array);
    expect(benefits.length).toBeGreaterThan(0);
    expect(benefits[0]).toContain('基本マイル');
  });

  it('should return silver benefits with more items than bronze', () => {
    const bronzeBenefits = getRankBenefits('bronze');
    const silverBenefits = getRankBenefits('silver');
    expect(silverBenefits.length).toBeGreaterThan(bronzeBenefits.length);
  });

  it('should return gold benefits with more items than silver', () => {
    const silverBenefits = getRankBenefits('silver');
    const goldBenefits = getRankBenefits('gold');
    expect(goldBenefits.length).toBeGreaterThan(silverBenefits.length);
  });

  it('should return platinum benefits with most items', () => {
    const goldBenefits = getRankBenefits('gold');
    const platinumBenefits = getRankBenefits('platinum');
    expect(platinumBenefits.length).toBeGreaterThan(goldBenefits.length);
  });

  it('should include birthday bonus for silver and above', () => {
    const silverBenefits = getRankBenefits('silver');
    const goldBenefits = getRankBenefits('gold');
    const platinumBenefits = getRankBenefits('platinum');

    expect(silverBenefits.some(b => b.includes('誕生日'))).toBe(true);
    expect(goldBenefits.some(b => b.includes('誕生日'))).toBe(true);
    expect(platinumBenefits.some(b => b.includes('誕生日'))).toBe(true);
  });

  it('should include shipping benefits for gold and platinum', () => {
    const goldBenefits = getRankBenefits('gold');
    const platinumBenefits = getRankBenefits('platinum');

    expect(goldBenefits.some(b => b.includes('送料'))).toBe(true);
    expect(platinumBenefits.some(b => b.includes('送料'))).toBe(true);
  });

  it('should include exclusive benefits for platinum', () => {
    const platinumBenefits = getRankBenefits('platinum');

    expect(platinumBenefits.some(b => b.includes('優先配送'))).toBe(true);
    expect(platinumBenefits.some(b => b.includes('限定商品'))).toBe(true);
  });
});

describe('MilesBalance type', () => {
  it('should accept valid MilesBalance object', () => {
    const balance: MilesBalance = {
      currentMiles: 500,
      lifetimeMiles: 1500,
      rank: 'silver',
      nextRank: 'gold',
      milesUntilNextRank: 3500,
    };

    expect(balance.currentMiles).toBe(500);
    expect(balance.lifetimeMiles).toBe(1500);
    expect(balance.rank).toBe('silver');
    expect(balance.nextRank).toBe('gold');
    expect(balance.milesUntilNextRank).toBe(3500);
  });

  it('should allow null nextRank for platinum', () => {
    const balance: MilesBalance = {
      currentMiles: 5000,
      lifetimeMiles: 15000,
      rank: 'platinum',
      nextRank: null,
      milesUntilNextRank: 0,
    };

    expect(balance.nextRank).toBeNull();
    expect(balance.milesUntilNextRank).toBe(0);
  });
});

describe('MilesRedemption type', () => {
  it('should accept valid MilesRedemption object', () => {
    const redemption: MilesRedemption = {
      id: 'redeem-001',
      name: '500円割引クーポン',
      description: '次回のご注文で使える500円割引',
      requiredMiles: 500,
      category: 'discount',
    };

    expect(redemption.id).toBeDefined();
    expect(redemption.name).toBeDefined();
    expect(redemption.category).toBe('discount');
  });

  it('should accept all valid categories', () => {
    const categories: MilesRedemption['category'][] = ['discount', 'gift', 'upgrade', 'donation'];

    categories.forEach(category => {
      const redemption: MilesRedemption = {
        id: 'test',
        name: 'Test',
        description: 'Test',
        requiredMiles: 100,
        category,
      };
      expect(redemption.category).toBe(category);
    });
  });
});
