"use client"
import { useApi } from "@/hook/useApi"
import { Classification } from "@/lib/classification"
import { v4 } from "uuid"
import ClassificationBlock from "./classificationBlock"
import { useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import ContainerMobile from "./container"
import clsx from "clsx"
import { Header1, Header2, Paragraph } from "@/components/ui/Text"
import Image from "next/image"
import FillImage, { EObjectFit } from "@/components/ui/FillImage"
import { Event } from "@/components/ui/Chip"
import { AiFillNotification } from "react-icons/ai";
import { AiFillTags } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import LoginBlock from "./login"

const OrderHeader = () => {
    const { data } = useApi(Classification.getList)
    const [showList, setShowList] = useState(false)

    const toggleList = () => setShowList(!showList)

    return (
        <>
            <div className="bg-[#f6fafe]">
                <FillImage src="/demo.webp" objectFit={EObjectFit.Cover} className="w-full h-[30vh]" />
                <LoginBlock />
                <ContainerMobile className="pt-5">
                    <Header1>中科大大店神</Header1>
                    <br />
                    <Header2>提醒事項</Header2>
                    <br />
                    <Paragraph>
                        供餐時間：每天 5:30 ~ 13:00
                    </Paragraph>
                    <Paragraph>
                        (週二公休，有例外另行公告。)
                    </Paragraph>
                    <div className="my-5">
                        <hr className="my-5 text-gray-300" />

                        <div className="relative flex flex-wrap items-center gap-2">
                            <Event value="優惠活動" color="pink" icon={
                                <AiFillTags size={20}></AiFillTags>
                            } />
                            <Event value="今日特餐" color="indigo" icon={
                                <AiFillNotification size={20}></AiFillNotification>
                            } />
                            <button className="absolute right-2">
                                <AiFillCaretRight  size={28} />
                            </button>
                        </div>
                        <hr className="my-5 text-gray-300" />

                    </div>
                    <Header2>菜單</Header2>
                </ContainerMobile>
                
            </div>
            <div className={clsx(
                "w-full bg-[#f6fafe] top-0 left-0 shadow-md z-40",
                showList ? "fixed" : "sticky"
            )}>
                <ContainerMobile className="flex">
                    {/* 分類清單區塊 */}
                    <div
                        className={clsx(
                            "w-full px-4 scroll-smooth pb-2 flex items-center gap-4 justify-start",
                            showList ? "flex-wrap overflow-y-auto pt-3.5 "  // 展開模式：換行顯示、可上下滾動
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
                    {/* 收合按鈕區塊 */}
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
        </>
    )
}

export default OrderHeader
