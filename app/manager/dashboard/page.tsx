"use client"
import clsx from "clsx";
import { motion } from "framer-motion";
import { useToolbar } from "./_context/ToolbarContext";
import ToolbarButton from "./_components/toolbarButton";
import { Header1, Header2 } from "@/components/ui/text";

export default function Dashboard() {
  const { isOpen } = useToolbar();
  return (
    <div className={
      clsx("flex-1 w-full bg-white overflow-x-hidden overflow-y-auto", isOpen ? "rounded-l-2xl" : "")
    }>
      {/* header */}
      <div className="w-full sticky top-0 left-0 h-[5vh] bg-[#f6fafe] px-6 flex justify-start items-center">
        
      </div>

      {/* content */}
      <div className="container px-6 py-2 mx-auto max-w-[1080px]">
        <Header1>Welcome to ERP Dashboard!</Header1>
        <hr className="my-2" />
        <Header2>hello world!</Header2>
        {
          Array.from({ length: 100 }).map((_, index) => {
            return <div key={index}>haha</div>;
          })
        }
      </div>
    </div>
  );
}
