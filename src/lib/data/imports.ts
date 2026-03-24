export const images: Record<string, { default: string }> = import.meta.glob(
    "$lib/images/*.webp",
    { eager: true },
);
