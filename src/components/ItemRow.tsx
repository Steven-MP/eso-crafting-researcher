import { ProgressBadge } from "@/components/ProgressBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { getTraitsForItem } from "@/lib/data";
import type { TraitState } from "@/lib/storage";
import type { Discipline, ItemDef } from "@/lib/types";
import { makeKey } from "@/lib/types";

interface ItemRowProps {
	item: ItemDef;
	discipline: Discipline;
	researched: Map<string, TraitState>;
	onToggle: (traitId: string) => void;
}

export function ItemRow({
	item,
	discipline,
	researched,
	onToggle,
}: ItemRowProps) {
	const traits = getTraitsForItem(item);
	const researchedCount = traits.filter(
		(t) => researched.get(makeKey(discipline, item.id, t.id)) === "done",
	).length;

	return (
		<div className="grid grid-cols-[minmax(100px,1fr)_repeat(9,32px)_36px] items-center gap-x-1 py-1 border-b border-border/40 last:border-0">
			<span className="text-sm truncate pr-2" title={item.name}>
				{item.name}
			</span>
			{traits.map((trait) => {
				const key = makeKey(discipline, item.id, trait.id);
				const state = researched.get(key);
				const checked =
					state === "done" ? true : state === "ready" ? "indeterminate" : false;
				return (
					<div
						key={trait.id}
						className="flex items-center justify-center"
						title={trait.name}
					>
						<Checkbox
							checked={checked}
							onCheckedChange={() => onToggle(trait.id)}
							aria-label={`${item.name} — ${trait.name}`}
						/>
					</div>
				);
			})}
			<div className="flex items-center justify-center">
				<ProgressBadge count={researchedCount} total={traits.length} />
			</div>
		</div>
	);
}
