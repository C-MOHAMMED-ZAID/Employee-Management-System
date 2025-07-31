import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateEmployee from "./pages/Employee/CreateEmployee";
import EditEmployee from "./pages/Employee/EditEmployee";
import EmployeeList from "./pages/Employee/EmployeeList"
import CreateSalary from "./pages/Salary/CreateSalary";
import SalaryList from "./pages/Salary/SalaryList";
import EditSalary from "./pages/Salary/EditSalary";
import MyProfile from "./pages/MyProfile";
import MySalary from "./pages/MySalary";
import NotFound from "./pages/NotFound";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        }/>

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }/>

        <Route path="/create-employee" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CreateEmployee />
          </ProtectedRoute>
        }/>

        <Route path="/edit-employee/:id" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EditEmployee />
          </ProtectedRoute>
        }/>

        <Route path="/employees" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EmployeeList />
          </ProtectedRoute>
        }/>

        <Route path="/create-salary" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CreateSalary />
          </ProtectedRoute>
        }/>

        <Route path="/salaries" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SalaryList />
          </ProtectedRoute>
        }/>

        <Route path="/edit-salary/:id" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EditSalary />
          </ProtectedRoute>
        }/>

        {/* Employee Routes */}
        <Route path="/my-profile" element={
          <ProtectedRoute allowedRoles={["employee", "admin"]}>
            <MyProfile />
          </ProtectedRoute>
        } />

        <Route path="/my-salary" element={
          <ProtectedRoute allowedRoles={["employee", "admin"]}>
            <MySalary />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
