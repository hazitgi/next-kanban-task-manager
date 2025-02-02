/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Header from "@/components/application/Header";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "@/components/application/Column";
import { getColumns } from "../actions/column.action";
import { getAllTasks } from "../actions/task.actions";
import toast from "react-hot-toast";
function Home() {
  // const COLUMNS: Column[] = [
  //   {
  //     id: "titl1",
  //     title: "Todo",
  //   },
  //   {
  //     id: "titl2",
  //     title: "In Progress",
  //   },
  //   {
  //     id: "titl3",
  //     title: "Completed",
  //   },
  //   {
  //     id: "titl4",
  //     title: "Archived",
  //   },
  // ];

  // const TASKS: Task[] = [
  //   {
  //     id: "task1",
  //     title: "Task 1",
  //     description:
  //       "Task description but it is only displaying a maximum of 150 letters...",
  //     status: "low",
  //     comments: 12,
  //     files: 0,
  //     columnId: "titl1",
  //   },
  //   {
  //     id: "task2",
  //     title: "Task 2",
  //     description:
  //       "Task description but it is only displaying a maximum of 150 letters...",
  //     status: "medium",
  //     comments: 3,
  //     files: 2,
  //     columnId: "titl2",
  //   },
  //   {
  //     id: "task3",
  //     title: "Task 3",
  //     description:
  //       "Task description but it is only displaying a maximum of 150 letters...",
  //     status: "high",
  //     comments: 0,
  //     files: 0,
  //     columnId: "titl3",
  //   },
  //   {
  //     id: "task4",
  //     title: "Task 4",
  //     description:
  //       "Task description but it is only displaying a maximum of 150 letters...",
  //     status: "low",
  //     comments: 0,
  //     files: 0,
  //     columnId: "titl4",
  //   },
  //   {
  //     id: "task5",
  //     title: "Task 5",
  //     description:
  //       "Task description but it is only displaying a maximum of 150 letters...",
  //     status: "medium",
  //     comments: 0,
  //     files: 0,
  //     columnId: "titl4",
  //   },
  //   {
  //     id: "task6",
  //     title: "Task 6",
  //     description:
  //       "Task description but it is only displaying a maximum of 150 letters...",
  //     status: "high",
  //     comments: 0,
  //     files: 0,
  //     columnId: "titl4",
  //   },
  // ];

  // const transformedData: TasksAndColumns = COLUMNS.map((column) => ({
  //   column: {
  //     title: column.title,
  //     _id: column.id, // Simulating MongoDB ObjectId
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   },
  //   tasks: TASKS.filter((task) => task.columnId === column.id).map((task) => ({
  //     _id: task.id, // Simulating MongoDB ObjectId
  //     title: task.title,
  //     description: task.description,
  //     status: task.status,
  //     dueDate: new Date().toISOString(), // Simulating a due date
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   })),
  // }));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    async function fetchColumns() {
      const { status, data, message } = await getColumns();
      if (status) {
        setColumns(data as Column[]);
      } else {
        toast.error(message);
      }
    }
    async function fetchTasks() {
      const { status, data, message } = await getAllTasks();
      if (status) {
        setTasks(data as Task[]);
      } else {
        toast.error(message);
      }
    }
    fetchColumns();
    fetchTasks();
  }, []);
  function handleDrageEnd(event: DragEndEvent) {
    const { active, over } = event;
    // alert(`tasks: ${over}`);
    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    setTasks(() =>
      tasks.map((task) =>
        task._id == taskId
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
      <div className="w-full  ">
        <Header setColumns={setColumns} />
        <section className="w-full overflow-x-auto h-screen flex flex-nowrap space-x-4 px-6 scrollbar-hide scrollbar-none ">
          <DndContext onDragEnd={handleDrageEnd}>
            {columns?.map((col) => (
              <Column
                setTasks={setTasks}
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
