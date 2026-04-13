import type { DisciplineDef, ItemDef, TraitDef } from "./types";

export const ARMOUR_TRAITS: readonly TraitDef[] = [
	{ id: "sturdy", name: "Sturdy" },
	{ id: "impenetrable", name: "Impenetrable" },
	{ id: "reinforced", name: "Reinforced" },
	{ id: "well-fitted", name: "Well Fitted" },
	{ id: "training", name: "Training" },
	{ id: "infused", name: "Infused" },
	{ id: "invigorating", name: "Invigorating" },
	{ id: "divines", name: "Divines" },
	{ id: "nirnhoned", name: "Nirnhoned" },
];

export const WEAPON_TRAITS: readonly TraitDef[] = [
	{ id: "powered", name: "Powered" },
	{ id: "charged", name: "Charged" },
	{ id: "precise", name: "Precise" },
	{ id: "infused", name: "Infused" },
	{ id: "defending", name: "Defending" },
	{ id: "training", name: "Training" },
	{ id: "sharpened", name: "Sharpened" },
	{ id: "decisive", name: "Decisive" },
	{ id: "nirnhoned", name: "Nirnhoned" },
];

export const ARMOUR_TRAIT_ABBR: Record<string, string> = {
	sturdy: "Std",
	impenetrable: "Imp",
	reinforced: "Rfd",
	"well-fitted": "WFit",
	training: "Trn",
	infused: "Inf",
	invigorating: "Inv",
	divines: "Div",
	nirnhoned: "Nrn",
};

export const WEAPON_TRAIT_ABBR: Record<string, string> = {
	powered: "Pwr",
	charged: "Chg",
	precise: "Prc",
	infused: "Inf",
	defending: "Def",
	training: "Trn",
	sharpened: "Shp",
	decisive: "Dec",
	nirnhoned: "Nrn",
};

export const DISCIPLINES: readonly DisciplineDef[] = [
	{
		id: "clothing",
		name: "Clothing",
		categories: [
			{
				id: "light-armour",
				name: "Light Armour",
				items: [
					{ id: "robe", name: "Robe & Jerkin", traitType: "armour" },
					{ id: "shoes", name: "Shoes", traitType: "armour" },
					{ id: "gloves", name: "Gloves", traitType: "armour" },
					{ id: "hat", name: "Hat", traitType: "armour" },
					{ id: "breeches", name: "Breeches", traitType: "armour" },
					{ id: "epaulets", name: "Epaulets", traitType: "armour" },
					{ id: "sash", name: "Sash", traitType: "armour" },
				],
			},
			{
				id: "medium-armour",
				name: "Medium Armour",
				items: [
					{ id: "jack", name: "Jack", traitType: "armour" },
					{ id: "boots", name: "Boots", traitType: "armour" },
					{ id: "bracers", name: "Bracers", traitType: "armour" },
					{ id: "helmet", name: "Helmet", traitType: "armour" },
					{ id: "guards", name: "Guards", traitType: "armour" },
					{ id: "arm-cops", name: "Arm Cops", traitType: "armour" },
					{ id: "belt", name: "Belt", traitType: "armour" },
				],
			},
		],
	},
	{
		id: "blacksmithing",
		name: "Blacksmithing",
		categories: [
			{
				id: "heavy-armour",
				name: "Heavy Armour",
				items: [
					{ id: "cuirass", name: "Cuirass", traitType: "armour" },
					{ id: "sabatons", name: "Sabatons", traitType: "armour" },
					{ id: "gauntlets", name: "Gauntlets", traitType: "armour" },
					{ id: "helm", name: "Helm", traitType: "armour" },
					{ id: "greaves", name: "Greaves", traitType: "armour" },
					{ id: "pauldron", name: "Pauldron", traitType: "armour" },
					{ id: "girdle", name: "Girdle", traitType: "armour" },
				],
			},
			{
				id: "bs-weapons",
				name: "Weapons",
				items: [
					{ id: "axe", name: "Axe", traitType: "weapon" },
					{ id: "mace", name: "Mace", traitType: "weapon" },
					{ id: "sword", name: "Sword", traitType: "weapon" },
					{ id: "battle-axe", name: "Battle Axe", traitType: "weapon" },
					{ id: "maul", name: "Maul", traitType: "weapon" },
					{ id: "greatsword", name: "Greatsword", traitType: "weapon" },
					{ id: "dagger", name: "Dagger", traitType: "weapon" },
				],
			},
		],
	},
	{
		id: "woodworking",
		name: "Woodworking",
		categories: [
			{
				id: "ww-apparel",
				name: "Apparel",
				items: [{ id: "shield", name: "Shield", traitType: "armour" }],
			},
			{
				id: "ww-weapons",
				name: "Weapons",
				items: [
					{ id: "bow", name: "Bow", traitType: "weapon" },
					{ id: "inferno-staff", name: "Inferno Staff", traitType: "weapon" },
					{ id: "ice-staff", name: "Ice Staff", traitType: "weapon" },
					{
						id: "lightning-staff",
						name: "Lightning Staff",
						traitType: "weapon",
					},
					{
						id: "restoration-staff",
						name: "Restoration Staff",
						traitType: "weapon",
					},
				],
			},
		],
	},
];

export function getTraitsForItem(item: ItemDef): readonly TraitDef[] {
	return item.traitType === "armour" ? ARMOUR_TRAITS : WEAPON_TRAITS;
}

export function getAbbrForTrait(item: ItemDef, traitId: string): string {
	const abbr =
		item.traitType === "armour" ? ARMOUR_TRAIT_ABBR : WEAPON_TRAIT_ABBR;
	return abbr[traitId] ?? traitId;
}
