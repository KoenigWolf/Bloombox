import type { MilesBalance, MilesRedemption, ImpactSummary } from './types';
import type { FlowerMilesTransaction, CustomerRank } from '@/lib/supabase/types';
import { calculateMilesToNextRank, RANK_THRESHOLDS } from './types';

// Mock data for development
const mockTransactions: FlowerMilesTransaction[] = [
  {
    id: 'tx-1',
    customer_id: 'customer-1',
    order_id: 'order-1',
    transaction_type: 'earned',
    amount: 55,
    balance_after: 155,
    description: '注文 #BB-2024-0001',
    expires_at: '2025-03-01',
    created_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'tx-2',
    customer_id: 'customer-1',
    order_id: 'order-2',
    transaction_type: 'earned',
    amount: 110,
    balance_after: 265,
    description: '注文 #BB-2024-0002（レスキューフラワーボーナス）',
    expires_at: '2025-03-15',
    created_at: '2024-03-15T14:30:00Z',
  },
  {
    id: 'tx-3',
    customer_id: 'customer-1',
    order_id: null,
    transaction_type: 'redeemed',
    amount: -100,
    balance_after: 165,
    description: '500円OFFクーポン交換',
    expires_at: null,
    created_at: '2024-03-20T09:00:00Z',
  },
];

const mockRedemptions: MilesRedemption[] = [
  {
    id: 'redemption-1',
    name: '500円OFFクーポン',
    description: '次回のお買い物で使える500円引きクーポン',
    requiredMiles: 100,
    category: 'discount',
  },
  {
    id: 'redemption-2',
    name: '1,000円OFFクーポン',
    description: '次回のお買い物で使える1,000円引きクーポン',
    requiredMiles: 180,
    category: 'discount',
  },
  {
    id: 'redemption-3',
    name: '送料無料クーポン',
    description: '次回のお買い物で送料無料',
    requiredMiles: 80,
    category: 'discount',
  },
  {
    id: 'redemption-4',
    name: 'ミニブーケ',
    description: '季節のミニブーケをプレゼント',
    requiredMiles: 300,
    category: 'gift',
  },
  {
    id: 'redemption-5',
    name: 'ラッピングアップグレード',
    description: 'プレミアムラッピングに無料アップグレード',
    requiredMiles: 50,
    category: 'upgrade',
  },
  {
    id: 'redemption-6',
    name: '花の保護活動に寄付',
    description: 'あなたのマイルを花の保護活動に寄付',
    requiredMiles: 100,
    category: 'donation',
  },
];

export async function getMilesBalance(
  _userId: string
): Promise<MilesBalance> {
  // In production, fetch from Supabase
  const currentMiles = 165;
  const lifetimeMiles = 320;
  const rank: CustomerRank = 'bronze';

  const { nextRank, milesNeeded } = calculateMilesToNextRank(rank, lifetimeMiles);

  return {
    currentMiles,
    lifetimeMiles,
    rank,
    nextRank,
    milesUntilNextRank: milesNeeded,
  };
}

export async function getMilesTransactions(
  _userId: string,
  _limit?: number
): Promise<FlowerMilesTransaction[]> {
  // In production, fetch from Supabase
  return mockTransactions;
}

export async function getRedemptionOptions(): Promise<MilesRedemption[]> {
  return mockRedemptions;
}

export async function getAvailableRedemptions(
  currentMiles: number
): Promise<MilesRedemption[]> {
  return mockRedemptions.filter((r) => r.requiredMiles <= currentMiles);
}

export async function getFlowerImpact(
  _userId: string
): Promise<ImpactSummary> {
  // In production, fetch from Supabase
  const impact = {
    id: 'impact-1',
    customer_id: 'customer-1',
    total_orders: 5,
    total_flowers_purchased: 25,
    rescued_flowers_count: 8,
    carbon_offset_total_kg: 2.5,
    farmers_supported: 3,
    updated_at: '2024-03-15T00:00:00Z',
  };

  // Generate comparison text based on impact
  let comparisonText = '';
  if (impact.rescued_flowers_count > 0) {
    comparisonText = `あなたは${impact.rescued_flowers_count}本の花を救い、${impact.carbon_offset_total_kg}kgのCO2を削減しました。これは約${Math.round(impact.carbon_offset_total_kg * 0.5)}本の木が1年間で吸収するCO2に相当します。`;
  }

  return {
    ...impact,
    comparisonText,
  };
}

export function getRankProgress(lifetimeMiles: number): {
  currentRank: CustomerRank;
  progress: number;
  currentThreshold: number;
  nextThreshold: number;
} {
  let currentRank: CustomerRank = 'bronze';
  let currentThreshold: number = RANK_THRESHOLDS.bronze;
  let nextThreshold: number = RANK_THRESHOLDS.silver;

  if (lifetimeMiles >= RANK_THRESHOLDS.platinum) {
    currentRank = 'platinum';
    currentThreshold = RANK_THRESHOLDS.platinum;
    nextThreshold = RANK_THRESHOLDS.platinum;
  } else if (lifetimeMiles >= RANK_THRESHOLDS.gold) {
    currentRank = 'gold';
    currentThreshold = RANK_THRESHOLDS.gold;
    nextThreshold = RANK_THRESHOLDS.platinum;
  } else if (lifetimeMiles >= RANK_THRESHOLDS.silver) {
    currentRank = 'silver';
    currentThreshold = RANK_THRESHOLDS.silver;
    nextThreshold = RANK_THRESHOLDS.gold;
  }

  const progress =
    currentRank === 'platinum'
      ? 100
      : Math.min(
          100,
          ((lifetimeMiles - currentThreshold) / (nextThreshold - currentThreshold)) * 100
        );

  return { currentRank, progress, currentThreshold, nextThreshold };
}
