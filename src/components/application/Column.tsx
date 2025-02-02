import { Plus } from "lucide-react";
import ColumnHeader from "./ColumnHeader";
import Card from "./Card";
import { useTranslations } from "next-intl";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import React from "react";

export default function Column({ col, tasks }: ColumnBodyProp) {
  const t = useTranslations("root");
  const { setNodeRef, isOver } = useDroppable({
    id: col.id,
  });
  const [dragIndex, setDragIndex] = React.useState<undefined | number>();
  return (
    <div
      ref={setNodeRef}
      key={col.id}
      className={cn("flex space-x-4 min-w-max ", {
        " border border-textDark border-dashed p-3 transition-all shadow-md duration-200 rounded-lg ":
          isOver,
      })}
    >
      {/* Example Kanban Boxes */}
      <div className={cn("w-[21rem] h-96  rounded-lg  ")}>
        <ColumnHeader {...col} />
        <div className="w-full flex-center h-9">
          <button className="flex gap-1 items-center">
            <span className="size-5 rounded-md  border flex-center bg-customeViolet">
              <Plus className="w-3 text-textDark" />
            </span>
            <span className="underline text-sm text-textDark">
              <span>{t("createtask")}</span>
            </span>
          </button>
        </div>
        <div className="space-y-4">
          {tasks?.length <= 0 && (
            <div className="w-full rounded-lg h-28 shadow-inner border-dashed border border-textDark bg-customeBg flex-center">
              <span>No Tasks</span>
            </div>
          )}
          {tasks.map((task, idx) => {
            return (
              <React.Fragment key={task.id}>
                {dragIndex == idx && <div className={cn("w-full h-28 ")}></div>}

                <Card
                  onDragEnter={() => setDragIndex(idx)}
                  onDragLeave={() => setDragIndex(undefined)}
                  {...task}
                  key={task.id}
                />
              </React.Fragment>
            );
          })}
          {isOver && <div className="w-full h-56 "></div>}
        </div>
      </div>
    </div>
  );
}
