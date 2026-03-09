'use client';

// Progress key format (durable per-mission, per-track, per-locale):
//   progress:{track}:{locale}:{missionId}
// Value: ISO timestamp string (completedAt)

const LEGACY_KEY = 'learn.progress.v1';

export type Progress = {
  // missionId -> ISO timestamp (legacy aggregate format)
  completedAt: Record<string, string>;
};

export function progressKey(track: string, locale: string, missionId: string) {
  return `progress:${track}:${locale}:${missionId}`;
}

function migrateLegacyToPerMission(track: string, locale: string) {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return;

    // Back-compat: v1 used {completed: Record<string, boolean>}
    let completedAt: Record<string, string> = {};
    if (parsed.completed && typeof parsed.completed === 'object') {
      const now = new Date().toISOString();
      for (const k of Object.keys(parsed.completed)) {
        if (parsed.completed[k]) completedAt[k] = now;
      }
    } else {
      completedAt = (parsed.completedAt && typeof parsed.completedAt === 'object') ? parsed.completedAt : {};
    }

    for (const missionId of Object.keys(completedAt)) {
      const k = progressKey(track, locale, missionId);
      if (!localStorage.getItem(k)) {
        localStorage.setItem(k, String(completedAt[missionId]));
      }
    }

    // Keep legacy key for now (non-destructive migration).
  } catch {
    // ignore
  }
}

export function isCompleted(track: string, locale: string, missionId: string) {
  try {
    migrateLegacyToPerMission(track, locale);
    return Boolean(localStorage.getItem(progressKey(track, locale, missionId)));
  } catch {
    return false;
  }
}

export function markCompleted(track: string, locale: string, missionId: string) {
  migrateLegacyToPerMission(track, locale);
  localStorage.setItem(progressKey(track, locale, missionId), new Date().toISOString());
}

export function markUncompleted(track: string, locale: string, missionId: string) {
  migrateLegacyToPerMission(track, locale);
  localStorage.removeItem(progressKey(track, locale, missionId));
}

// --- Legacy aggregate API (kept for minimal churn in existing code) ---
export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return {completedAt: {}};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {completedAt: {}};

    // Back-compat: v1 used {completed: Record<string, boolean>}
    if (parsed.completed && typeof parsed.completed === 'object') {
      const completedAt: Record<string, string> = {};
      const now = new Date().toISOString();
      for (const k of Object.keys(parsed.completed)) {
        if (parsed.completed[k]) completedAt[k] = now;
      }
      return {completedAt};
    }

    return {completedAt: parsed.completedAt || {}};
  } catch {
    return {completedAt: {}};
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(LEGACY_KEY, JSON.stringify(progress));
}

export function mergeServerCompleted(rows: Array<{missionId: string; completedAt: string}>, track = 'web', locale = 'ko') {
  // Per-mission durable keys
  migrateLegacyToPerMission(track, locale);
  for (const r of rows) {
    const k = progressKey(track, locale, r.missionId);
    if (!localStorage.getItem(k)) localStorage.setItem(k, r.completedAt);
  }

  // Also maintain legacy aggregate (best effort)
  const p = loadProgress();
  for (const r of rows) {
    if (!p.completedAt[r.missionId]) p.completedAt[r.missionId] = r.completedAt;
  }
  saveProgress(p);
}

export function markCompletedLegacy(missionId: string) {
  const p = loadProgress();
  p.completedAt[missionId] = new Date().toISOString();
  saveProgress(p);
}

export function markUncompletedLegacy(missionId: string) {
  const p = loadProgress();
  delete p.completedAt[missionId];
  saveProgress(p);
}
