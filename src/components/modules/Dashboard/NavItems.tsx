"use client"

import { ScrollArea } from '@/components/ui/scroll-area';
import { NavSection } from '@/types/dashboard.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface NavItemsProps {
    navItems: NavSection[];
}

const NavItems = ({ navItems }: NavItemsProps) => {
    const pathname = usePathname();

    return (
        <ScrollArea className='flex-1 min-h-0'>
            <nav className="h-full">
                {navItems.map((section, i) => (
                    <div key={i}>
                        {section.title && (
                            <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2'>
                                {section.title}
                            </p>
                        )}
                        {section.items.map((item, j) => {
                            const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType;
                            const isActive = pathname === item.href;

                            return (
                                <div key={j} className="px-3 py-1">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                            isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground"
                                        )}
                                    >
                                        {Icon && <Icon className="w-5 h-5" />}
                                        <span>{item.title}</span>
                                    </Link>
                                </div>
                            );
                        })}

                        {i !== navItems.length - 1 && <Separator className='my-2' />}
                    </div>

                ))}
            </nav>
        </ScrollArea>
    );
};

export default NavItems;
