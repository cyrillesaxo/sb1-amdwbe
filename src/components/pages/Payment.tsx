import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Smartphone, Building, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18nStore } from '../../store/i18nStore';

export default function Payment() {
  const navigate = useNavigate();
  const { t } = useI18nStore();
  const [showAddPayment, setShowAddPayment] = useState(false);

  // Mock payment methods data
  const paymentMethods = [
    {
      id: 'mm1',
      type: 'mobile_money',
      provider: 'Orange Money',
      number: '+237 699 123 456',
      balance: '150,000 FCFA',
      primary: true,
      icon: Smartphone
    },
    {
      id: 'mm2',
      type: 'mobile_money',
      provider: 'MTN Mobile Money',
      number: '+237 677 987 654',
      balance: '85,000 FCFA',
      icon: Smartphone
    },
    {
      id: 'cc1',
      type: 'credit_card',
      provider: 'Visa',
      number: '**** **** **** 4242',
      expiry: '12/25',
      icon: CreditCard
    },
    {
      id: 'ba1',
      type: 'bank_account',
      provider: 'Afriland First Bank',
      accountNumber: '**** **** 8765',
      icon: Building
    }
  ];

  // Recent transactions
  const transactions = [
    {
      id: 't1',
      date: '2024-03-15',
      amount: '25,000 FCFA',
      type: 'payment',
      status: 'completed',
      description: 'Express Delivery'
    },
    {
      id: 't2',
      date: '2024-03-10',
      amount: '35,000 FCFA',
      type: 'refund',
      status: 'completed',
      description: 'Cancelled Delivery'
    },
    {
      id: 't3',
      date: '2024-03-08',
      amount: '15,000 FCFA',
      type: 'payment',
      status: 'completed',
      description: 'Standard Delivery'
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
          <h1 className="text-2xl font-bold">{t('payment.title')}</h1>
          <p className="text-gray-500">{t('payment.subtitle')}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium text-gray-900">{t('payment.methods.title')}</h2>
          <button
            onClick={() => setShowAddPayment(true)}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t('payment.addNew')}
          </button>
        </div>
        <div className="divide-y">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{method.provider}</p>
                    <p className="text-sm text-gray-500">
                      {method.number || method.accountNumber}
                    </p>
                    {method.balance && (
                      <p className="text-sm font-medium text-green-600">{method.balance}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  {method.primary && (
                    <span className="mr-4 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {t('payment.methods.primary')}
                    </span>
                  )}
                  <button className="text-gray-400 hover:text-gray-500">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-medium text-gray-900">{t('payment.transactions.title')}</h2>
        </div>
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'refund' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'refund' ? '+' : '-'}{transaction.amount}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{t('payment.addPayment.title')}</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAddPayment(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {t('payment.addPayment.cancel')}
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t('payment.addPayment.add')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}