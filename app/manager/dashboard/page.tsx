"use client"
import clsx from "clsx";
import { motion } from "framer-motion";
import { useToolbar } from "./_context/ToolbarContext";
import ToolbarButton from "./_components/toolbarButton";

export default function Dashboard() {
  const { isOpen } = useToolbar();
  return (
    <div className={
      clsx("flex-1 w-full bg-white overflow-hidden", isOpen ? "rounded-l-2xl" : "")
    }>
      <div className="w-full h-[5vh] bg-[#f6fafe] px-6 flex justify-start items-center z-20 relative">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}  
            exit={{ opacity: 0, scale: 0.8 }}   
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ToolbarButton hoverColor="amber-200"  icon="open" action="open" />
          </motion.div>
        )}

      </div>
      <div className="container px-6 mx-auto max-w-[1080px]">
        manager
      </div>
    </div>
  );
}
