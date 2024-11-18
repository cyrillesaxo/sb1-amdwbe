import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Plus, X } from 'lucide-react';
import type { User } from '../../types';
import { useI18nStore } from '../../store/i18nStore';

interface ProfilePaymentsProps {
  user: User;
}

interface PaymentMethodFormData {
  type: 'mobile_money' | 'credit_card' | 'bank_account';
  provider?: string;
  number?: string;
  accountNumber?: string;
  bank?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cardholderName?: string;
}

export default function ProfilePayments({ user }: ProfilePaymentsProps) {
  const { t } = useI18nStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<PaymentMethodFormData>({
    type: 'mobile_money'
  });

  const paymentProviders = {
    mobile_money: ['Orange Money', 'MTN Mobile Money', 'YooMee Money'],
    bank_account: ['Afriland First Bank', 'UBA Cameroon', 'Ecobank Cameroon', 'Société Générale Cameroun']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to add the payment method
    console.log('Adding payment method:', formData);
    // Reset form and close
    setFormData({ type: 'mobile_money' });
    setShowAddForm(false);
  };

  const renderForm = () => {
    switch (formData.type) {
      case 'mobile_money':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>
              <select
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select provider</option>
                {paymentProviders.mobile_money.map((provider) => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="+237 6XX XXX XXX"
                required
              />
            </div>
          </>
        );

      case 'credit_card':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Month</label>
                <input
                  type="text"
                  value={formData.expiryMonth}
                  onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM"
                  maxLength={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Year</label>
                <input
                  type="text"
                  value={formData.expiryYear}
                  onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="YY"
                  maxLength={2}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
              <input
                type="text"
                value={formData.cardholderName}
                onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </>
        );

      case 'bank_account':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank</label>
              <select
                value={formData.bank}
                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select bank</option>
                {paymentProviders.bank_account.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter account number"
                required
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods List */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            <span>Add New</span>
          </button>
        </div>
        <div className="space-y-4">
          {user.paymentMethods?.map((method) => (
            <div key={method.id} className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">{method.type}</p>
                  <p className="text-sm text-gray-500">
                    {method.type === 'credit_card' ? `**** **** **** ${method.last4}` : method.number}
                  </p>
                  {method.type === 'credit_card' && (
                    <p className="text-sm text-gray-500">
                      Expires: {method.expiryMonth}/{method.expiryYear}
                    </p>
                  )}
                </div>
                {method.primary && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    Primary
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add Payment Method</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Payment Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ type: 'mobile_money' })}
                    className={`p-3 flex flex-col items-center border rounded-lg ${
                      formData.type === 'mobile_money'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <Smartphone className="h-6 w-6 text-blue-600" />
                    <span className="text-sm mt-1">Mobile Money</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ type: 'credit_card' })}
                    className={`p-3 flex flex-col items-center border rounded-lg ${
                      formData.type === 'credit_card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <span className="text-sm mt-1">Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ type: 'bank_account' })}
                    className={`p-3 flex flex-col items-center border rounded-lg ${
                      formData.type === 'bank_account'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <Building className="h-6 w-6 text-blue-600" />
                    <span className="text-sm mt-1">Bank Account</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Form Fields */}
              <div className="space-y-4">
                {renderForm()}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}