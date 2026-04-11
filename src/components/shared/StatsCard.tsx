import { cn, getIconComponent } from '@/lib/utils'
import React, { createElement } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
    title: string
    value: string | number
    iconName: string
    color?: string
    description?: string
    className?: string
    iconClassName?: string
}

export default function StatsCard({
    title,
    value,
    iconName,
    color = "bg-primary/10 text-primary",
    description,
    className,
    iconClassName,
}: StatsCardProps) {
    const Icon = getIconComponent(iconName)

    return (
        <Card
            className={cn(
                "group rounded-x border-0 bg-card text-card-foreground shadow-none  py-0 hover:shadow-md transition-all duration-300",
                className
            )}
        >
            <CardContent className="p-4">
                <div className="flex items-start justify-between">

                    {/* Left */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground leading-none">
                            {title}
                        </p>

                        <div className="text-2xl font-semibold tracking-tight">
                            {value}
                        </div>

                        {description && (
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Right (Icon) */}
                    <div
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors",
                            "group-hover:bg-accent group-hover:text-accent-foreground",
                            color,
                            iconClassName
                        )}
                    >
                        {createElement(Icon, {
                            className: "h-5 w-5 text-primary",
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}