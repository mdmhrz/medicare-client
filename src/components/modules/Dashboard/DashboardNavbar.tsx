import { getDefaultDashboardRoute } from '@/lib/authUtils';
import { getNavItemsByRole } from '@/lib/navItems';
import { getUserInfo } from '@/services/auth.services';
import { NavSection } from '@/types/dashboard.types';
import React from 'react';
import DashboardNavbarContents from './DashboardNavbarContents';

const DashboardNavbar = async () => {
    const userInfo = await getUserInfo()

    const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role)
    return (
        <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 w-full justify-between">
            <DashboardNavbarContents userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
        </header>
    );
};

export default DashboardNavbar;