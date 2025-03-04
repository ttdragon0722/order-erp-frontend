"use client";

import { AnimatePresence, motion } from "framer-motion";
import FillImage from "@/components/ui/FillImage";
import { useToolbar } from "../_context/ToolbarContext";
import ToolbarButton from "../_components/toolbarButton";
import Links from "../_components/links";
import { useState } from "react";

const widthAmount = 256;

export default function Toolbar() {
    const { isOpen } = useToolbar();

    const [panel, setPanel] = useState(false);

    return (
        <>
            <motion.div
                initial={{ width: widthAmount, opacity: 1 }} // 初始狀態
                animate={{ width: isOpen ? widthAmount : 0, opacity: isOpen ? 1 : 0 }} // 根據 isOpen 動畫
                transition={{ duration: 0.3, ease: "easeInOut" }} // 動畫效果
                className="relative text-white overflow-hidden"
            >
                <div className="flex justify-end items-center h-[5vh]">
                    <ToolbarButton action="toggle" icon="close" />
                </div>
                <div className="w-64">
                    {/* <div className="my-3">
                        <FillImage className="w-full aspect-[5/4] rounded-lg" src="/order-erp.jpg" alt="logo" />
                    </div> */}
                    <Links />
                </div>
            </motion.div>
            {
                !isOpen &&
                <div
                    onMouseEnter={() => setPanel(true)}
                    onMouseLeave={() => setPanel(false)}
                    className="w-48 h-full fixed top-0 left-0 z-30 pointer-events-auto bg-transparent">
                    {!isOpen && (
                        <motion.div
                            className="absolute z-50 top-0 left-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <ToolbarButton hoverColor="amber-200" icon="open" action="open" />
                        </motion.div>
                    )}
                    <AnimatePresence>
                        {panel && (
                            <motion.div
                                className="absolute top-0 left-0 w-64 h-full pt-[8vh]"
                                initial={{ x: -256, opacity: 0 }} // 從左邊進場
                                animate={{ x: 0, opacity: 1 }} // 滑入
                                exit={{ x: -256, opacity: 0 }} // 滑出到左邊
                                transition={{ type: "tween", duration: 0.3 }}
                            >
                                <div
                                    className="h-[90%] w-64 bg-[#121331]/95 backdrop-blur-md text-white rounded-r-3xl overflow-hidden shadow-lg py-5"
                                >
                                    <Links />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div >
            }
        </>
    );
}
