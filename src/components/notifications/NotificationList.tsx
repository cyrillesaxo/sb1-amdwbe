import React, { useState } from 'react';
import { Bell, Check, Trash2, CheckSquare, Square } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';
import type { Notification } from '../../services/NotificationService';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
}

export function NotificationList({ notifications, onMarkAsRead, onDelete }: NotificationListProps) {
  const { t } = useI18nStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === notifications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(notifications.map(n => n.id)));
    }
  };

  const handleBulkAction = (action: 'read' | 'delete') => {
    const ids = Array.from(selectedIds);
    if (action === 'read') {
      onMarkAsRead(ids);
    } else {
      onDelete(ids);
    }
    setSelectedIds(new Set());
    setSelectMode(false);
  };

  return (
    <div className="space-y-2">
      {notifications.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <button
            onClick={() => setSelectMode(!selectMode)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {selectMode ? t('notifications.exitSelect') : t('notifications.selectMultiple')}
          </button>
          {selectMode && (
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSelectAll}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                {selectedIds.size === notifications.length ? (
                  <CheckSquare className="h-4 w-4 mr-1" />
                ) : (
                  <Square className="h-4 w-4 mr-1" />
                )}
                {t('notifications.selectAll')}
              </button>
              {selectedIds.size > 0 && (
                <>
                  <button
                    onClick={() => handleBulkAction('read')}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    {t('notifications.markAsRead')}
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="flex items-center text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {t('notifications.delete')}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">{t('notifications.empty')}</p>
        </div>
      ) : (
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start">
                {selectMode && (
                  <button
                    onClick={() => toggleSelect(notification.id)}
                    className="mr-3 mt-1"
                  >
                    {selectedIds.has(notification.id) ? (
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                )}
                <Bell className="h-5 w-5 text-blue-600 mt-1" />
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <div className="mt-1 text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </div>
                {!selectMode && !notification.read && (
                  <button
                    onClick={() => onMarkAsRead([notification.id])}
                    className="ml-4 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Check className="h-4 w-4 text-blue-600" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}