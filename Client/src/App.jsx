//import "bootstrap/dist/css/bootstrap.css";
import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom"; // Import BrowserRouter, Route, and Routes
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Login from "./Pages/Login";
import RegisterSelect from "./Pages/RegisterSelect";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyEmail from "./Pages/VerifyEmail";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminEditProfile from "./Pages/AdminDashboard/AdminEditProfile";
import AdminUser from "./Pages/AdminDashboard/AdminUser";
import AdminEditUser from "./Pages/AdminDashboard/AdminEditUser";
import AdminStudent from "./Pages/AdminDashboard/AdminStudent";
import AdminViewStudent from "./Pages/AdminDashboard/AdminViewStudent";
import AdminAssessment from "./Pages/AdminDashboard/AdminAssessment";
import AdminEditStudent from "./Pages/AdminDashboard/AdminEditStudent";
import AdminViewParent from "./Pages/AdminDashboard/AdminViewParent";
import AdminEditParent from "./Pages/AdminDashboard/AdminEditParent";
import AdminAddUser from "./Pages/AdminDashboard/AdminAddUser";
import AdminViewTeacher from "./Pages/AdminDashboard/AdminViewTeacher";
import AdminEditTeacher from "./Pages/AdminDashboard/AdminEditTeacher";
import AdminProfile from "./Pages/AdminDashboard/AdminProfile";
import AdminAddStudent from "./Pages/AdminDashboard/AdminAddStudent";
import TeacherRegister from "./Pages/TeacherRegister";
import ParentRegister from "./Pages/ParentRegister";
import Main from "./Pages/Home/Main";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/TeacherDashboard/Dashboard";
import TeacherProfile from "./Pages/TeacherDashboard/TeacherProfile";
import UpdateProfileTeacher from "./Pages/TeacherDashboard/UpdateProfileTeacher";
import ManageStudent from "./Pages/TeacherDashboard/ManageStudent";
import AddStudent from "./Pages/TeacherDashboard/AddStudent";
import EditStudent from "./Pages/TeacherDashboard/EditStudent";
import ViewAssessment from "./Pages/TeacherDashboard/ViewAssessment";
import ViewStudent from "./Pages/TeacherDashboard/ViewStudent";
import RoleBasedRoute from "./Components/RoleBasedRoute";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import InformationKid from "./Pages/ParentDashboard/InformationKid";
import ParentFeedbackTeacher from "./Pages/ParentDashboard/ParentFeedbackTeacher";
import ParentViewStudentProgress from "./Pages/ParentDashboard/ParentViewStudentProgress";
import ParentProfile from "./Pages/ParentDashboard/ParentProfile";
import ProfileUpdate from "./Pages/ParentDashboard/ProfileUpdate";
import AdminViewPerformance from "./Pages/AdminDashboard/AdminViewPerformance";
import TestPage from "./Pages/testpage";
import AdminViewAssessment from "./Pages/AdminDashboard/AdminViewAssessment";
import AdminViewStudentPerformance from "./Pages/AdminDashboard/AdminViewStudentPerformance";
import ManagePerformance from "./Pages/TeacherDashboard/ManagePerformance";
import ViewStudentAssessment from "./Pages/TeacherDashboard/ViewStudentAssessment";
import ViewStudentPerformance from "./Pages/TeacherDashboard/ViewStudentPerformance";

axios.defaults.baseURL = "http://192.168.254.161:8000"; // SERVER_URL https://baybay-salita-heroku-8c328f3ddd0f.herokuapp.com/
axios.defaults.withCredentials = true;

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* User Credentials */}
      <UserContextProvider>
        {/* UI */}
        <NextUIProvider navigate={navigate}>
          {/* Notification */}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

          <Routes>
            {/* Main Home Page*/}
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterSelect />} />
            <Route path="/registerTeacher" element={<TeacherRegister />} />
            <Route path="/registerParent" element={<ParentRegister />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/test" element={<TestPage />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            {/* Teacher Dashboard Routes*/}
            <Route
              path="/teacherDashboard"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <Dashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/teacherProfile"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <TeacherProfile />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/teacherUpdateProfile/:id"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <UpdateProfileTeacher />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/manageStudent"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <ManageStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/addStudent"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <AddStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/viewStudent/:id"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <ViewStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/editStudent/:id"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <EditStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/viewAssessment"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <ViewAssessment />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/managePerformance"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <ManagePerformance />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/ViewActivityAssessment/:ActivityCode"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <ViewStudentAssessment />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/ViewStudentPerformance/:UserInputId"
              element={
                <RoleBasedRoute allowedRoles={["Teacher"]}>
                  <ViewStudentPerformance />
                </RoleBasedRoute>
              }
            />
            v{/* Parent Dashboard Routes */}
            <Route
              path="/parentDashboard"
              element={
                <RoleBasedRoute allowedRoles={["Parent"]}>
                  <InformationKid />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parentFeedbackTeacher"
              element={
                <RoleBasedRoute allowedRoles={["Parent"]}>
                  <ParentFeedbackTeacher />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parentStudentProgress"
              element={
                <RoleBasedRoute allowedRoles={["Parent"]}>
                  <ParentViewStudentProgress />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parentProfile"
              element={
                <RoleBasedRoute allowedRoles={["Parent"]}>
                  <ParentProfile />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parentUpdateProfile/:id"
              element={
                <RoleBasedRoute allowedRoles={["Parent"]}>
                  <ProfileUpdate />
                </RoleBasedRoute>
              }
            />
            {/* Admin Dashboard Routes */}
            <Route
              path="/AdminDashboard"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/AdminEditProfile/:id"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminEditProfile />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/AdminUsers"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminUser />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/AdminEditUser/:id"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminEditUser />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminStudents"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminAddStudent"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminAddStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminViewStudent/:id"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminViewStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminStudentAssessment"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminAssessment />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminViewPerformance"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminViewPerformance />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminEditStudent/:id"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminEditStudent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminViewParent/:UserID"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminViewParent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminEditParent/:id"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminEditParent />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminAddUser"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminAddUser />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminViewTeacher/:UserID"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminViewTeacher />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminEditTeacher/:id"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminEditTeacher />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminProfile"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminProfile />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminViewAssessment/:ActivityCode"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminViewAssessment />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/adminViewPerformance/:UserInputId"
              element={
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AdminViewStudentPerformance />
                </RoleBasedRoute>
              }
            />
          </Routes>
        </NextUIProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
