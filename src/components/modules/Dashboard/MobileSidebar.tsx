"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { NavSection } from '@/types/dashboard.types';
import { UserInfo } from '@/types/user.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import NavItems from './NavItems';
import SidebarUserInfo from './SidebarUserInfo';

interface MobileSidebarProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const MobileSidebar = ({ userInfo, navItems, dashboardHome }: MobileSidebarProps) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close the mobile sidebar when the route changes
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Close the mobile sidebar when resizing past the mobile breakpoint (md)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 flex flex-col gap-0">
                <SheetHeader className="p-4 border-b sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                
                <div className='p-4 border-b items-center justify-center flex h-16 shrink-0'>
                    <Link href={dashboardHome} className="flex items-center gap-2" onClick={() => setOpen(false)}>
                        <Image src="/logo.svg" alt="Medicare Logo" width={28} height={28} priority />
                        <span className="text-xl font-bold text-primary">Medicare</span>
                    </Link>
                </div>
                
                <NavItems navItems={navItems} />

                <SidebarUserInfo userInfo={userInfo} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar