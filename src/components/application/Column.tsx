import { Plus } from "lucide-react";
import ColumnHeader from "./ColumnHeader";
import Card from "./Card";
import { useTranslations } from "next-intl";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export default function Column({ col, tasks }: ColumnBodyProp) {
  const t = useTranslations("root");
  const { setNodeRef, isOver } = useDroppable({
    id: col.id,
  });
  return (
    <div key={col.id} className="flex space-x-4 min-w-max">
      {/* Example Kanban Boxes */}
      <div
        className={cn("w-[21rem] h-96  rounded-lg  ", {
          " border border-textDark border-dashed p-2 transition-all shadow-md duration-200":
            isOver,
        })}
      >
        <ColumnHeader {...col} />
        <div className="w-full flex-center h-9">
          <button className="flex gap-1 items-center">
            <div className="size-5 rounded-md  border flex-center bg-customeViolet">
              <Plus className="w-3 text-textDark" />
            </div>
            <div className="underline text-sm text-textDark">
              <span>{t("createtask")}</span>
            </div>
          </button>
        </div>
        <div ref={setNodeRef} className="space-y-4">
          {tasks?.length <= 0 && (
            <div className="w-full rounded-lg h-28 shadow-inner border-dashed border border-textDark bg-customeBg flex-center">
              <span>No Tasks</span>
            </div>
          )}
          {tasks
            .filter((task) => task.columnId == col.id)
            .map((task) => {
              return <Card {...task} key={task.id} />;
            })}
        </div>
      </div>
    </div>
  );
}
