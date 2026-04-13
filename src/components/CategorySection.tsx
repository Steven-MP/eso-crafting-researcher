import { ItemRow } from "@/components/ItemRow";
import { getAbbrForTrait, getTraitsForItem } from "@/lib/data";
import type { TraitState } from "@/lib/storage";
import type { CategoryDef, Discipline } from "@/lib/types";

interface CategorySectionProps {
	category: CategoryDef;
	discipline: Discipline;
	researched: Map<string, TraitState>;
	onToggle: (itemId: string, traitId: string) => void;
}

export function CategorySection({
	category,
	discipline,
	researched,
	onToggle,
}: CategorySectionProps) {
	const firstItem = category.items[0];
	const traits = firstItem ? getTraitsForItem(firstItem) : [];

	return (
		<div className="mb-6">
			<h3 className="text-sm font-semibold text-(--heading-color) uppercase tracking-wider mb-2">
				{category.name}
			</h3>
			<div className="rounded-md border border-border bg-card">
				<div className="grid grid-cols-[minmax(100px,1fr)_repeat(9,32px)_36px] items-center gap-x-1 px-3 py-1.5 border-b border-border bg-muted/50 rounded-t-md">
					<span className="text-xs font-medium text-muted-foreground">
						Item
					</span>
					{traits.map((trait) => (
						<div
							key={trait.id}
							className="flex items-center justify-center"
							title={trait.name}
						>
							<span className="text-xs font-medium text-muted-foreground">
								{firstItem ? getAbbrForTrait(firstItem, trait.id) : trait.id}
							</span>
						</div>
					))}
					<span className="text-xs font-medium text-muted-foreground text-center">
						Done
					</span>
				</div>
				<div className="px-3">
					{category.items.map((item) => (
						<ItemRow
							key={item.id}
							item={item}
							discipline={discipline}
							researched={researched}
							onToggle={(traitId) => onToggle(item.id, traitId)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
