'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { claimEGiftAction } from '../actions';
import type { EGift, EGiftResult } from '../types';

interface EGiftClaimFormProps {
  egift: EGift;
}

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

export function EGiftClaimForm({ egift }: EGiftClaimFormProps) {
  const t = useTranslations('egift');
  const [claimed, setClaimed] = useState(false);

  const [state, formAction, isPending] = useActionState<
    EGiftResult | null,
    FormData
  >(claimEGiftAction, null);

  useEffect(() => {
    if (state?.success) {
      setClaimed(true);
    }
  }, [state]);

  if (claimed) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="text-center py-8">
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="text-2xl font-bold mb-2">{t('claim_success_title')}</h2>
          <p className="text-muted-foreground">{t('claim_success_message')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{t('claim_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Gift Message */}
        {egift.message && (
          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <p className="text-sm text-muted-foreground mb-1">
              {egift.senderName} {t('from_sender')}
            </p>
            <p className="text-lg italic">&ldquo;{egift.message}&rdquo;</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="token" value={egift.token} />

          {state?.error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
              {state.error}
            </div>
          )}

          {/* Recipient Name */}
          <div>
            <label htmlFor="recipientName" className="block text-sm font-medium mb-2">
              {t('your_name')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="recipientName"
              name="recipientName"
              type="text"
              required
              placeholder={t('your_name_placeholder')}
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">{t('shipping_address')}</h3>

            {/* Shipping Name */}
            <div className="mb-4">
              <label htmlFor="shippingName" className="block text-sm font-medium mb-2">
                {t('shipping_name')} <span className="text-red-500">*</span>
              </label>
              <Input
                id="shippingName"
                name="shippingName"
                type="text"
                required
              />
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                {t('postal_code')} <span className="text-red-500">*</span>
              </label>
              <Input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                placeholder="123-4567"
                className="max-w-[200px]"
              />
            </div>

            {/* Prefecture */}
            <div className="mb-4">
              <label htmlFor="prefecture" className="block text-sm font-medium mb-2">
                {t('prefecture')} <span className="text-red-500">*</span>
              </label>
              <select
                id="prefecture"
                name="prefecture"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">{t('select_prefecture')}</option>
                {PREFECTURES.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                {t('city')} <span className="text-red-500">*</span>
              </label>
              <Input id="city" name="city" type="text" required />
            </div>

            {/* Address Line 1 */}
            <div className="mb-4">
              <label htmlFor="line1" className="block text-sm font-medium mb-2">
                {t('address_line1')} <span className="text-red-500">*</span>
              </label>
              <Input id="line1" name="line1" type="text" required />
            </div>

            {/* Address Line 2 */}
            <div className="mb-4">
              <label htmlFor="line2" className="block text-sm font-medium mb-2">
                {t('address_line2')}
              </label>
              <Input
                id="line2"
                name="line2"
                type="text"
                placeholder={t('address_line2_placeholder')}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                {t('phone')} <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="09012345678"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('claiming') : t('claim_gift')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
