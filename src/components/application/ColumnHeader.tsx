import { Ellipsis, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ColumnAddModal from "./col-addmodal";

export default function ColumnHeader({
  title,
  _id,
  onDelete,
  setColumn,
}: ColumnHeaderProp & {
  setColumn: React.Dispatch<React.SetStateAction<Column[]>>;
}) {
  return (
    <div className="w-full h-16 rounded-md bg-customeBg flex items-center pl-6 pr-2 justify-between">
      <div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <div className="flex gap-2 items-center">
        <div className="h-7 px-4 rounded-xl bg-customeDark flex-center">
          <span className="text-sm text-white">1</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ring-0 focus:ring-0">
            <button>
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-customeBg">
            <DropdownMenuItem
              asChild
              className="focus:bg-customeViolet/20 gap-2"
            >
              
              <ColumnAddModal
                setColumns={setColumn}
                data={{ title, _id }}
                type="edit"
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onPointerDown={onDelete && onDelete}
              asChild
              className="focus:bg-customeViolet/20 gap-2"
            >
              <div className="flex gap-2 items-center">
                <Trash2Icon className="w-4 text-red-500" />
                <span className="text-sm">Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
