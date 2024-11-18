import React from 'react';
import { CreditCard, Smartphone, Building } from 'lucide-react';
import { useUser } from '../../store/useStore';
import { useI18nStore } from '../../store/i18nStore';

export function PaymentSettings() {
  const { t } = useI18nStore();
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          {t('settings.paymentMethods')}
        </h2>
      </div>

      <div className="space-y-6">
        {user.paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center">
              {method.type === 'mobile_money' && (
                <Smartphone className="h-6 w-6 text-green-500 mr-3" />
              )}
              {method.type === 'credit_card' && (
                <CreditCard className="h-6 w-6 text-blue-500 mr-3" />
              )}
              {method.type === 'bank_account' && (
                <Building className="h-6 w-6 text-purple-500 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-900">{method.provider}</p>
                <p className="text-sm text-gray-500">{method.number}</p>
                {method.balance && (
                  <p className="text-sm text-green-600">{method.balance}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {method.primary && (
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  {t('settings.primary')}
                </span>
              )}
              <button className="text-sm text-blue-600 hover:text-blue-700">
                {t('settings.edit')}
              </button>
            </div>
          </div>
        ))}

        <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          {t('settings.addPaymentMethod')}
        </button>
      </div>
    </div>
  );
}