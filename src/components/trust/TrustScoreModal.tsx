import React from 'react';
import { Shield, Star, CheckCircle, Users, X } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';
import { useAuth } from '../../contexts/AuthContext';

interface TrustScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrustScoreModal({ isOpen, onClose }: TrustScoreModalProps) {
  const { t } = useI18nStore();
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  const trustMetrics = [
    {
      icon: CheckCircle,
      title: t('trust.metrics.verifiedIdentity'),
      value: true,
      color: 'text-green-500'
    },
    {
      icon: Star,
      title: t('trust.metrics.rating'),
      value: '4.8/5',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: t('trust.metrics.communityEndorsements'),
      value: '15',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t('trust.score.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Overall Trust Score */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center">
          <Shield className="h-8 w-8 text-blue-600 mr-4" />
          <div>
            <div className="text-sm text-blue-600 font-medium">{t('trust.score.overall')}</div>
            <div className="text-2xl font-bold text-blue-700">92%</div>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="space-y-4">
          {trustMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.title} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className={`h-5 w-5 ${metric.color} mr-3`} />
                  <span className="text-gray-700">{metric.title}</span>
                </div>
                <span className="font-medium text-gray-900">
                  {typeof metric.value === 'boolean' 
                    ? (metric.value ? '✓' : '✗')
                    : metric.value
                  }
                </span>
              </div>
            );
          })}
        </div>

        {/* Trust Level */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">{t('trust.level.title')}</h3>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full" 
                  style={{ width: '92%' }}
                />
              </div>
            </div>
            <span className="ml-3 text-sm font-medium text-blue-600">
              {t('trust.level.gold')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}