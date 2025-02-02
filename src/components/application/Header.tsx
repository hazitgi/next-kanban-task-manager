"use client";
import { Bell, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ColumnAddModal from "./col-addmodal";
import React, { SetStateAction } from "react";

const flagImage = {
  en: "/icons/en.svg",
  de: "/icons/gn.svg",
};
export default function Header({
  setColumns,
}: {
  setColumns: React.Dispatch<SetStateAction<Column[]>>;
}) {
  const router = useRouter();
  const t = useTranslations("root");
  const pathname = usePathname();
  const locale = useLocale();
  function changeLanguage(newLocale: "en" | "de"): void {
    // langRouter.push(langRouter.pathname, langRouter.asPath, { locale });
    const newPath = `/${newLocale}${pathname.replace(`/${locale}`, "")}`;
    router.push(newPath);
  }
  const searchParams = useSearchParams();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = new URLSearchParams(searchParams.toString()); // Clone existing search params
    const searchValue = event.target.value.trim();

    if (searchValue) {
      param.set("search", searchValue); // Set search query
    } else {
      param.delete("search"); // Remove search if empty
    }

    router.replace(`${pathname}?${param.toString()}`); // Update URL without reload
  };

  const handleDateFilter = (
    value: "alltime" | "today" | "lastmonth" | "lastweek"
  ) => {
    const param = new URLSearchParams(searchParams.toString());
    const filterValue = value.trim();
    if (filterValue) {
      param.set("date", filterValue); // Set date filter
    } else {
      param.delete("date"); // Remove date filter if empty
    }
    router.replace(`${pathname}?${param.toString()}`); // Update URL without reload
  };
  return (
    <header className="h-full w-full p-7">
      <div className="w-full flex justify-between lg:items-center lg:flex-row flex-col items-start gap-2 lg:gap-0">
        <div className="flex flex-col">
          <h3 className="text-lg">{t("activelads")}</h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <div className="size-8 border rounded-full overflow-hidden bg-customeYellow"></div>
              <div className="size-8 border rounded-full overflow-hidden -ml-2 bg-customeViolet"></div>
            </div>

            <ColumnAddModal type="add" data={null} setColumns={setColumns} />
          </div>
        </div>

        {/* second part */}
        <div className="flex gap-4 flex-wrap">
          <div className="h-12 pr-3 pl-5 rounded-xl border-textDark w-56 border bg-customeBg flex overflow-hidden items-center">
            <input
              type="text"
              onChange={handleSearch}
              className="w-full h-full text-sm bg-transparent placeholder:text-textDark outline-none"
              placeholder={`${t("search")}...`}
            />
            <button>
              <Search className="w-4 text-textYello" />
            </button>
          </div>
          <Select onValueChange={handleDateFilter}>
            <SelectTrigger className="h-12 pr-3 pl-5 rounded-xl border-textDark w-[120px] ring-0 focus:ring-0  border bg-customeBg flex overflow-hidden items-center">
              <SelectValue
                className="capitalize"
                placeholder={
                  searchParams.get("date")
                    ? searchParams.get("date")
                    : "All Time"
                }
              />
            </SelectTrigger>
            <SelectContent className="bg-customeBg rounded-xl">
              <SelectItem
                value="alltime"
                className="px-3 py-2 focus:bg-customeViolet/20 gap-2"
              >
                All Time
              </SelectItem>
              <SelectItem
                value="today"
                className="px-3 py-2 focus:bg-customeViolet/20 gap-2"
              >
                Today
              </SelectItem>
              <SelectItem
                value="lastweek"
                className="px-3 py-2 focus:bg-customeViolet/20 gap-2"
              >
                Last week
              </SelectItem>
              <SelectItem
                value="lastmonth"
                className="px-3 py-2 focus:bg-customeViolet/20 gap-2"
              >
                Last Month
              </SelectItem>
            </SelectContent>
          </Select>
          <button className="h-12 px-3 rounded-xl border-textDark  ring-0 focus:ring-0  border bg-customeBg flex overflow-hidden items-center justify-center">
            <div className="relative">
              <div className="absolute top-0 right-0 size-2 bg-customeYellow rounded-full" />
              <Bell className="w-5 text-textDark" />
            </div>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="h-12 px-3 rounded-xl border-textDark  ring-0 focus:ring-0  border bg-customeBg flex overflow-hidden items-center justify-center">
              <div className="relative">
                <div className="overflow-hidden size-7  rounded-full">
                  <Image
                    alt=""
                    src={flagImage[locale as "en" | "de"]}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-customeBg">
              <DropdownMenuItem
                className="focus:bg-customeViolet/20 py-2 "
                onClick={() => changeLanguage("en")}
              >
                <div className="flex items-center gap-2 ">
                  <div>
                    <Image
                      alt=""
                      src={flagImage["en"]}
                      width={18}
                      height={18}
                    />
                  </div>
                  <span>English</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-customeViolet/20 py-2"
                onClick={() => changeLanguage("de")}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      alt=""
                      src={flagImage["de"]}
                      width={18}
                      height={18}
                    />
                  </div>
                  <span>Germany</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="size-12 rounded-full bg-customeDark"></button>
        </div>
      </div>
    </header>
  );
}
