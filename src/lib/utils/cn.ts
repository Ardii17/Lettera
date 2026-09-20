import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Menggabungkan class Tailwind dengan aman (menghindari konflik utility). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
