import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/shared/DashboardSidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar remains fixed */}
      <div className="w-64 hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
