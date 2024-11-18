import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';

export default function Safety() {
  const navigate = useNavigate();
  const { t } = useI18nStore();

  // Define safety checks directly in the component
  const safetyChecks = [
    {
      title: t('safety.checks.0.title'),
      description: t('safety.checks.0.description'),
      status: 'completed'
    },
    {
      title: t('safety.checks.1.title'),
      description: t('safety.checks.1.description'),
      status: 'pending'
    },
    {
      title: t('safety.checks.2.title'),
      description: t('safety.checks.2.description'),
      status: 'completed'
    },
    {
      title: t('safety.checks.3.title'),
      description: t('safety.checks.3.description'),
      status: 'pending'
    },
    {
      title: t('safety.checks.4.title'),
      description: t('safety.checks.4.description'),
      status: 'pending'
    },
    {
      title: t('safety.checks.5.title'),
      description: t('safety.checks.5.description'),
      status: 'pending'
    }
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
        <div>
          <h1 className="text-2xl font-bold">{t('safety.title')}</h1>
          <p className="text-gray-500">{t('safety.subtitle')}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{t('safety.score.title')}</span>
          <span className="text-sm font-medium text-blue-600">{t('safety.score.progress')}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }} />
        </div>
      </div>

      {/* Safety Checks */}
      <div className="space-y-4">
        {safetyChecks.map((check, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {check.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{check.title}</h3>
                <p className="text-gray-500">{check.description}</p>
                <button
                  className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium ${
                    check.status === 'completed'
                      ? 'text-green-700 bg-green-50'
                      : 'text-blue-600 bg-blue-50'
                  }`}
                >
                  {t(`safety.status.${check.status}`)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}