"use client"
import EditTable from "@/components/EditTable";
import AddForm from "@/components/ui/AddForm";
import { Btn, SubmitButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header2 } from "@/components/ui/Text";
import { useApi, usePostApi } from "@/hook/useApi";
import { Classification } from "@/lib/classification";
import { Materials } from "@/lib/materials";
import { TypeEntity } from "@/lib/types/typeEntity.type";
import { useState } from "react";
import { v4 } from "uuid";

const ClassificationPage = () => {

    const [newClass, setNewClass] = useState("");
    const [loading, setLoading] = useState(false);
    const { postData: addNewClassification } = usePostApi(Classification.add);


    const { status: c_status, data: types } = useApi(Classification.getAll);
    

    const handleNewClass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewClass(e.target.value)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 防止頁面重新整理
        if (!newClass.trim()) return alert("請輸入分類名稱");
        setLoading(true);

        addNewClassification(
            [newClass, true],
            (data) => {
                console.log("新增成功");
                alert("success");
                types?.push(data as TypeEntity);
            },
            (err) => {
                console.error(err);
                alert("err");
                setNewClass(""); // 清空輸入框
            },
            () => {
                setLoading(false);
                setNewClass(""); // 清空輸入框
            }
        );
    };

    return <>
        <div className="py-5">
            <Header2>
                商品類別管理
            </Header2>
            <hr className="mt-5 " />
            <AddForm 
                label="類別名稱"
                newVal={newClass} 
                handleNewVal={handleNewClass} 
                handleSubmit={handleSubmit} />
            <br />
            {
                types &&

                <EditTable<TypeEntity>

                    headers={[
                        {
                            title: "#",
                            key: "sortOrder",
                            type: "number",
                            className: "w-[10px]"
                        },
                        {
                            title: "啟用",
                            key: "enable",
                            type: "boolean",
                            className: "w-[15px]"
                        },
                        {
                            title: "類別名稱",
                            key: "name",
                            type: "text"
                        },
                        {
                            title: "必要原料",
                            key: "typeMaterials",
                            type: "groups",
                        }
                    ]}

                    data={types}

                />
            }
        </div>
    </>
}

export default ClassificationPage;