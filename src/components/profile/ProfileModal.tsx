import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Lock, Shield, ChevronRight, Check, X, Camera, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18nStore } from '../../store/i18nStore';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Section = 'info' | 'security' | 'privacy';

const sections = [
  { id: 'info', label: 'Account Info' },
  { id: 'security', label: 'Security' },
  { id: 'privacy', label: 'Privacy & Data' }
];

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useAuth();
  const { t } = useI18nStore();
  const [activeSection, setActiveSection] = useState<Section>('info');
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(t('profile.errors.imageTooLarge'));
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const Security = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('security.title')}</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium mb-1">{t('security.password')}</h3>
          <p className="text-sm text-gray-500 mb-2">Last changed January 11, 2018</p>
          <button className="text-blue-600 text-sm font-medium">{t('security.changePassword')}</button>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium mb-1">{t('security.twoFactor')}</h3>
          <p className="text-sm text-gray-500">{t('security.twoFactorDescription')}</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium mb-1">{t('security.connectedApps')}</h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              <span>Google</span>
            </div>
            <button className="text-red-600 text-sm font-medium">{t('common.disconnect')}</button>
          </div>
        </div>
      </div>
    </div>
  );

  const Privacy = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('privacy.title')}</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium mb-1">{t('privacy.dataSharing')}</h3>
          <p className="text-sm text-gray-500">{t('privacy.dataSharingDescription')}</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium mb-1">{t('privacy.thirdPartyAccess')}</h3>
          <p className="text-sm text-gray-500">{t('privacy.thirdPartyDescription')}</p>
          <a href="#" className="text-blue-600 text-sm font-medium">{t('common.learnMore')}</a>
        </div>
      </div>
    </div>
  );

  const AccountInfo = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('profile.accountInfo')}</h1>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6">{t('profile.basicInfo')}</h2>
        
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={t('profile.profilePicture')} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            <button
              onClick={triggerFileInput}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <div className="text-white flex flex-col items-center">
                <Camera className="w-8 h-8 mb-1" />
                <span className="text-sm">{t('profile.changePhoto')}</span>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm text-gray-500">{t('profile.name')}</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm text-gray-500">{t('profile.phone')}</p>
              <div className="flex items-center">
                <p className="font-medium">{user?.contact?.phone}</p>
                <Check className="w-4 h-4 text-green-500 ml-2" />
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm text-gray-500">{t('profile.email')}</p>
              <div className="flex items-center">
                <p className="font-medium">{user?.email}</p>
                <Check className="w-4 h-4 text-green-500 ml-2" />
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        />

        <div className="inline-block transform overflow-hidden rounded-lg bg-gray-50 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 sm:align-middle">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex space-x-2 mb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as Section)}
                className={`px-4 py-2 rounded-lg ${
                  activeSection === section.id
                    ? 'bg-gray-200 font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeSection === 'info' && <AccountInfo />}
            {activeSection === 'security' && <Security />}
            {activeSection === 'privacy' && <Privacy />}
          </div>
        </div>
      </div>
    </div>
  );
}