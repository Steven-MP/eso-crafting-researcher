import { cn } from "@/lib/utils";

interface ProgressBadgeProps {
	count: number;
	total: number;
	className?: string;
}

export function ProgressBadge({ count, total, className }: ProgressBadgeProps) {
	const complete = count === total;
	return (
		<span
			className={cn(
				"text-xs tabular-nums",
				complete
					? "text-green-600 dark:text-green-400 font-medium"
					: "text-muted-foreground",
				className,
			)}
		>
			{count}/{total}
		</span>
	);
}
