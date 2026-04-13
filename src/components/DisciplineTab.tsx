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
	let count = 0;

	for (const category of discipline.categories) {
		for (const item of category.items) {
			const traits = getTraitsForItem(item);
			total += traits.length;
			for (const trait of traits) {
				if (researched.get(makeKey(discipline.id, item.id, trait.id)) === "done") {
					count++;
				}
			}
		}
	}

	return (
		<div className="pt-4">
			<div className="flex items-center gap-2 mb-4">
				<span className="text-sm text-muted-foreground">Progress:</span>
				<ProgressBadge count={count} total={total} />
				<span className="text-sm text-muted-foreground">traits researched</span>
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
