"use client"
import { NavSection } from '@/types/dashboard.types';
import { UserInfo } from '@/types/user.types';
import React from 'react'
import MobileSidebar from './MobileSidebar';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DashboardNavbarContentsProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardNavbarContents = ({ userInfo, navItems, dashboardHome }: DashboardNavbarContentsProps) => {

    return (
        <div className="flex w-full items-center justify-between">
            {/* Mobile menu toggle button and menu */}
            <div className="flex items-center md:hidden">
                <MobileSidebar userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
            </div>

            {/* Search Bar */}
            <div className="flex-1 md:ml-0 ml-4 max-w-md hidden sm:block">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-background pl-8"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 ml-auto pl-4">
                <NotificationDropdown />
                <UserDropdown userInfo={userInfo} />
            </div>
        </div>
    )
}

export default DashboardNavbarContents