/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Header from "@/components/application/Header";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "@/components/application/Column";
import { getColumns } from "../actions/column.action";
import { getAllTasks, updateTask } from "../actions/task.actions";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    async function fetchColumns() {
      const { status, data, message } = await getColumns();
      if (status) {
        setColumns(data as unknown as Column[]);
      } else {
        toast.error(message);
      }
    }

    fetchColumns();
  }, []);

  const searchParams = useSearchParams();
  useEffect(() => {
    const searchKey = searchParams.get("search") || "";
    const date = searchParams.get("date");
    async function fetchTasks() {
      const { status, data, message } = await getAllTasks(
        searchKey,
        date as "alltime" | "today" | "lastmonth" | "lastweek"
      );
      if (status) {
        setTasks(data as unknown as Task[]);
      } else {
        toast.error(message);
      }
    }

    fetchTasks();
  }, [searchParams]);
  async function handleDrageEnd(event: DragEndEvent) {
    const { active, over } = event;
    // alert(`tasks: ${over}`);
    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    const prevTask = tasks;
    let payload: Task | null = null;
    setTasks(() =>
      tasks.map((task) => {
        if (task._id == taskId) {
          payload = {
            ...task,
            columnId: newColumnId,
          };
          return payload;
        } else {
          return task;
        }
      })
    );
    const { status, message } = await updateTask(
      taskId,
      payload as unknown as Task
    );
    if (!status) {
      toast.error(message);
      setTasks(prevTask); // Rollback the changes if the update fails.
    } else {
      toast.success("Task moved successfully.");
    }
  }

  return (
    <main className="bg-customeBg/30 min-h-screen">
      <div className="w-full  ">
        <Header setColumns={setColumns} />
        <section className="w-full overflow-x-auto h-screen flex flex-nowrap space-x-4 px-6 scrollbar-hide scrollbar-none ">
          <DndContext onDragEnd={handleDrageEnd}>
            {columns?.map((col) => (
              <Column
                setTasks={setTasks}
                setColumn={setColumns}
                key={col._id}
                col={col}
                tasks={tasks.filter((task) => task.columnId == col._id)}
              />
            ))}
          </DndContext>
        </section>
      </div>
    </main>
  );
}
export default Home;
