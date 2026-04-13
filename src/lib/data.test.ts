import { describe, expect, it } from "bun:test";
import {
	ARMOUR_TRAIT_ABBR,
	ARMOUR_TRAITS,
	DISCIPLINES,
	WEAPON_TRAIT_ABBR,
	WEAPON_TRAITS,
	getAbbrForTrait,
	getTraitsForItem,
} from "./data";
import type { ItemDef } from "./types";

// ──────────────────────────────────────────────────────────────
// ARMOUR_TRAITS
// ──────────────────────────────────────────────────────────────
describe("ARMOUR_TRAITS", () => {
	it("has exactly 9 traits", () => {
		expect(ARMOUR_TRAITS.length).toBe(9);
	});

	it("contains nirnhoned as the last trait", () => {
		expect(ARMOUR_TRAITS[ARMOUR_TRAITS.length - 1].id).toBe("nirnhoned");
	});

	it("includes all expected trait ids", () => {
		const ids = ARMOUR_TRAITS.map((t) => t.id);
		expect(ids).toContain("sturdy");
		expect(ids).toContain("impenetrable");
		expect(ids).toContain("reinforced");
		expect(ids).toContain("well-fitted");
		expect(ids).toContain("training");
		expect(ids).toContain("infused");
		expect(ids).toContain("invigorating");
		expect(ids).toContain("divines");
		expect(ids).toContain("nirnhoned");
	});

	it("every trait has a non-empty id and name", () => {
		for (const trait of ARMOUR_TRAITS) {
			expect(trait.id.length).toBeGreaterThan(0);
			expect(trait.name.length).toBeGreaterThan(0);
		}
	});
});

// ──────────────────────────────────────────────────────────────
// WEAPON_TRAITS
// ──────────────────────────────────────────────────────────────
describe("WEAPON_TRAITS", () => {
	it("has exactly 9 traits", () => {
		expect(WEAPON_TRAITS.length).toBe(9);
	});

	it("contains nirnhoned as the last trait", () => {
		expect(WEAPON_TRAITS[WEAPON_TRAITS.length - 1].id).toBe("nirnhoned");
	});

	it("includes all expected trait ids", () => {
		const ids = WEAPON_TRAITS.map((t) => t.id);
		expect(ids).toContain("powered");
		expect(ids).toContain("charged");
		expect(ids).toContain("precise");
		expect(ids).toContain("infused");
		expect(ids).toContain("defending");
		expect(ids).toContain("training");
		expect(ids).toContain("sharpened");
		expect(ids).toContain("decisive");
		expect(ids).toContain("nirnhoned");
	});

	it("every trait has a non-empty id and name", () => {
		for (const trait of WEAPON_TRAITS) {
			expect(trait.id.length).toBeGreaterThan(0);
			expect(trait.name.length).toBeGreaterThan(0);
		}
	});
});

// ──────────────────────────────────────────────────────────────
// ARMOUR_TRAIT_ABBR
// ──────────────────────────────────────────────────────────────
describe("ARMOUR_TRAIT_ABBR", () => {
	it("has an abbreviation for every armour trait", () => {
		for (const trait of ARMOUR_TRAITS) {
			expect(ARMOUR_TRAIT_ABBR[trait.id]).toBeDefined();
		}
	});

	it("returns correct abbreviations", () => {
		expect(ARMOUR_TRAIT_ABBR.sturdy).toBe("Std");
		expect(ARMOUR_TRAIT_ABBR.impenetrable).toBe("Imp");
		expect(ARMOUR_TRAIT_ABBR.reinforced).toBe("Rfd");
		expect(ARMOUR_TRAIT_ABBR["well-fitted"]).toBe("WFit");
		expect(ARMOUR_TRAIT_ABBR.training).toBe("Trn");
		expect(ARMOUR_TRAIT_ABBR.infused).toBe("Inf");
		expect(ARMOUR_TRAIT_ABBR.invigorating).toBe("Inv");
		expect(ARMOUR_TRAIT_ABBR.divines).toBe("Div");
		expect(ARMOUR_TRAIT_ABBR.nirnhoned).toBe("Nrn");
	});
});

