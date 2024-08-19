import "bootstrap/dist/css/bootstrap.min.css";
import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom"; // Import BrowserRouter, Route, and Routes
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import RegisterSelect from "./Pages/RegisterSelect";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyEmail from "./Pages/VerifyEmail";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminEditProfile from "./Pages/AdminDashboard/AdminEditProfile";
import AdminUser from "./Pages/AdminDashboard/AdminUser";
import AdminEditUser from "./Pages/AdminDashboard/AdminEditUser";
import AdminStudent from "./Pages/AdminDashboard/AdminStudent";
import AdminStudentProgress from "./Pages/AdminDashboard/AdminStudentProgress";
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

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NextUIProvider navigate={navigate}>
        {/* User Credentials */}

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
          <Route path="/verifyEmail" element={<VerifyEmail />} />

          {/* Teacher Dashboard Routes*/}

          {/* Parent DAshboard Routes */}

          {/* Admin Dashboard Routes */}
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminEditProfile/:id" element={<AdminEditProfile />} />
          <Route path="/AdminUsers" element={<AdminUser />} />
          <Route path="/AdminEditUser/:id" element={<AdminEditUser />} />
          <Route path="/adminStudents" element={<AdminStudent />} />
          <Route path="/adminAddStudent" element={<AdminAddStudent />} />
          <Route path="/adminViewStudent" element={<AdminViewStudent />} />
          <Route path="/adminStudentAssessment" element={<AdminAssessment />} />
          <Route
            path="/adminStudentProgress"
            element={<AdminStudentProgress />}
          />
          <Route path="/adminEditStudent/:id" element={<AdminEditStudent />} />
          <Route path="/adminViewParent/:id" element={<AdminViewParent />} />
          <Route path="/adminEditParent/:id" element={<AdminEditParent />} />
          <Route path="/adminAddUser" element={<AdminAddUser />} />
          <Route path="/adminViewTeacher/:id" element={<AdminViewTeacher />} />
          <Route path="/adminEditTeacher/:id" element={<AdminEditTeacher />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
        </Routes>
      </NextUIProvider>
    </div>
  );
};

export default App;
