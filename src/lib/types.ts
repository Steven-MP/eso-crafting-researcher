export type Discipline = "clothing" | "blacksmithing" | "woodworking";

export type TraitType = "armour" | "weapon";

export interface TraitDef {
	id: string;
	name: string;
}

export interface ItemDef {
	id: string;
	name: string;
	traitType: TraitType;
}

export interface CategoryDef {
	id: string;
	name: string;
	items: ItemDef[];
}

export interface DisciplineDef {
	id: Discipline;
	name: string;
	categories: CategoryDef[];
}

export function makeKey(
	discipline: Discipline,
	itemId: string,
	traitId: string,
): string {
	return `${discipline}:${itemId}:${traitId}`;
}
