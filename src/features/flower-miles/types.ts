import type {
  FlowerMilesTransaction,
  UserFlowerImpact,
  CustomerRank,
} from '@/lib/supabase/types';

export interface MilesBalance {
  currentMiles: number;
  lifetimeMiles: number;
  rank: CustomerRank;
  nextRank: CustomerRank | null;
  milesUntilNextRank: number;
}

export interface MilesRedemption {
  id: string;
  name: string;
  description: string;
  requiredMiles: number;
  category: 'discount' | 'gift' | 'upgrade' | 'donation';
}

export interface ImpactSummary extends UserFlowerImpact {
  comparisonText: string;
}

// Rank thresholds
export const RANK_THRESHOLDS = {
  bronze: 0,
  silver: 1000,
  gold: 5000,
  platinum: 10000,
} as const;

// Miles earning rate (1 yen = 0.01 miles, so 100 yen = 1 mile)
export const MILES_RATE = 0.01;

// Rescue flower bonus (x2 miles)
export const RESCUE_FLOWER_BONUS = 2;

export function calculateMilesToNextRank(
  currentRank: CustomerRank,
  lifetimeMiles: number
): { nextRank: CustomerRank | null; milesNeeded: number } {
  const rankOrder: CustomerRank[] = ['bronze', 'silver', 'gold', 'platinum'];
  const currentIndex = rankOrder.indexOf(currentRank);

  if (currentIndex === rankOrder.length - 1) {
    return { nextRank: null, milesNeeded: 0 };
  }

  const nextRank = rankOrder[currentIndex + 1];
  const milesNeeded = RANK_THRESHOLDS[nextRank] - lifetimeMiles;

  return {
    nextRank,
    milesNeeded: Math.max(0, milesNeeded),
  };
}

export function getRankBenefits(rank: CustomerRank): string[] {
  const benefits: Record<CustomerRank, string[]> = {
    bronze: ['基本マイル付与（1円=0.01マイル）'],
    silver: [
      '基本マイル付与（1円=0.01マイル）',
      'マイル還元率1.2倍',
      '誕生日月マイル2倍',
    ],
    gold: [
      '基本マイル付与（1円=0.01マイル）',
      'マイル還元率1.5倍',
      '誕生日月マイル2倍',
      '送料無料クーポン（年2回）',
    ],
    platinum: [
      '基本マイル付与（1円=0.01マイル）',
      'マイル還元率2倍',
      '誕生日月マイル3倍',
      '送料無料（常時）',
      '優先配送',
      '限定商品先行販売',
    ],
  };

  return benefits[rank];
}

export type { FlowerMilesTransaction, UserFlowerImpact };
