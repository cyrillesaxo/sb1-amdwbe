import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { emergencyService } from '../../services/EmergencyService';
import { useI18nStore } from '../../store/i18nStore';

export function EmergencyButton() {
  const { t } = useI18nStore();
  const [isTriggering, setIsTriggering] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSOS = async () => {
    try {
      setIsTriggering(true);
      
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      await emergencyService.triggerSOS({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });

      // Show success message
      alert(t('emergency.sosTriggered'));
    } catch (error) {
      console.error('Failed to trigger SOS:', error);
      alert(t('emergency.sosFailed'));
    } finally {
      setIsTriggering(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed bottom-24 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
        aria-label={t('emergency.sosButton')}
      >
        <AlertTriangle className="h-6 w-6" />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('emergency.confirmSOS')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('emergency.sosDescription')}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isTriggering}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSOS}
                disabled={isTriggering}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isTriggering ? t('emergency.triggering') : t('emergency.triggerSOS')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}