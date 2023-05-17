import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parse } from 'date-fns'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const absoluteUrl = (path: string) => `${process.env.NEXT_PUBLIC_APP_URL}${path}`

export const formatDate = (dateAsString: string) => format(new Date(dateAsString), "yyyy-MM-dd")

export const formatInputTime = (dateAsString: string) => format(new Date(dateAsString), "HH:mm")
export const formatTime = (timeAsString: string) => format(parse(timeAsString.split(":", 2).join(":"), "HH:mm", new Date()), "hh:mm a")
export const formatDayOfWeek = (dateAsString: string) => format(new Date(dateAsString), "cccc")
export const formatDayOfMonth = (dateAsString: string) => format(new Date(dateAsString), "eo")
