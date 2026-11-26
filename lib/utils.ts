export type ClassValue = string | number | boolean | undefined | null;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter((value) => typeof value === "string" && value.trim().length > 0).join(" ");
}
