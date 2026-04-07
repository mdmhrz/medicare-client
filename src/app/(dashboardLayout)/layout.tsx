import DashboardNavbar from '@/components/modules/Dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/modules/Dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {/* Dashboard Sidebar */}
            <DashboardSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Navbar */}
                <DashboardNavbar />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/10">
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;