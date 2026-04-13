import { describe, expect, it } from "bun:test";
import { makeKey } from "./types";

describe("makeKey", () => {
	it("combines discipline, itemId, and traitId with colons", () => {
		expect(makeKey("clothing", "robe", "sturdy")).toBe("clothing:robe:sturdy");
	});

	it("works for blacksmithing discipline", () => {
		expect(makeKey("blacksmithing", "sword", "powered")).toBe(
			"blacksmithing:sword:powered",
		);
	});

	it("works for woodworking discipline", () => {
		expect(makeKey("woodworking", "bow", "nirnhoned")).toBe(
			"woodworking:bow:nirnhoned",
		);
	});

	it("handles hyphenated item and trait ids", () => {
		expect(makeKey("clothing", "arm-cops", "well-fitted")).toBe(
			"clothing:arm-cops:well-fitted",
		);
	});

	it("produces unique keys for different disciplines with same item/trait", () => {
		const key1 = makeKey("clothing", "helm", "infused");
		const key2 = makeKey("blacksmithing", "helm", "infused");
		expect(key1).not.toBe(key2);
	});

	it("produces unique keys for different items with same discipline/trait", () => {
		const key1 = makeKey("blacksmithing", "axe", "training");
		const key2 = makeKey("blacksmithing", "mace", "training");
		expect(key1).not.toBe(key2);
	});

	it("produces unique keys for different traits with same discipline/item", () => {
		const key1 = makeKey("clothing", "robe", "sturdy");
		const key2 = makeKey("clothing", "robe", "divines");
		expect(key1).not.toBe(key2);
	});
});
