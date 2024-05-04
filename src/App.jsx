// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLogin from "./pages/user/UserLogin";
import { useState } from "react";
import UserSignUp from "./pages/user/UserSignUp";
import JobPage from "./pages/user/job/JobPage";
import CoursePage from "./pages/user/course/CoursePage";
import UserProfile from "./pages/user/UserProfile";
import ServicePage from "./pages/user/service/ServicePage";
import ChatPage from "./pages/user/chat/ChatPage";
import NewWorkPage from "./pages/user/network/NewWorkPage";

function App() {
  const [userType] = useState("user"); // Example: "user", "admin", "guest"

  return (
    <>
      <Routes>
        {userType === "user" ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserLogin />} />
            <Route path="/signUp" element={<UserSignUp />} />
            <Route path="/userJob" element={<JobPage />} />
            <Route path="/userCourse" element={<CoursePage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userService" element={<ServicePage />} />
            <Route path="/userChat" element={<ChatPage />} />
            <Route path="/userNetwork" element={<NewWorkPage />} />
          </Route>
        ) : userType === "admin" ? (
          <Route element={<AdminLayout />}>
            <Route path="/" element={<UserLogin />} />
          </Route>
        ) : (
          <Route path="/" element={<UserLogin />} />
        )}
      </Routes>
    </>
  );
}

export default App;
