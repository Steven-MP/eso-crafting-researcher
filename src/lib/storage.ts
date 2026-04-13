export type TraitState = "ready" | "done";

const STORAGE_KEY = "eso-crafting-researcher";

export function loadResearched(): Map<string, TraitState> {
	if (typeof window === "undefined") return new Map();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return new Map();
		const parsed = JSON.parse(raw) as unknown;
		// Migration: old format was string[] where all entries were 'done'
		if (Array.isArray(parsed)) {
			return new Map(
				parsed
					.filter((x): x is string => typeof x === "string")
					.map((k) => [k, "done"]),
			);
		}
		if (typeof parsed === "object" && parsed !== null) {
			return new Map(
				Object.entries(parsed as Record<string, unknown>)
					.filter(([, v]) => v === "ready" || v === "done")
					.map(([k, v]) => [k, v as TraitState]),
			);
		}
		return new Map();
	} catch {
		return new Map();
	}
}

export function saveResearched(map: Map<string, TraitState>): void {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(map)));
}
