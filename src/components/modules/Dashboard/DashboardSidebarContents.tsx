"use client"
import { NavSection } from '@/types/dashboard.types';
import { UserInfo } from '@/types/user.types';
import Image from 'next/image';
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
            <div className='p-4 border-b items-center justify-center flex h-16 shrink-0'>
                <Link href={dashboardHome} className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Medicare Logo" width={28} height={28} priority />
                    <span className="text-xl font-bold text-primary">Medicare</span>
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