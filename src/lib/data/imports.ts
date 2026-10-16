import type { Picture } from "@sveltejs/enhanced-img";

export const images: Record<string, { default: Picture }> = import.meta.glob(
  "#lib/images/*.webp",
  { eager: true, query: { enhanced: true } },
);
