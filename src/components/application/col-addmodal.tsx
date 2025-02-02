/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/responsive-modal";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { colForm } from "@/lib/form-schema/col-form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoaderButton from "./LoaderButton";

import toast from "react-hot-toast";
import { useState } from "react";
import { createColumn } from "@/app/actions/column.action";
export default function ColumnAddModal({
  setColumns,
}: {
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}) {
  const t = useTranslations("root");
  type ColumnForm = z.infer<typeof colForm>;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ColumnForm>({
    resolver: zodResolver(colForm),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const handleColumnAdd = async (values: ColumnForm) => {
    try {
      setLoading(true);
      console.log(values);
      const response = await createColumn(values.title);

      console.log(response);
      if (response.status) {
        toast.success("Column added successfully");
        setColumns((prev) => [...prev, response.data] as Column[]);
        setIsopen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [isOpen, setIsopen] = useState<boolean>(false);
  return (
    <Credenza onOpenChange={setIsopen} open={isOpen}>
      <CredenzaTrigger asChild>
        <button className="flex gap-1 items-center">
          <div className="size-5 rounded-md  border flex-center bg-customeViolet">
            <Plus className="w-3 text-textDark" />
          </div>
          <div className="underline text-sm text-textDark">
            <span>{t("addmore")}</span>
          </div>
        </button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaTitle className="hidden">a</CredenzaTitle>
        <CredenzaBody>
          <div className="w-full">
            <h2 className="text-lg font-semibold">Add new Column</h2>
            <form
              onSubmit={handleSubmit(handleColumnAdd)}
              className="w-full mt-2"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  Column title
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
