import { UserInfo } from '@/types/user.types';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Settings, LogOut } from 'lucide-react';

interface UserDropdownProps {
    userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center outline-none">
                    <Avatar className="h-9 w-9 border border-border hover:border-primary/50 transition-colors">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {userInfo.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1.5 pt-1 pb-1">
                        <p className="text-sm font-semibold leading-none text-foreground">{userInfo.name}</p>
                        <p className="text-xs text-muted-foreground truncate" title={userInfo.email}>
                            {userInfo.email}
                        </p>
                        <div className="pt-1">
                            <span className="inline-flex items-center rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary capitalize ring-1 ring-inset ring-primary/20">
                                {userInfo.role.toLocaleLowerCase().replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;