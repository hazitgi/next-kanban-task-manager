import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LoaderButton({
  children,
  className,
  isLoading,
  onClick,
  type = "submit",
}: LoaderButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "h-9 px-3 bg-violet-500 capitalize text-white text-sm rounded-lg",
        { "pointer-events-none bg-customeViolet": isLoading },
        className
      )}
    >
      {isLoading ? (
        <span className="flex gap-2 items-center">
          <LoaderCircle className="w-4 animate-spin" />
          <span className="text-xs">Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
