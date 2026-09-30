import React from 'react';
import { X, CheckCheck, Bell, TrendingUp, Calendar, Warehouse, ShieldAlert, Sparkles } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useAppState();

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'demand':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'harvest':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'storage':
        return <Warehouse className="w-4 h-4 text-[#8b5e3c]" />;
      case 'risk':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-[#fbfbfa]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#1b4332]" />
            <h3 className="font-bold text-gray-900 text-base">Agricultural Alert Center</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-gray-500 hover:text-[#1b4332] font-medium flex items-center gap-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="px-5 py-2.5 bg-[#eef8f2] border-b border-[#d8f3dc] text-xs text-[#1b4332] font-medium">
          Real-time agronomic alerts, buyer demand updates, and storage notices
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No notifications at this time.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-4 transition-colors cursor-pointer ${
                  item.read ? 'bg-white hover:bg-gray-50' : 'bg-emerald-50/40 hover:bg-emerald-50/70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-xs shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.title}
                      </h4>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-1.5">
                      {item.message}
                    </p>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
