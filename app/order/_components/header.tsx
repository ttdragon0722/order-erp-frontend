"use client"
import { useApi } from "@/hook/useApi"
import { Classification } from "@/lib/classification"
import { v4 } from "uuid"
import ClassificationBlock from "./classificationBlock"
import { useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import ContainerMobile from "./container"
import clsx from "clsx"

const OrderHeader = () => {
    const { data } = useApi(Classification.getList)
    const [showList, setShowList] = useState(false)

    const toggleList = () => setShowList(!showList)

    return (
        <div className={clsx(
            "w-full bg-[#f6fafe] top-0 left-0 shadow-md",
            showList ? "fixed" : "sticky"
        )}>
            <ContainerMobile className="flex">
                {/* 分類清單區塊 */}
                <div
                    className={clsx(
                        "w-full px-4 scroll-smooth pb-2 flex items-center gap-4 justify-start",
                        showList? "flex-wrap overflow-y-auto pt-3.5 "  // 展開模式：換行顯示、可上下滾動
                            : "flex-nowrap overflow-x-auto whitespace-nowrap" // 收合模式：橫向滑動
                        )}
                style={{ maxHeight: showList ? "50vh" : "7vh", transition: "max-height 0.3s ease" }}
                >
                {data &&
                    data.map((v) => (
                        <ClassificationBlock
                            key={v4()}
                            id={v.id}
                            name={v.name}
                            hasStock={v.hasStock}
                        />
                    ))}
        </div>
                {/* 收合按鈕區塊 */ }
    <div className=" h-[7vh] flex items-center justify-end">
        <button
            onClick={toggleList}
            className="h-full px-2 flex items-center justify-center rounded"
        >
            {showList ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
        </button>
    </div>
            </ContainerMobile >
        </div >
    )
}

export default OrderHeader
