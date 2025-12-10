import Platform from "./components/Platform/Platform";
import AdminRoleManagement from "./components/AdminRoleManagement/AdminRoleManagement";
import CommunicationNotifications from "./components/CommunicationNotifications/CommunicationNotifications";

const Settings = () => {
  return (
    <div className="space-y-8">
      <Platform />
      <AdminRoleManagement />
      <CommunicationNotifications />
    </div>
  );
};

export default Settings;
