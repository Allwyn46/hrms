import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export type { ClassValue };

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transform(value: boolean | string): boolean {
  return typeof value === 'string' ? value === '' : value;
}

export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
}
