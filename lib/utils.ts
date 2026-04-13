import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts a user-friendly error message from an unknown error object, particularly handling Axios errors.
 * @param error
 * @returns
 */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ?? "Something went wrong. Please try again."
    );
  }
  return "Something went wrong. Please try again.";
}
