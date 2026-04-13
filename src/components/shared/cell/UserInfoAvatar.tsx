"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserInfoAvatarProps {
    name: string;
    email: string;
    profilePhoto?: string;
    showInfo?: boolean
}

// Light background colors for avatar based on alphabetic order
const avatarColors = [
    "bg-red-100", "bg-orange-100", "bg-amber-100", "bg-yellow-100",
    "bg-lime-100", "bg-green-100", "bg-emerald-100", "bg-teal-100",
    "bg-cyan-100", "bg-sky-100", "bg-blue-100", "bg-indigo-100",
    "bg-violet-100", "bg-purple-100", "bg-fuchsia-100", "bg-pink-100",
    "bg-rose-100"
];

const getAvatarColor = (name: string): string => {
    const firstLetter = name.charAt(0).toUpperCase();
    const charCode = firstLetter.charCodeAt(0);
    // Map A-Z to color array index (A=0, B=1, etc.)
    const index = charCode % 65; // 65 is 'A' in ASCII
    return avatarColors[index % avatarColors.length];
};


const UserInfoAvatar = ({ name, email, profilePhoto, showInfo = true }: UserInfoAvatarProps) => {
    const initials = name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2); // Limit to 2 characters

    const avatarColor = getAvatarColor(name);

    return (
        <div className="flex items-center gap-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Avatar className="h-8 w-8">
                            <AvatarImage className="p-1" src={profilePhoto || undefined} alt={name} />
                            <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{name}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {showInfo && (
                <div className="flex flex-col">
                    <span className="font-medium text-sm">{name}</span>
                    <span className="text-muted-foreground text-xs">{email}</span>
                </div>
            )}
        </div>
    )
}

export default UserInfoAvatar
