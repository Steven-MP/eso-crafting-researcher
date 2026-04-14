import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiDownload2Line, RiUpload2Line } from "@remixicon/react";

const STORAGE_KEY = "eso-crafting-researcher";

interface Props {
	onImport: (data: Record<string, unknown>) => void;
}

export function StorageManager({ onImport }: Props) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function handleOutsideClick(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		}
		if (open) {
			document.addEventListener("mousedown", handleOutsideClick);
		}
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [open]);

	function handleExport() {
		const raw = localStorage.getItem(STORAGE_KEY) ?? "{}";
		const blob = new Blob([raw], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "eso-research-backup.txt";
		a.click();
		URL.revokeObjectURL(url);
		setOpen(false);
	}

	function handleImportClick() {
		fileInputRef.current?.click();
		setOpen(false);
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const text = event.target?.result as string;
				const parsed = JSON.parse(text) as unknown;
				if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
					alert("Invalid backup file: expected a JSON object.");
					return;
				}
				onImport(parsed as Record<string, unknown>);
			} catch {
				alert("Could not read backup file. Make sure it is a valid export.");
			}
		};
		reader.readAsText(file);
		e.target.value = "";
	}

	return (
		<div ref={containerRef} className="relative">
			<button
				onClick={() => setOpen((v) => !v)}
				className="flex items-center gap-1 px-3 py-1.5 text-sm rounded border border-border bg-background hover:bg-muted transition-colors cursor-pointer"
				aria-haspopup="true"
				aria-expanded={open}
			>
				Data
				<RiArrowDownSLine
					className={`size-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
				/>
			</button>
			{open && (
				<div className="absolute right-0 top-full mt-1 z-50 min-w-[130px] rounded border border-border bg-background shadow-md overflow-hidden">
					<button
						onClick={handleExport}
						className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted text-left transition-colors cursor-pointer"
					>
						<RiDownload2Line className="size-4 shrink-0" />
						Export
					</button>
					<button
						onClick={handleImportClick}
						className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted text-left transition-colors cursor-pointer"
					>
						<RiUpload2Line className="size-4 shrink-0" />
						Import
					</button>
				</div>
			)}
			<input
				ref={fileInputRef}
				type="file"
				accept=".txt,.json"
				className="hidden"
				onChange={handleFileChange}
			/>
		</div>
	);
}
