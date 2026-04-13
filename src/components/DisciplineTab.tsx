import { CategorySection } from "@/components/CategorySection";
import { ProgressBadge } from "@/components/ProgressBadge";
import { getTraitsForItem } from "@/lib/data";
import type { TraitState } from "@/lib/storage";
import type { DisciplineDef } from "@/lib/types";
import { type Discipline, makeKey } from "@/lib/types";

interface DisciplineTabProps {
	discipline: DisciplineDef;
	researched: Map<string, TraitState>;
	onToggle: (itemId: string, traitId: string) => void;
}

export function DisciplineTab({
	discipline,
	researched,
	onToggle,
}: DisciplineTabProps) {
	let total = 0;
	let done = 0;
	let ready = 0;
	let nirnhonedUnchecked = 0;
	let otherUnchecked = 0;

	for (const category of discipline.categories) {
		for (const item of category.items) {
			const traits = getTraitsForItem(item);
			total += traits.length;
			for (const trait of traits) {
				const state = researched.get(makeKey(discipline.id, item.id, trait.id));
				if (state === "done") {
					done++;
				} else if (state === "ready") {
					ready++;
				} else if (trait.id === "nirnhoned") {
					nirnhonedUnchecked++;
				} else {
					otherUnchecked++;
				}
			}
		}
	}

	const segments = [
		{ count: done, colour: "#1A7339" },
		{ count: ready, colour: "#0F6FA7" },
		{ count: nirnhonedUnchecked, colour: "#B91C1C" },
		{ count: otherUnchecked, colour: "#6B7280" },
	];

	return (
		<div className="pt-4">
			<div className="flex items-center gap-2 mb-2">
				<span className="text-sm text-muted-foreground">Progress:</span>
				<ProgressBadge count={done} total={total} />
				<span className="text-sm text-muted-foreground">traits researched</span>
			</div>
			<div className="flex h-2 w-full overflow-hidden rounded-full mb-4">
				{segments.map((seg) =>
					seg.count > 0 ? (
						<div
							key={seg.colour}
							style={{
								width: `${(seg.count / total) * 100}%`,
								backgroundColor: seg.colour,
							}}
						/>
					) : null,
				)}
			</div>
			{discipline.categories.map((category) => (
				<CategorySection
					key={category.id}
					category={category}
					discipline={discipline.id as Discipline}
					researched={researched}
					onToggle={onToggle}
				/>
			))}
		</div>
	);
}
