# Test Data

These `.txt` files are mock exports for testing the import/export feature. Import them via the **Data** dropdown in the top-right corner of the app.

| File | Description |
|------|-------------|
| `mock-partial.txt` | Mixed state — some traits `done`, some `ready`, most untouched. Good for verifying that both states render correctly and progress bars show mid-progress. |
| `mock-all-done.txt` | Every trait across all three disciplines set to `done`. Progress bars should show 100% green. |
| `mock-all-ready.txt` | A subset of traits set to `ready` (in-progress). Progress bars should show blue segments only, no green. |
| `mock-empty.txt` | Empty object `{}`. Importing this clears all progress — useful to reset state without touching DevTools. |

## How to use

1. Open the app.
2. Click the **Data** button in the top-right.
3. Select **Import**.
4. Choose one of these `.txt` files.
5. The page will update immediately with the mock data.

To get back your real data, use **Export** before importing any test file.
