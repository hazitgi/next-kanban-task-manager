/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import ColumnHeader from "./ColumnHeader";
import Card from "./Card";
import { useTranslations } from "next-intl";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/responsive-modal";
import { Input } from "../ui/input";
import LoaderButton from "./LoaderButton";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { taskSchema } from "@/lib/form-schema/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createTask, deleteTask } from "@/app/actions/task.actions";
import { ITask } from "@/lib/schema/task.schema";
import { deleteColumn } from "@/app/actions/column.action";

export default function Column({
  col,
  tasks,
  setTasks,
  setColumn,
}: ColumnBodyProp & {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setColumn: React.Dispatch<React.SetStateAction<Column[]>>;
}) {
  const t = useTranslations("root");
  const { setNodeRef, isOver } = useDroppable({
    id: col._id!,
  });
  const [dragIndex, setDragIndex] = React.useState<undefined | number>();
  const [isOpen, setIsopen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  type TaskSchema = z.infer<typeof taskSchema>;
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      columnId: String(col._id)!,
    },
  });

  console.log(errors, " ERrros");

  const handleTaskAdd = async (values: TaskSchema) => {
    console.log("🚀 ~ handleTaskAdd ~ values:", values);
    try {
      setLoading(true);
      const { message, status, task } = await createTask(
        values as unknown as ITask
      );
      if (!status) {
        toast.error(message);
      } else {
        setTasks((prev) => [...prev, task] as Task[]);
        toast.success("Task created successfully");
        setIsopen(false);
      }
    } catch (error: any) {
      return toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskDeletion = async (taskId: string) => {
    try {
      const { status, message } = await deleteTask(taskId);
      if (!status) {
        toast.error(message);
      } else {
        setTasks((prev) => prev.filter((t) => t._id !== taskId) as Task[]);
        toast.success("Task deleted successfully");
      }
    } catch (error: any) {
      return toast.error(`${error.message}`);
    }
  };

  const handleColumnDelete = async (colId: string) => {
    try {
      const { message, status } = await deleteColumn(colId);
      if (!status) {
        return toast.error(message);
      } else {
        setColumn((prev) => prev.filter((column) => column._id !== colId));
        toast.success("Column deleted successfully");
        // Redirect to the home page or any other page
        // history.push("/");
      }
    } catch (error: any) {
      return toast.error(`${error.message}`);
    }
  };
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
        <ColumnHeader
          {...col}
          onDelete={() => handleColumnDelete(col._id as string)}
          setColumn={setColumn}
          taskLength={tasks.length}
        />
        <div className="w-full flex-center h-9">
          <Credenza onOpenChange={setIsopen} open={isOpen}>
            <CredenzaTrigger asChild>
              <button className="flex gap-1 items-center">
                <span className="size-5 rounded-md  border flex-center bg-customeViolet">
                  <Plus className="w-3 text-textDark" />
                </span>
                <span className="underline text-sm text-textDark">
                  <span>{t("createtask")}</span>
                </span>
              </button>
            </CredenzaTrigger>
            <CredenzaContent>
              <CredenzaTitle className="hidden">a</CredenzaTitle>
              <CredenzaBody>
                <div className="w-full">
                  <h2 className="text-lg font-semibold">Add Task</h2>
                  <form
                    onSubmit={handleSubmit(handleTaskAdd)}
                    className="w-full mt-2 space-y-2"
                  >
                    <div className="flex flex-col gap-1">
                      <label htmlFor="" className="text-sm">
                        Task title
                      </label>
                      <Input
                        {...register("title")}
                        type="text"
                        placeholder="Enter column title"
                        className="shadow-sm border-black/15 text-black bg-slate-100"
                      />
                      {errors && errors.title && (
                        <>
                          <span className="text-sm text-red-400 mt-1">
                            {errors.title.message}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="" className="text-sm">
                        Task description
                      </label>
                      <Textarea
                        className="shadow-sm border-black/15 text-black bg-slate-100"
                        placeholder="Enter description"
                        {...register("description")}
                      />
                      {errors && errors.description && (
                        <>
                          <span className="text-sm text-red-400 mt-1">
                            {errors.description.message}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="" className="text-sm">
                        Select Priority
                      </label>

                      <Select
                        onValueChange={(v: "low" | "medium" | "high") => {
                          setValue("status", v);
                          trigger("status");
                        }}
                      >
                        <SelectTrigger className="w-full shadow-sm border-black/15 text-black bg-slate-100">
                          <SelectValue
                            placeholder={
                              watch("status") ? watch("status") : "priority"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>

                      {errors && errors.status && (
                        <>
                          <span className="text-sm text-red-400 mt-1">
                            {errors.status.message}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <LoaderButton isLoading={loading}>Submit</LoaderButton>
                    </div>
                  </form>
                </div>
              </CredenzaBody>
            </CredenzaContent>
          </Credenza>
        </div>
        <div className="space-y-4">
          {tasks?.length <= 0 && (
            <div className="w-full rounded-lg h-28 shadow-inner border-dashed border border-textDark bg-customeBg flex-center">
              <span>No Tasks</span>
            </div>
          )}
          {tasks.map((task, idx) => {
            return (
              <React.Fragment key={String(task._id)}>
                {dragIndex == idx && <div className={cn("w-full h-28 ")}></div>}

                <Card
                  onDragEnter={() => setDragIndex(idx)}
                  onDragLeave={() => setDragIndex(undefined)}
                  onDeleteTask={() => handleTaskDeletion(task?._id as string)}
                  setTasks={setTasks}
                  {...task}
                  key={task._id}
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
