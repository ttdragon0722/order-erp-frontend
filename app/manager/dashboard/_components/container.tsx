"use client"
import clsx from "clsx";
import { useToolbar } from "../_context/ToolbarContext";
import { FC, ReactNode } from "react";
import Header from "./header";

interface ContainerProp {
    children: ReactNode
}

const Container: FC<ContainerProp> = ({ children }) => {
    const { isOpen } = useToolbar();

    return <div className={
        clsx("flex-1 w-full bg-white overflow-x-hidden overflow-y-auto", isOpen ? "rounded-l-2xl" : "")
    }>
        <Header />
        <div className="container px-6 py-2 mx-auto max-w-[1080px]">
            {children}
        </div>
    </div>
}

export default Container;