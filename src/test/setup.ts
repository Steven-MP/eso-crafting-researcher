import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";

// Register all DOM globals (window, document, localStorage, etc.) so that
// both React Testing Library and storage code work in the Bun test runner.
GlobalRegistrator.register();

// ── Hooks ────────────────────────────────────────────────────────────────────

// Clean up React Testing Library after each test
afterEach(() => {
	cleanup();
});

// Reset localStorage after each test
afterEach(() => {
	localStorage.clear();
});
