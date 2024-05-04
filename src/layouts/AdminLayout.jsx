import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-blue-500 h-screen">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
