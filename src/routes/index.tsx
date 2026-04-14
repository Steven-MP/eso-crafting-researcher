import { createFileRoute } from "@tanstack/react-router";
import { RiPencilRuler2Line } from "@remixicon/react";
import { DisciplineTab } from "@/components/DisciplineTab";
import { StorageManager } from "@/components/StorageManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResearch } from "@/hooks/use-research";
import { DISCIPLINES } from "@/lib/data";

export const Route = createFileRoute("/")({
	component: ResearchPage,
});

function ResearchPage() {
	const { researched, toggle, replaceAll } = useResearch();

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-4xl mx-auto px-4 py-8">
				<div className="flex items-start justify-between mb-1">
					<h1 className="text-2xl font-bold flex items-center gap-2">
						<RiPencilRuler2Line className="size-7 shrink-0" />
						ESO Crafting Researcher
					</h1>
					<StorageManager onImport={replaceAll} />
				</div>
				<p className="text-sm text-muted-foreground">
					Track your trait research progress across all crafting disciplines.
				</p>
				<p className="text-sm text-muted-foreground mb-6">
					The app saves your research progress locally in your browser, no account required.
				</p>
				<Tabs defaultValue={DISCIPLINES[0].id}>
					<TabsList className="mb-2">
						{DISCIPLINES.map((discipline) => (
							<TabsTrigger key={discipline.id} value={discipline.id}>
								{discipline.name}
							</TabsTrigger>
						))}
					</TabsList>
					{DISCIPLINES.map((discipline) => (
						<TabsContent key={discipline.id} value={discipline.id}>
							<DisciplineTab
								discipline={discipline}
								researched={researched}
								onToggle={(itemId, traitId) =>
									toggle(discipline.id, itemId, traitId)
								}
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
