import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { markAllRead } from "@/store/notificationSlice";

type Props = {
  onClose: () => void;
};

const NotificationList = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notifications.list
  );

  return (
    <div className="w-96 bg-white shadow-xl rounded-md max-h-[420px] overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h4 className="font-semibold text-sm">Notifications</h4>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(markAllRead())}
            className="text-xs text-blue-500"
          >
            Mark all read
          </button>

          {/* ❌ Close button */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      {notifications.length === 0 && (
        <p className="p-4 text-sm text-gray-500">No notifications</p>
      )}

      {notifications.map((n, i) => (
        <div key={i} className="px-4 py-3 border-b hover:bg-gray-50">
          <p className="text-sm font-medium">{n.title}</p>
          <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
          <p className="text-[10px] text-gray-400 mt-1">
            {new Date(n.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
