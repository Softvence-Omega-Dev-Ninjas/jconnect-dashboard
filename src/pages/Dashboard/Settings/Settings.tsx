import Platform from "./components/Platform/Platform";
import AdminRoleManagement from "./components/AdminRoleManagement/AdminRoleManagement";
import CommunicationNotifications from "./components/CommunicationNotifications/CommunicationNotifications";
import AdminAnnouncement from "./components/AdminAnnouncement/AdminAnnouncement";

const Settings = () => {
  return (
    <div className="space-y-8">
      <Platform />
      <AdminRoleManagement />
      <div className="space-y-7 mt-4">
        <CommunicationNotifications />
        <AdminAnnouncement />
      </div>
    </div>
  );
};

export default Settings;
