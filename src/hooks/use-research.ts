import { useEffect, useState } from "react";
import { loadResearched, saveResearched } from "@/lib/storage";
import type { TraitState } from "@/lib/storage";
import type { Discipline } from "@/lib/types";
import { makeKey } from "@/lib/types";

export function useResearch() {
	const [researched, setResearched] = useState<Map<string, TraitState>>(
		new Map(),
	);

	useEffect(() => {
		setResearched(loadResearched());
	}, []);

	function toggle(discipline: Discipline, itemId: string, traitId: string) {
		const key = makeKey(discipline, itemId, traitId);
		setResearched((prev) => {
			const next = new Map(prev);
			const current = next.get(key);
			if (!current) {
				next.set(key, "ready");
			} else if (current === "ready") {
				next.set(key, "done");
			} else {
				next.delete(key);
			}
			saveResearched(next);
			return next;
		});
	}

	function replaceAll(data: Record<string, unknown>) {
		const validated = new Map<string, TraitState>(
			Object.entries(data)
				.filter(([, v]) => v === "ready" || v === "done")
				.map(([k, v]) => [k, v as TraitState]),
		);
		saveResearched(validated);
		setResearched(validated);
	}

	return { researched, toggle, replaceAll };
}