// ──────────────────────────────────────────────────────────────
// WEAPON_TRAIT_ABBR
// ──────────────────────────────────────────────────────────────
describe("WEAPON_TRAIT_ABBR", () => {
	it("has an abbreviation for every weapon trait", () => {
		for (const trait of WEAPON_TRAITS) {
			expect(WEAPON_TRAIT_ABBR[trait.id]).toBeDefined();
		}
	});

	it("returns correct abbreviations", () => {
		expect(WEAPON_TRAIT_ABBR.powered).toBe("Pwr");
		expect(WEAPON_TRAIT_ABBR.charged).toBe("Chg");
		expect(WEAPON_TRAIT_ABBR.precise).toBe("Prc");
		expect(WEAPON_TRAIT_ABBR.infused).toBe("Inf");
		expect(WEAPON_TRAIT_ABBR.defending).toBe("Def");
		expect(WEAPON_TRAIT_ABBR.training).toBe("Trn");
		expect(WEAPON_TRAIT_ABBR.sharpened).toBe("Shp");
		expect(WEAPON_TRAIT_ABBR.decisive).toBe("Dec");
		expect(WEAPON_TRAIT_ABBR.nirnhoned).toBe("Nrn");
	});
});

// ──────────────────────────────────────────────────────────────
// DISCIPLINES
// ──────────────────────────────────────────────────────────────
describe("DISCIPLINES", () => {
	it("contains exactly 3 disciplines", () => {
		expect(DISCIPLINES.length).toBe(3);
	});

	it("has the correct discipline ids in order", () => {
		expect(DISCIPLINES[0].id).toBe("clothing");
		expect(DISCIPLINES[1].id).toBe("blacksmithing");
		expect(DISCIPLINES[2].id).toBe("woodworking");
	});

	it("every discipline has at least one category", () => {
		for (const discipline of DISCIPLINES) {
			expect(discipline.categories.length).toBeGreaterThan(0);
		}
	});

	it("every category has at least one item", () => {
		for (const discipline of DISCIPLINES) {
			for (const category of discipline.categories) {
				expect(category.items.length).toBeGreaterThan(0);
			}
		}
	});

	it("every item has a valid traitType", () => {
		for (const discipline of DISCIPLINES) {
			for (const category of discipline.categories) {
				for (const item of category.items) {
					expect(["armour", "weapon"]).toContain(item.traitType);
				}
			}
		}
	});

	describe("clothing", () => {
		const clothing = DISCIPLINES.find((d) => d.id === "clothing")!;

		it("has light armour and medium armour categories", () => {
			const ids = clothing.categories.map((c) => c.id);
			expect(ids).toContain("light-armour");
			expect(ids).toContain("medium-armour");
		});

		it("light armour has 7 items", () => {
			const light = clothing.categories.find((c) => c.id === "light-armour")!;
			expect(light.items.length).toBe(7);
		});

		it("medium armour has 7 items", () => {
			const medium = clothing.categories.find(
				(c) => c.id === "medium-armour",
			)!;
			expect(medium.items.length).toBe(7);
		});

		it("all items are armour type", () => {
			for (const category of clothing.categories) {
				for (const item of category.items) {
					expect(item.traitType).toBe("armour");
				}
			}
		});
	});

	describe("blacksmithing", () => {
		const bs = DISCIPLINES.find((d) => d.id === "blacksmithing")!;

		it("has heavy armour and weapons categories", () => {
			const ids = bs.categories.map((c) => c.id);
			expect(ids).toContain("heavy-armour");
			expect(ids).toContain("bs-weapons");
		});

		it("weapons category has 7 items", () => {
			const weapons = bs.categories.find((c) => c.id === "bs-weapons")!;
			expect(weapons.items.length).toBe(7);
		});

		it("weapons category items are weapon type", () => {
			const weapons = bs.categories.find((c) => c.id === "bs-weapons")!;
			for (const item of weapons.items) {
				expect(item.traitType).toBe("weapon");
			}
		});
	});

	describe("woodworking", () => {
		const ww = DISCIPLINES.find((d) => d.id === "woodworking")!;

		it("has apparel and weapons categories", () => {
			const ids = ww.categories.map((c) => c.id);
			expect(ids).toContain("ww-apparel");
			expect(ids).toContain("ww-weapons");
		});

		it("apparel category has only shield", () => {
			const apparel = ww.categories.find((c) => c.id === "ww-apparel")!;
			expect(apparel.items.length).toBe(1);
			expect(apparel.items[0].id).toBe("shield");
		});

		it("weapons category has 5 items", () => {
			const weapons = ww.categories.find((c) => c.id === "ww-weapons")!;
			expect(weapons.items.length).toBe(5);
		});
	});
});

