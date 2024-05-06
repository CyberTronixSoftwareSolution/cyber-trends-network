// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLogin from "./pages/user/UserLogin";
import { useEffect, useState } from "react";
import UserSignUp from "./pages/user/UserSignUp";
import JobPage from "./pages/user/job/JobPage";
import CoursePage from "./pages/user/course/CoursePage";
import UserProfile from "./pages/user/UserProfile";
import ServicePage from "./pages/user/service/ServicePage";
import ChatPage from "./pages/user/chat/ChatPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminJobPage from "./pages/admin/AdminJobPage";
import AdminCoursePage from "./pages/admin/AdminCoursePage";
import AdminServicePage from "./pages/admin/AdminServicePage";
import AdminChatPage from "./pages/admin/AdminChatPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminSignUp from "./pages/admin/AdminSignUpPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import UserHome from "./pages/user/UserHome";
import LandingPage from "./pages/user/LandingPage";

import { useAuth } from "./shared/context/AuthContext";
import NetworkPage from "./pages/user/network/NetworkPage";

function App() {
  const [userType, setUserType] = useState("admin"); // Example: "user", "admin", "guest"

  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      setUserType(authUser.role);
    } else {
      setUserType("");
    }
  }, [authUser]);

  return (
    <>
      <Routes>
        {userType === "User" ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/userJob" element={<JobPage />} />
            <Route path="/userCourse" element={<CoursePage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userService" element={<ServicePage />} />
            <Route path="/userChat" element={<ChatPage />} />
            <Route path="/userNetwork" element={<NetworkPage />} />
          </Route>
        ) : userType === "admin" ? (
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/jobs" element={<AdminJobPage />} />\
            <Route path="/admin/courses" element={<AdminCoursePage />} />
            <Route path="/admin/services" element={<AdminServicePage />} />
            <Route path="/admin/chat" element={<AdminChatPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signIn" element={<UserLogin />} />
            <Route path="/signUp" element={<UserSignUp />} />
            <Route path="/admin/signUp" element={<AdminSignUp />} />
            <Route path="/admin" element={<AdminLoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
