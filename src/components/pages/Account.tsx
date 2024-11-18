import React from 'react';
import { Star, Settings, CreditCard, Clock, Shield, Gift, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { TrustBanner } from '../common/TrustBanner';
import { useI18nStore } from '../../store/i18nStore';

export default function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18nStore();

  if (!user) return null;

  const menuItems = [
    {
      id: 'profile',
      icon: User,
      title: user.name,
      subtitle: `${user.stats?.rating} ★ · ${t('account.profile.verified')}`,
      badge: t('account.profile.goldMember')
    },
    {
      id: 'help',
      icon: Settings,
      title: t('account.menu.help.title'),
      subtitle: t('account.menu.help.subtitle'),
      route: '/help'
    },
    {
      id: 'payment',
      icon: CreditCard,
      title: t('account.menu.payment.title'),
      subtitle: t('account.menu.payment.subtitle'),
      route: '/payment'
    },
    {
      id: 'activity',
      icon: Clock,
      title: t('account.menu.activity.title'),
      subtitle: t('account.menu.activity.subtitle'),
      route: '/activity'
    },
    {
      id: 'premium',
      icon: Star,
      title: t('account.menu.premium.title'),
      subtitle: t('account.menu.premium.subtitle'),
      route: '/premium'
    },
    {
      id: 'safety',
      icon: Shield,
      title: t('account.menu.safety.title'),
      subtitle: t('account.menu.safety.subtitle'),
      badge: '2/6',
      route: '/safety'
    },
    {
      id: 'privacy',
      icon: Shield,
      title: t('account.menu.privacy.title'),
      subtitle: t('account.menu.privacy.subtitle'),
      route: '/privacy'
    },
    {
      id: 'referral',
      icon: Gift,
      title: t('account.menu.referral.title'),
      subtitle: t('account.menu.referral.subtitle'),
      route: '/referral'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Profile Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-2xl font-bold mr-2">{user.name}</h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm mx-1">{user.stats?.rating}</span>
                  <span className="text-blue-200 mx-2">·</span>
                  <span className="text-blue-100">{t('account.profile.verified')}</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                    {t('account.profile.goldMember')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center bg-blue-500 bg-opacity-20 rounded-xl p-4">
            <div>
              <div className="text-2xl font-bold">{user.stats?.totalDeliveries}</div>
              <div className="text-sm text-blue-100">{t('account.stats.deliveries')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.stats?.points}</div>
              <div className="text-sm text-blue-100">{t('account.stats.points')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.stats?.totalSpent}</div>
              <div className="text-sm text-blue-100">{t('account.stats.totalSpent')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => item.route && navigate(item.route)}
                className="w-full flex items-center p-6 bg-white rounded-xl hover:shadow-md transition-all"
              >
                <Icon className="h-6 w-6 text-blue-600 mr-4" />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{item.title}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.badge === t('account.profile.goldMember')
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Banner */}
      <TrustBanner />
    </div>
  );
}