// ──────────────────────────────────────────────────────────────
// getTraitsForItem
// ──────────────────────────────────────────────────────────────
describe("getTraitsForItem", () => {
	const armourItem: ItemDef = { id: "robe", name: "Robe", traitType: "armour" };
	const weaponItem: ItemDef = { id: "sword", name: "Sword", traitType: "weapon" };

	it("returns ARMOUR_TRAITS for an armour item", () => {
		expect(getTraitsForItem(armourItem)).toBe(ARMOUR_TRAITS);
	});

	it("returns WEAPON_TRAITS for a weapon item", () => {
		expect(getTraitsForItem(weaponItem)).toBe(WEAPON_TRAITS);
	});

	it("armour item gets 9 traits", () => {
		expect(getTraitsForItem(armourItem).length).toBe(9);
	});

	it("weapon item gets 9 traits", () => {
		expect(getTraitsForItem(weaponItem).length).toBe(9);
	});
});

// ──────────────────────────────────────────────────────────────
// getAbbrForTrait
// ──────────────────────────────────────────────────────────────
describe("getAbbrForTrait", () => {
	const armourItem: ItemDef = { id: "robe", name: "Robe", traitType: "armour" };
	const weaponItem: ItemDef = {
		id: "sword",
		name: "Sword",
		traitType: "weapon",
	};

	it("returns correct armour trait abbreviation", () => {
		expect(getAbbrForTrait(armourItem, "sturdy")).toBe("Std");
		expect(getAbbrForTrait(armourItem, "nirnhoned")).toBe("Nrn");
		expect(getAbbrForTrait(armourItem, "well-fitted")).toBe("WFit");
	});

	it("returns correct weapon trait abbreviation", () => {
		expect(getAbbrForTrait(weaponItem, "powered")).toBe("Pwr");
		expect(getAbbrForTrait(weaponItem, "nirnhoned")).toBe("Nrn");
		expect(getAbbrForTrait(weaponItem, "sharpened")).toBe("Shp");
	});

	it("falls back to the traitId when abbreviation is not found", () => {
		expect(getAbbrForTrait(armourItem, "unknown-trait")).toBe("unknown-trait");
		expect(getAbbrForTrait(weaponItem, "unknown-trait")).toBe("unknown-trait");
	});

	it("armour and weapon share the same abbreviation for shared trait ids", () => {
		// Both use "Nrn" for nirnhoned, "Trn" for training, "Inf" for infused
		expect(getAbbrForTrait(armourItem, "nirnhoned")).toBe(
			getAbbrForTrait(weaponItem, "nirnhoned"),
		);
		expect(getAbbrForTrait(armourItem, "training")).toBe(
			getAbbrForTrait(weaponItem, "training"),
		);
		expect(getAbbrForTrait(armourItem, "infused")).toBe(
			getAbbrForTrait(weaponItem, "infused"),
		);
	});
});
