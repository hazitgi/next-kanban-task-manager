import { Ellipsis } from "lucide-react";

export default function ColumnHeader({ title }: ColumnHeaderProp) {
  return (
    <div className="w-full h-16 rounded-md bg-customeBg flex items-center pl-6 pr-2 justify-between">
      <div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <div className="flex gap-2 items-center">
        <div className="h-7 px-4 rounded-xl bg-customeDark flex-center">
          <span className="text-sm text-white">1</span>
        </div>
        <button>
          <Ellipsis />
        </button>
      </div>
    </div>
  );
}
