import { cn } from "@/lib/utils"; // <-- ИМПОРТИРУЕМ

// Временная утилита УДАЛЕНА

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
}