import DashboardLayout from "../components/layouts/DashboardLayout";
import NotificationsList from "../components/Notification/NotificationList";

function Notification() {
  return (
    <NotificationsList />
  );
}

export default DashboardLayout()(Notification);