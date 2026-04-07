import { UserInfo } from '@/types/user.types';
import React from 'react';

interface SidebarUserInfoProps {
    userInfo: UserInfo;
}

const SidebarUserInfo = ({ userInfo }: SidebarUserInfoProps) => {
    return (
        <div className='p-4 border-t shrink-0'>
            <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                    <span className='text-primary font-semibold'>{userInfo.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className='flex-1 min-w-0 overflow-hidden'>
                    <p className='text-sm font-medium truncate'>{userInfo.name}</p>
                    <p className='text-xs text-muted-foreground truncate capitalize'>{userInfo.role.toLocaleLowerCase().replace("_", " ")}</p>
                </div>
            </div>
        </div>
    );
};

export default SidebarUserInfo;
