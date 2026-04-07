import { cn, getIconComponent } from '@/lib/utils';
import React, { createElement } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
    title: string;
    value: string | number;
    iconName: string;
    color?: string;
    description?: string;
    className?: string;
}

export default function StatsCard({ title, value, iconName, color, description, className }: StatsCardProps) {
    return (
        <Card className={cn(className, "hover:shadow-md transition-all duration-300 border-none shadow-sm")}>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <CardTitle className='text-sm font-medium text-muted-foreground rounded-md'>{title}</CardTitle>
                <div className={cn('p-2 h-9 w-10 rounded-full flex items-center justify-center', color ? color : 'text-primary')}>
                    {
                        createElement(getIconComponent(iconName), { className: 'w-6 h-6' })
                    }

                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>{value}</div>
                {description && (
                    <p className='text-xs text-muted-foreground mt-1'>{description}</p>
                )}
            </CardContent>
        </Card>
    )
} 