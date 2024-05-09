import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoBriefcaseOutline } from "react-icons/io5";
import { PiGraduationCapLight } from "react-icons/pi";
import { AiOutlineProduct } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import { useAuth } from "../../shared/context/AuthContext";
import CustomLoading from "../../components/CustomLoading";

const AdminDashboardPage = () => {
  const [dashboardCounts, setDashboardCounts] = useState({
    users: 0,
    jobs: 0,
    courses: 0,
    service: 0,
  });

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    getDashboardCounts();
  }, [authUser]);

  const getDashboardCounts = async () => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/stats/${authUser.userId}`
      );

      if (response.data) {
        setDashboardCounts({
          users: response.data.userCount,
          jobs: response.data.jobCount,
          courses: response.data.courseCount,
          service: response.data.serviceCount,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="grid gap-5 grid-cols-4 mx-auto">
        <div className="px-4 py-6 shadow-lg shadow-blue-100 bg-slate-100">
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">Users</p>
            <Avatar size={40} icon={<UserOutlined />} className="bg-blue-300" />
          </div>

          {/* COunt */}
          <p className="text-4xl font-bold mt-4">{dashboardCounts.users}</p>
        </div>
        <div className="px-4 py-6 shadow-lg shadow-blue-100 bg-slate-100">
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">Jobs</p>
            <Avatar
              size={40}
              icon={<IoBriefcaseOutline />}
              className="bg-green-300"
            />
          </div>

          {/* COunt */}
          <p className="text-4xl font-bold mt-4">{dashboardCounts.jobs}</p>
        </div>{" "}
        <div className="px-4 py-6 shadow-lg shadow-blue-100 bg-slate-100">
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">Courses</p>
            <Avatar
              size={40}
              icon={<PiGraduationCapLight />}
              className="bg-yellow-300"
            />
          </div>

          {/* COunt */}
          <p className="text-4xl font-bold mt-4">{dashboardCounts.courses}</p>
        </div>{" "}
        <div className="px-4 py-6 shadow-lg shadow-blue-100 bg-slate-100">
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">Service</p>
            <Avatar
              size={40}
              icon={<AiOutlineProduct />}
              className="bg-violet-300"
            />
          </div>

          {/* COunt */}
          <p className="text-4xl font-bold mt-4">{dashboardCounts.service}</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
