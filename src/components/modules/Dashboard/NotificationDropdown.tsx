import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Calendar, Clock, CreditCard, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "appointment" | "schedule" | "prescription" | "payment" | "system";
    createdAt: Date;
    isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        title: "New Appointment Request",
        message: "You have a new booking from John Doe.",
        type: "appointment",
        createdAt: new Date(Date.now() - 60 * 1000),
        isRead: false,
    },
    {
        id: "2",
        title: "Appointment Confirmed",
        message: "Your appointment with Dr. Smith has been confirmed.",
        type: "appointment",
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        isRead: true,
    },
    {
        id: "3",
        title: "Schedule Updated",
        message: "Your schedule for tomorrow has been updated.",
        type: "schedule",
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
        isRead: false,
    },
    {
        id: "4",
        title: "New Prescription Added",
        message: "Dr. Alex added a new prescription for you.",
        type: "prescription",
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
    },
    {
        id: "5",
        title: "Payment Successful",
        message: "Your payment of $50 has been successfully processed.",
        type: "payment",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isRead: true,
    },
    {
        id: "6",
        title: "System Maintenance",
        message: "The system will be down for maintenance at midnight.",
        type: "system",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
    },
    {
        id: "7",
        title: "Appointment Reminder",
        message: "Reminder: You have an appointment in 1 hour.",
        type: "appointment",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isRead: false,
    },
    {
        id: "8",
        title: "Prescription Updated",
        message: "Your prescription has been updated by the doctor.",
        type: "prescription",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isRead: true,
    },
    {
        id: "9",
        title: "New Schedule Available",
        message: "Your weekly schedule is now available.",
        type: "schedule",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        isRead: false,
    },
    {
        id: "10",
        title: "Payment Pending",
        message: "Your payment is pending. Please complete it.",
        type: "payment",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isRead: true,
    },
];

const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'appointment': return <Calendar className="h-4 w-4" />;
        case 'schedule': return <Clock className="h-4 w-4" />;
        case 'prescription': return <FileText className="h-4 w-4" />;
        case 'payment': return <CreditCard className="h-4 w-4" />;
        case 'system': return <Settings className="h-4 w-4" />;
        default: return <Bell className="h-4 w-4" />;
    }
};

const NotificationDropdown = () => {
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative h-9 w-9 border-border bg-background hover:bg-muted">
                    <Bell className="h-4 w-4 text-muted-foreground transition-colors" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground border-[1.5px] border-background text-background">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-semibold text-sm">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <ScrollArea className="h-[300px]">
                    <div className="flex flex-col gap-1 p-2">
                        {MOCK_NOTIFICATIONS.map((notification) => (
                            <div
                                key={notification.id}
                                className={cn(
                                    "flex items-start gap-3 rounded-md p-2 transition-colors cursor-pointer text-sm",
                                    !notification.isRead ? "bg-muted/40 hover:bg-muted/60" : "hover:bg-muted/50"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-full shrink-0 border",
                                    !notification.isRead ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted border-border text-muted-foreground"
                                )}>
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="flex flex-col gap-1 flex-1 overflow-hidden">
                                    <div className="flex justify-between items-start w-full gap-2">
                                        <span className={cn(
                                            "font-medium leading-none truncate",
                                            !notification.isRead ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {notification.title}
                                        </span>
                                        {!notification.isRead && (
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-0.5"></div>
                                        )}
                                    </div>
                                    <span className="text-muted-foreground text-xs leading-snug line-clamp-2">
                                        {notification.message}
                                    </span>
                                    <span className="text-muted-foreground text-[10px] mt-0.5 font-medium">
                                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full justify-center cursor-pointer text-primary py-2 text-xs font-medium">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown;