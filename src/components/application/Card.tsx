import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Ellipsis, FileEdit, Trash2Icon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Card({
  comments,
  status,
  title,
  description,
  files,
  id,
  onDragEnter,
  onDragLeave,
}: TaskCardProp) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = !transform
    ? undefined
    : {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 10,
      };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      draggable
      onDragEnter={onDragEnter ? onDragEnter : undefined}
      onDragLeave={onDragLeave ? onDragLeave : undefined}
      className={cn("cursor-grab w-full p-5 rounded-xl bg-customeBg", {
        "border border-textDark shadow-md": isDragging,
      })}
      style={style}
    >
      <div className="w-full flex items-center justify-between">
        <span
          className={cn(
            "h-6 capitalize px-2 flex-center rounded-md text-white text-sm",
            {
              "bg-customeYellow": status == "low",
              "bg-green-500": status == "high",
              "bg-blue-500": status == "medium",
            }
          )}
        >
          {status}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ring-0 focus:ring-0">
            <button>
              <Ellipsis className="w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-customeBg">
            <DropdownMenuItem
              asChild
              className="focus:bg-customeViolet/20 gap-2"
            >
              <div className="flex gap-2 items-center">
                <FileEdit className="w-4 text-blue-500" />
                <span className="text-sm">Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="focus:bg-customeViolet/20 gap-2"
            >
              <div className="flex gap-2 items-center">
                <Trash2Icon className="w-4 text-red-500" />
                <span className="text-sm">Edit</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full mt-1">
        <div className="w-full">
          <h4 className="font-semibold text-lg text-textBl">{title}</h4>
          <p className="text-sm text-textDark font-thin">{description}</p>
        </div>
      </div>
      <div className="mt-6 w-full flex justify-between">
        <div className="size-8 rounded-full bg-customeYellow"></div>
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-1 text-textDark text-sm">
            <Image src={"/icons/message.svg"} alt="" width={24} height={24} />
            <span>{comments} Comments</span>
          </div>
          <div className="flex items-center gap-1 text-textDark text-sm">
            <Image src={"/icons/folder.svg"} alt="" width={24} height={24} />
            <span>{files} files</span>
          </div>
        </div>
      </div>
    </div>
  );
}
