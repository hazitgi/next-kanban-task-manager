"use client";
import { Bell, Plus, Search } from "lucide-react";
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

const flagImage = {
  en: "/icons/en.svg",
  gn: "/icons/gn.svg",
};
export default function Header() {
  return (
    <header className="h-full w-full p-7">
      <div className="w-full flex justify-between lg:items-center lg:flex-row flex-col items-start gap-2 lg:gap-0">
        <div className="flex flex-col">
          <h3 className="text-lg">Active lads</h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <div className="size-8 border rounded-full overflow-hidden bg-customeYellow"></div>
              <div className="size-8 border rounded-full overflow-hidden -ml-2 bg-customeViolet"></div>
            </div>
            <button className="flex gap-1 items-center">
              <div className="size-5 rounded-md  border flex-center bg-customeViolet">
                <Plus className="w-3 text-textDark" />
              </div>
              <div className="underline text-sm text-textDark">
                <span>Add More</span>
              </div>
            </button>
          </div>
        </div>

        {/* second part */}
        <div className="flex gap-4 flex-wrap">
          <div className="h-12 pr-3 pl-5 rounded-xl border-textDark w-56 border bg-customeBg flex overflow-hidden items-center">
            <input
              type="text"
              className="w-full h-full text-sm bg-transparent placeholder:text-textDark outline-none"
              placeholder="Search..."
            />
            <button>
              <Search className="w-4 text-textYello" />
            </button>
          </div>
          <Select>
            <SelectTrigger className="h-12 pr-3 pl-5 rounded-xl border-textDark w-[120px] ring-0 focus:ring-0  border bg-customeBg flex overflow-hidden items-center">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent className="bg-customeBg rounded-xl">
              <SelectItem value="light" className="p-3">
                Light
              </SelectItem>
              <SelectItem value="dark" className="p-3">
                Dark
              </SelectItem>
              <SelectItem value="system" className="p-3">
                System
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
                  <Image alt="" src={flagImage["en"]} width={30} height={30} />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-customeBg">
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
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
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      alt=""
                      src={flagImage["gn"]}
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
