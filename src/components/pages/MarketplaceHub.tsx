import React from 'react';
import { SkillsMarketplace } from '../economic/SkillsMarketplace';
import { useI18nStore } from '../../store/i18nStore';

export function MarketplaceHub() {
  const { t } = useI18nStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('marketplace.title')}</h1>
      
      <div className="space-y-8">
        <section>
          <SkillsMarketplace />
        </section>
      </div>
    </div>
  );
}