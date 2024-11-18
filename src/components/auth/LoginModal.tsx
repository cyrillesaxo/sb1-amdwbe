import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, AlertCircle, User, Truck, Package } from 'lucide-react';
import { useUser } from '../../store/useStore';
import { useI18nStore } from '../../store/i18nStore';
import { SocialLogin } from './SocialLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function LoginModal({ isOpen, onClose, initialMode = 'login' }: LoginModalProps) {
  const { login, signup, socialLogin, loading, error } = useUser();
  const { t } = useI18nStore();
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'sender' as 'sender' | 'bidder'
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setIsSignup(initialMode === 'signup');
  }, [initialMode]);

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'sender'
    });
    setFormError(null);
    setIsSignup(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          setFormError(t('auth.errors.passwordMismatch'));
          return;
        }
        await signup(formData.name, formData.email, formData.password, formData.role);
      } else {
        await login(formData.email, formData.password);
      }
      handleClose();
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await socialLogin(provider);
      handleClose();
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormError(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'sender'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isSignup ? t('auth.createAccount') : t('auth.welcomeBack')}
        </h2>
        <p className="text-gray-600 mb-6">
          {isSignup ? t('auth.signupDescription') : t('auth.loginDescription')}
        </p>

        {(error || formError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error || formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('auth.fullName')}
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                    disabled={loading}
                    placeholder={t('auth.fullNamePlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('user.role.title')}
                </label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'sender' })}
                    className={`p-3 flex flex-col items-center rounded-lg border ${
                      formData.role === 'sender'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <Package className="h-6 w-6 text-indigo-600" />
                    <span className="mt-1 text-sm font-medium">
                      {t('user.role.sender')}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'bidder' })}
                    className={`p-3 flex flex-col items-center rounded-lg border ${
                      formData.role === 'bidder'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <Truck className="h-6 w-6 text-indigo-600" />
                    <span className="mt-1 text-sm font-medium">
                      {t('user.role.bidder')}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.email')}
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={loading}
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('auth.password')}
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={loading}
                placeholder={t('auth.passwordPlaceholder')}
              />
            </div>
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.confirmPassword')}
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={loading}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? t('common.loading') : isSignup ? t('auth.signup') : t('auth.login')}
          </button>

          <SocialLogin onLogin={handleSocialLogin} />

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleMode}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              {isSignup ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}