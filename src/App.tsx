import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ClientPortal from './components/client/ClientPortal';
import MiniToastContainer from './components/shared/MiniToastContainer';
import ToastContainer from './components/shared/ToastContainer';
import { getAuth } from './store/appStore';

// Security wrapper to protect routes
function RequireAuth({ children, role }: { children: React.ReactNode; role?: 'admin' | 'client' }) {
  const auth = getAuth();
  if (!auth.userId) return <Navigate to="/login" replace />;
  if (role && auth.role !== role && auth.role !== 'admin') return <Navigate to="/client" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8FAFD] flex flex-col">
        {/* We removed the Header here because it is now included inside the individual dashboards */}
        <div className="flex-1 flex flex-col" style={{ height: '100vh' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            <Route
              path="/client"
              element={
                <RequireAuth>
                  <div className="flex flex-1 overflow-hidden h-full">
                    <ClientPortal />
                  </div>
                </RequireAuth>
              }
            />
            
            <Route
              path="/admin"
              element={
                <RequireAuth role="admin">
                  <div className="flex flex-1 overflow-hidden h-full">
                    <AdminDashboard />
                  </div>
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
      
      {/* Global Notifications */}
      <MiniToastContainer />
      <ToastContainer />
    </BrowserRouter>
  );
}