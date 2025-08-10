/**
 * @name utils.js
 * @description Function for tailwind.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// DEPENDENCIES
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// FUNCTION
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
