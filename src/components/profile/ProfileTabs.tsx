import React from 'react';
import { User, History, CreditCard, Settings } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const { t } = useI18nStore();

  const tabs = [
    { id: 'details', label: 'Account Info', icon: User },
    { id: 'history', label: 'History', icon: History },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-6 ${
                  isActive
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}