import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Tenants from "scenes/tenants/TenantList";
import TenantsAdd from "scenes/tenants/AddTenant";
import TenantsEdit from "scenes/tenants/EditTenant";
import Rooms from "scenes/rooms/RoomList";
import RoomsAdd from "scenes/rooms/addroom";
import RoomsEdit from "scenes/rooms/EditRoom";
import Payment from "scenes/payment/PaymentList";
import PaymentsAdd from "scenes/payment/addpayment";
import PaymentsEdit from "scenes/payment/EditPayment";
import Email from "scenes/Email/emailList";
import EmailAdd from "scenes/Email/addmessage";
import Maintenance from "scenes/maintenance/MaintenanceList";
import MaintenanceAdd from "scenes/maintenance/addmaintenance";
import MaintenanceEdit from "scenes/maintenance/EditMaintenance";
import Task from "scenes/task";
import Report from "scenes/report";
import Login from "scenes/login";
import Signup from "scenes/signup";
import Modal from "react-modal";
import { Outlet } from "react-router-dom";

Modal.setAppElement("#root");

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = localStorage.getItem("token");;

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Protected routes before login */}
            {!isAuth ? (
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </>
            ) : (
               )}
              
              <Route path="/" element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/tenants/add" element={<TenantsAdd />} />
                <Route path="/tenants/edit/:id" element={<TenantsEdit />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/add" element={<RoomsAdd />} />
                <Route path="/rooms/edit/:id" element={<RoomsEdit />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/add" element={<PaymentsAdd />} />
                <Route path="/payment/edit/:id" element={<PaymentsEdit />} />
                <Route path="/email" element={<Email />} />
                <Route path="/email/add" element={<EmailAdd />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/maintenance/add" element={<MaintenanceAdd />} />
                <Route path="/maintenance/edit/:id" element={<MaintenanceEdit />} />
                <Route path="/task" element={<Task />} />
                <Route path="/report" element={<Report />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Route>
           
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
