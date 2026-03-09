export const XP_PER_MINUTE = 10;

export const MINUTES_BY_MISSION: Record<string, number> = {
  'mission-1': 12,
  'mission-2': 15,
  'mission-3': 18,
  'mission-4': 20,
  'mission-5': 22,
  'mission-6': 10,
  'mission-7': 12,
  'mission-8': 12,
  'mission-9': 15,
  'mission-10': 15,
  'mission-11': 15,
  'mission-12': 15,
  'mission-13': 12,
  'mission-14': 15,
  'mission-15': 15
};

export function xpForMinutes(minutes: number): number {
  return Math.round(minutes * XP_PER_MINUTE);
}

export function xpForMission(missionId: string): number {
  // Problems: treat each as a small 1-minute win by default.
  if (missionId.startsWith('problem-')) return xpForMinutes(1);

  const m = MINUTES_BY_MISSION[missionId];
  return typeof m === 'number' ? xpForMinutes(m) : 0;
}

export function totalXpForCompleted(missionIds: string[]): number {
  return missionIds.reduce((sum, id) => sum + xpForMission(id), 0);
}

export function levelForXp(totalXp: number): number {
  return Math.max(1, Math.floor(totalXp / 200) + 1);
}

export function nextLevelXp(level: number): number {
  return level * 200;
}
