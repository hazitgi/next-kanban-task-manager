import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export default function Card({
  comments,
  status,
  title,
  description,
  files,
  id,
}: Task) {
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
      className={cn("cursor-grab w-full p-5 rounded-xl bg-customeBg", {
        "border border-textDark shadow-md": isDragging,
      })}
      style={style}
    >
      <div className="w-full flex items-center justify-between">
        <div
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
        </div>
        <button>
          <Ellipsis className="w-5" />
        </button>
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
