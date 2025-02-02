/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/responsive-modal";
import { FileEdit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/form-schema/task.schema";

import toast from "react-hot-toast";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import LoaderButton from "./LoaderButton";
import { updateTask } from "@/app/actions/task.actions";
import { z } from "zod";

export default function UpdateTaskModal({
  setTasks,
  data,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  data: Task;
}) {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    // defaultValues: {
    //   columnId: String(col._id)!,
    // },
  });

  console.log(errors, " ERrros");

  const handleTaskAdd = async (values: TaskSchema) => {
    try {
      setLoading(true);
      const { message, status } = await updateTask(
        String(data?._id),
        values as Task
      );
      if (!status) {
        toast.error(message);
      } else {
        setTasks(
          (prev) =>
            prev.map((task) =>
              task._id === data?._id ? { _id: data._id, ...values } : task
            ) as Task[]
        );
        toast.success("Task updated successfully");
        setIsopen(false);
      }
    } catch (error: any) {
      return toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("status", data.status);
      setValue("columnId", String(data.columnId));
    }
  }, [data]);
  return (
    <Credenza onOpenChange={setIsopen} open={isOpen}>
      <CredenzaTrigger asChild className="z-20" >
        <button
          onClick={(e) => {
            e.stopPropagation();
            // setIsopen(true);
          }}
          className="flex gap-2 z-30 items-center px-2 py-1 hover:bg-customeViolet/20 focus:bg-customeViolet/20 rounded-md w-full"
        >
          <FileEdit className="w-4 text-blue-500" />
          <span className="text-sm">Edit</span>
        </button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaTitle className="hidden">a</CredenzaTitle>
        <CredenzaBody>
          <div className="w-full">
            <h2 className="text-lg font-semibold">Update Task</h2>
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
  );
}
