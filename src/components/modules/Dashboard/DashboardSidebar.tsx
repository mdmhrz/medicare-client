import { getDefaultDashboardRoute } from '@/lib/authUtils';
import { getNavItemsByRole } from '@/lib/navItems';
import { getUserInfo } from '@/services/auth.services';
import { NavSection } from '@/types/dashboard.types';
import React from 'react';

const DashboardSidebar = async () => {
    const userInfo = await getUserInfo()

    const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role)


    return (
        <div>
            This is the dashboard sidebar. You can add navigation links or other content here.
        </div>
    );
};

export default DashboardSidebar;