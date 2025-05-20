"use client"
import { Header2 } from "@/components/ui/Text";
import { useApi, usePostApi } from "@/hook/useApi";
import { Materials } from "@/lib/materials";
import EditTable from "@/components/EditTable";
import AddForm from "@/components/ui/AddForm";
import { useState } from "react";
import { Material } from "@/lib/types/material.type";
import { Tag } from "@/lib/tags";
import { SrcItem, TagSearchInput } from "@/components/ui/TagSearchInput";


const MaterialsPage = () => {

    const [newMaterialName, setMaterialName] = useState("");
    const handleNewMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialName(e.target.value)
    }
    const { postData: addNewMaterials } = usePostApi(Materials.add);
    const { postData: dropMaterials } = usePostApi(Materials.drop);
    const [loading, setLoading] = useState(false);
    const { status, data: materials, setData: setMaterialsData } = useApi(Materials.get);
    
    const { data: tagsData } = useApi(Tag.getAll);

    const [tags, setTags] = useState<string[]>([]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 防止頁面重新整理
        if (!newMaterialName.trim()) return alert("請輸入分類名稱");
        setLoading(true);

        addNewMaterials(
            [newMaterialName, tags],
            (data) => {
                console.log("新增成功");
                if (setMaterialsData) {
                    setMaterialsData((prev) => [...(prev || []), data as Material]);
                }
            },
            (err) => {
                console.error(err);
                alert("err");
                setMaterialName(""); // 清空輸入框
            },
            () => {
                setLoading(false);
                setMaterialName(""); // 清空輸入框
                console.log(materials);
            }
        );
    };



    return <>
        <Header2>
            原料管理 | Materials Manage
        </Header2>
        <hr className="mt-5 " />
        <AddForm
            label="原料名稱"
            newVal={newMaterialName}
            handleNewVal={handleNewMaterial}
            handleSubmit={handleSubmit}
            tagInput={
                tagsData &&
                <TagSearchInput
                    setTagData={setTags}
                    src={tagsData as SrcItem[]}
                />
            }
        />

        <br />
        {
            materials &&
            <EditTable<Material>
                headers={[
                    {
                        title: "啟用",
                        key: "enable",
                        type: "boolean",
                        className: "w-[10px]"
                    },
                    {
                        title: "產品名稱",
                        key: "name",
                        type: "text"
                    },
                    {
                        title: "庫存狀態",
                        type: "stock",
                        keys: ["stock", "stockAmount"]
                    },
                    {
                        title: "標籤分類",
                        type: "tags",
                        key: "materialTags"
                    },

                    {
                        title: "操作",
                        type: "actions",
                        routes: [
                            { title: "編輯", route: "/edit" },
                            {
                                title: "刪除", route: "/api/materials/drop", type: "api",
                                onClick: (route) => {
                                    if (confirm("確認刪除？")) {
                                        console.log(route);
                                        dropMaterials([route],
                                            () => {
                                                alert("刪除成功");
                                                location.reload();
                                            },
                                            () => {
                                                alert("刪除失敗");
                                            }
                                        )
                                    }
                                }
                            }
                        ]

                    }
                ]}
                data={materials}
            />
        }
    </>
}

export default MaterialsPage;
