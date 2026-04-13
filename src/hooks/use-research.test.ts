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
});
