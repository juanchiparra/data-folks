export function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00Z`);
}

export function startOfTodayUTC(now: Date): number {
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

export function isActive(dateStr: string, now: Date): boolean {
  return parseDate(dateStr).getTime() >= startOfTodayUTC(now);
}
