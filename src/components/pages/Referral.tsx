import React, { useState } from 'react';
import { ArrowLeft, Gift, Copy, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';

export default function Referral() {
  const navigate = useNavigate();
  const { t } = useI18nStore();
  const referralCode = 'GOPACK50';

  const rewards = [
    {
      title: t('referral.rewards.youGet.title'),
      description: t('referral.rewards.youGet.description'),
      icon: Gift
    },
    {
      title: t('referral.rewards.theyGet.title'),
      description: t('referral.rewards.theyGet.description'),
      icon: Gift
    }
  ];

  const shareOptions = [
    { name: 'WhatsApp', color: 'bg-green-500' },
    { name: 'Facebook', color: 'bg-blue-600' },
    { name: 'Twitter', color: 'bg-blue-400' },
    { name: 'Email', color: 'bg-gray-600' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/account')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">{t('referral.title')}</h1>
      </div>

      {/* Rewards Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
        <div className="text-center mb-8">
          <Gift className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('referral.shareTitle')}</h2>
          <p className="text-purple-100">{t('referral.shareSubtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            return (
              <div
                key={reward.title}
                className="bg-white bg-opacity-10 rounded-lg p-4 text-center"
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-medium mb-1">{reward.title}</h3>
                <p className="text-sm text-purple-100">{reward.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral Code */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('referral.code.title')}</h3>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <span className="font-mono text-lg font-medium">{referralCode}</span>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Copy className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Share Options */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('referral.code.shareVia')}</h3>
        <div className="grid grid-cols-2 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              className={`${option.color} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
            >
              <Share2 className="h-5 w-5 inline-block mr-2" />
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}