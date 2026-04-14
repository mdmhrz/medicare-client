'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    children: React.ReactNode
    className?: string
    showCloseButton?: boolean
}

export default function Modal({
    open,
    onOpenChange,
    title,
    children,
    className,
    showCloseButton = true
}: ModalProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className={cn('max-w-2xl max-h-[90vh] p-0', className)}>
                <AlertDialogHeader className="flex flex-row items-center justify-between space-y-0 p-6 border-b">
                    <AlertDialogTitle className="text-xl font-semibold">{title}</AlertDialogTitle>
                    {showCloseButton && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onOpenChange(false)}
                            className="h-8 w-8 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </AlertDialogHeader>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] data-table-wrapper">
                    {children}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
