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
                <div className="w-full px-3">
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
                    className="w-32 h-full absolute top-0 left-0 pt-[8vh] z-10 ">
                    <AnimatePresence>
                        {panel && (
                            <motion.div
                                className="h-[90%] w-64 bg-[#121331] text-white rounded-r-3xl overflow-hidden shadow-lg"
                                initial={{ x: -256, opacity: 0 }} // 從左邊進場
                                animate={{ x: 0, opacity: 1 }} // 滑入
                                exit={{ x: -256, opacity: 0 }} // 滑出到左邊
                                transition={{ type: "tween", duration: 0.3 }}
                            >
                                <Links />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            }
        </>
    );
}
