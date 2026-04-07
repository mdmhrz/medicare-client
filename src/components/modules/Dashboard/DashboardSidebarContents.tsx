"use client"
import { NavSection } from '@/types/dashboard.types';
import { UserInfo } from '@/types/user.types';
import Link from 'next/link';
import NavItems from './NavItems';
import SidebarUserInfo from './SidebarUserInfo';

interface DashboardSidebarContentsProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardSidebarContents = ({ userInfo, navItems, dashboardHome }: DashboardSidebarContentsProps) => {
    return (
        <div className='hidden w-64 md:flex flex-col h-full border-r bg-card '>
            {/*Logo */}
            <div className='p-4 border-b items-center justify-center flex h-16'>
                <Link href={dashboardHome}>
                    <span>Medicare</span>
                </Link>
            </div>
           
            {/*Nav Items */}
            <NavItems navItems={navItems} />

            {/* User Info */}
            <SidebarUserInfo userInfo={userInfo} />
        </div>
    );
};

export default DashboardSidebarContents;