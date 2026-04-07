import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as LucideIcons from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIconComponent = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle;
}
