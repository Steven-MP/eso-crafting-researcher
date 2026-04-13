import { describe, expect, it } from "bun:test";
import { cn } from "./utils";

describe("cn", () => {
	it("returns a single class name unchanged", () => {
		expect(cn("foo")).toBe("foo");
	});

	it("joins multiple class names", () => {
		expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
	});

	it("filters out falsy values", () => {
		expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
	});

	it("handles conditional class objects", () => {
		expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
	});

	it("merges conflicting tailwind classes — last wins", () => {
		// tailwind-merge resolves conflicts: p-4 overrides p-2
		expect(cn("p-2", "p-4")).toBe("p-4");
	});

	it("merges conflicting text colour classes", () => {
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
	});

	it("returns empty string when called with no arguments", () => {
		expect(cn()).toBe("");
	});

	it("returns empty string when all values are falsy", () => {
		expect(cn(undefined, null, false)).toBe("");
	});

	it("handles array inputs", () => {
		expect(cn(["foo", "bar"])).toBe("foo bar");
	});

	it("handles nested arrays and objects", () => {
		expect(cn(["foo", { bar: true }], "baz")).toBe("foo bar baz");
	});

	it("does not deduplicate non-conflicting classes", () => {
		expect(cn("flex", "items-center", "justify-between")).toBe(
			"flex items-center justify-between",
		);
	});
});
