import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "bun:test";
import { useResearch } from "./use-research";

const STORAGE_KEY = "eso-crafting-researcher";

beforeEach(() => {
	localStorage.clear();
});

describe("useResearch", () => {
	describe("initialisation", () => {
		it("starts with an empty researched Map", () => {
			const { result } = renderHook(() => useResearch());
			// Before the effect fires the map is empty
			expect(result.current.researched).toBeInstanceOf(Map);
		});

		it("hydrates from localStorage on mount", async () => {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ "clothing:robe:sturdy": "done" }),
			);
			const { result } = renderHook(() => useResearch());
			// Wait for the useEffect to run
			await act(async () => {});
			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"done",
			);
		});

		it("starts empty when localStorage has no entry", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});
			expect(result.current.researched.size).toBe(0);
		});
	});

	describe("toggle — three-state cycle", () => {
		it("first toggle sets state to ready", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"ready",
			);
		});

		it("second toggle advances state from ready to done", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});
			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"done",
			);
		});

		it("third toggle removes the key (back to unchecked)", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});
			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});
			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});

			expect(
				result.current.researched.has("clothing:robe:sturdy"),
			).toBeFalse();
		});

		it("a fourth toggle restarts the cycle at ready", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			for (let i = 0; i < 4; i++) {
				act(() => {
					result.current.toggle("clothing", "robe", "sturdy");
				});
			}

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"ready",
			);
		});
	});

	describe("toggle — persistence", () => {
		it("saves to localStorage after toggling to ready", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});

			const raw = localStorage.getItem(STORAGE_KEY)!;
			expect(JSON.parse(raw)["clothing:robe:sturdy"]).toBe("ready");
		});

		it("saves to localStorage after toggling to done", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});
			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});

			const raw = localStorage.getItem(STORAGE_KEY)!;
			expect(JSON.parse(raw)["clothing:robe:sturdy"]).toBe("done");
		});

		it("removes key from localStorage after third toggle", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});
			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});
			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});

			const raw = localStorage.getItem(STORAGE_KEY)!;
			expect(JSON.parse(raw)["clothing:robe:sturdy"]).toBeUndefined();
		});
	});

	describe("toggle — independent keys", () => {
		it("toggling one item does not affect another", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy");
			});
			act(() => {
				result.current.toggle("clothing", "shoes", "divines");
			});

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"ready",
			);
			expect(result.current.researched.get("clothing:shoes:divines")).toBe(
				"ready",
			);
		});

		it("supports toggling across different disciplines", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "nirnhoned");
			});
			act(() => {
				result.current.toggle("blacksmithing", "sword", "powered");
			});
			act(() => {
				result.current.toggle("woodworking", "bow", "charged");
			});

			expect(result.current.researched.size).toBe(3);
		});
	});

	describe("replaceAll", () => {
		it("imports 'done' entries into state", () => {
			const { result } = renderHook(() => useResearch());

			act(() => {
				result.current.replaceAll({
					"clothing:robe:sturdy": "done",
					"blacksmithing:sword:powered": "done",
				});
			});

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"done",
			);
			expect(result.current.researched.get("blacksmithing:sword:powered")).toBe(
				"done",
			);
		});

		it("imports 'ready' entries into state", () => {
			const { result } = renderHook(() => useResearch());

			act(() => {
				result.current.replaceAll({
					"clothing:robe:sturdy": "ready",
					"woodworking:bow:charged": "ready",
				});
			});

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"ready",
			);
			expect(result.current.researched.get("woodworking:bow:charged")).toBe(
				"ready",
			);
		});

		it("filters out entries with invalid state values", () => {
			const { result } = renderHook(() => useResearch());

			act(() => {
				result.current.replaceAll({
					"clothing:robe:sturdy": "done",
					"clothing:robe:impenetrable": "invalid",
					"clothing:robe:reinforced": null,
					"clothing:robe:training": 42,
					"clothing:robe:infused": true,
				});
			});

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"done",
			);
			expect(
				result.current.researched.has("clothing:robe:impenetrable"),
			).toBeFalse();
			expect(
				result.current.researched.has("clothing:robe:reinforced"),
			).toBeFalse();
			expect(
				result.current.researched.has("clothing:robe:training"),
			).toBeFalse();
			expect(result.current.researched.has("clothing:robe:infused")).toBeFalse();
		});

		it("completely overwrites existing state — removed keys disappear", () => {
			const { result } = renderHook(() => useResearch());

			act(() => {
				result.current.replaceAll({
					"clothing:robe:sturdy": "done",
					"clothing:robe:impenetrable": "done",
				});
			});

			act(() => {
				result.current.replaceAll({
					"blacksmithing:sword:powered": "done",
				});
			});

			expect(result.current.researched.has("clothing:robe:sturdy")).toBeFalse();
			expect(
				result.current.researched.has("clothing:robe:impenetrable"),
			).toBeFalse();
			expect(result.current.researched.get("blacksmithing:sword:powered")).toBe(
				"done",
			);
		});

		it("empty object clears all state", () => {
			const { result } = renderHook(() => useResearch());

			act(() => {
				result.current.replaceAll({ "clothing:robe:sturdy": "done" });
			});

			act(() => {
				result.current.replaceAll({});
			});

			expect(result.current.researched.size).toBe(0);
		});

		it("persists valid entries to localStorage", () => {
			const { result } = renderHook(() => useResearch());

			act(() => {
				result.current.replaceAll({
					"clothing:robe:sturdy": "done",
					"woodworking:bow:powered": "ready",
				});
			});

			const stored = JSON.parse(
				localStorage.getItem(STORAGE_KEY) ?? "{}",
			) as Record<string, string>;
			expect(stored["clothing:robe:sturdy"]).toBe("done");
			expect(stored["woodworking:bow:powered"]).toBe("ready");
		});

		it("does not persist invalid entries to localStorage", () => {
			const { result } = renderHook(() => useResearch());

			act(() => {
				result.current.replaceAll({
					"clothing:robe:sturdy": "done",
					"clothing:robe:impenetrable": "bad-value",
				});
			});

			const stored = JSON.parse(
				localStorage.getItem(STORAGE_KEY) ?? "{}",
			) as Record<string, string>;
			expect(stored["clothing:robe:sturdy"]).toBe("done");
			expect("clothing:robe:impenetrable" in stored).toBeFalse();
		});

		it("replaceAll after toggle fully replaces toggle state", async () => {
			const { result } = renderHook(() => useResearch());
			await act(async () => {});

			act(() => {
				result.current.toggle("clothing", "robe", "sturdy"); // → ready
			});
			act(() => {
				result.current.toggle("clothing", "robe", "sturdy"); // → done
			});

			expect(result.current.researched.get("clothing:robe:sturdy")).toBe(
				"done",
			);

			act(() => {
				result.current.replaceAll({ "blacksmithing:sword:powered": "ready" });
			});

			expect(
				result.current.researched.has("clothing:robe:sturdy"),
			).toBeFalse();
			expect(result.current.researched.get("blacksmithing:sword:powered")).toBe(
				"ready",
			);
		});
	});
});
