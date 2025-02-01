/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Header from "@/components/application/Header";

import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "@/components/application/Column";
function Home() {
  const COLUMNS: Column[] = [
    {
      id: "titl1",
      title: "Todo",
    },
    {
      id: "titl2",
      title: "In Progress",
    },
    {
      id: "titl3",
      title: "Completed",
    },
    {
      id: "titl4",
      title: "Archived",
    },
  ];

  const TASKS: Task[] = [
    {
      id: "task1",
      title: "Task 1",
      description:
        "Task description but it is only displaying a maximum of 150 letters...",
      status: "low",
      comments: 12,
      files: 0,
      columnId: "titl1",
    },
    {
      id: "task2",
      title: "Task 2",
      description:
        "Task description but it is only displaying a maximum of 150 letters...",
      status: "medium",
      comments: 3,
      files: 2,
      columnId: "titl2",
    },
    {
      id: "task3",
      title: "Task 3",
      description:
        "Task description but it is only displaying a maximum of 150 letters...",
      status: "high",
      comments: 0,
      files: 0,
      columnId: "titl3",
    },
    {
      id: "task4",
      title: "Task 4",
      description:
        "Task description but it is only displaying a maximum of 150 letters...",
      status: "low",
      comments: 0,
      files: 0,
      columnId: "titl4",
    },
    {
      id: "task5",
      title: "Task 5",
      description:
        "Task description but it is only displaying a maximum of 150 letters...",
      status: "medium",
      comments: 0,
      files: 0,
      columnId: "titl4",
    },
    {
      id: "task6",
      title: "Task 6",
      description:
        "Task description but it is only displaying a maximum of 150 letters...",
      status: "high",
      comments: 0,
      files: 0,
      columnId: "titl4",
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [columns, setColumns] = useState<Column[]>(COLUMNS);
  setColumns;
  setTasks;
  tasks;

  function handleDrageEnd(event: DragEndEvent) {
    const { active, over } = event;
    // alert(`tasks: ${over}`);
    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    setTasks(() =>
      tasks.map((task) =>
        task.id == taskId
          ? {
              ...task,
              columnId: newColumnId,
            }
          : task
      )
    );
  }

  return (
    <main className="bg-customeBg/30 min-h-screen">
      <section className="w-full  ">
        <Header />
        <section className="w-full overflow-x-auto h-screen flex flex-nowrap space-x-4 px-6 scrollbar-hide scrollbar-none ">
          {/* Kanban boxes container */}
          <DndContext onDragEnd={handleDrageEnd}>
            {columns?.map((col) => (
              <Column
                key={col.id}
                col={col}
                tasks={tasks.filter((task) => task.columnId == col.id)}
              />
            ))}
          </DndContext>
        </section>
      </section>
    </main>
  );
}
export default Home;
