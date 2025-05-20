"use client"
import { ModalSelector } from "@/components/ModalSelector";
import { SubmitButton } from "@/components/ui/Button";
import { TagInput } from "@/components/ui/Chip";
import { Checkbox, Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { OptionGroupType, OptionGroupTypeOptions } from "@/config/optionType";
import { useApi, usePostApi } from "@/hook/useApi";
import { Materials } from "@/lib/materials";
import { Options } from "@/lib/options";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const AddOptionForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [optionType, setOptionType] = useState(OptionGroupType.General);
    const [children, setChildren] = useState<string[]>([]);
    const [require, setRequire] = useState(false);

    const [dependName, setDependName] = useState("");
    const [optionDepends, setOptionDepends] = useState("");

    const { data: materialData } = useApi(Materials.get);

    const { postData } = usePostApi(Options.create);

    useEffect(() => {
        console.table(
            { name, price, optionType, children, require, optionDepends });

    }, [name, price, optionType, children, require, optionDepends]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 阻止表單預設刷新行為

        postData([name, price, optionType, children, require, optionDepends],
            ()=>{
                console.log("新增成功");
            },
            (err)=>{
                alert("error");
            }
        )
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/2 ">
        <Input required placeholder="選項名稱" value={name} onChange={(prev) => setName(prev.target.value)} />
        <Input type="number" placeholder="選項價錢" value={price} onChange={(prev) => setPrice(Number(prev.target.value))} />
        <ModalSelector<string>
            placeholder="請選擇依賴原料"
            select={dependName}
            setSelect={setOptionDepends}
            model={
                <div className="w-full pt-5 flex flex-wrap gap-5">
                    {
                        materialData &&
                        materialData.map((m) => {
                            return <div key={v4()}
                                className={
                                    clsx(
                                        "px-2 py-1 rounded-xl shadow-md cursor-pointer",
                                        optionDepends === m.id ? "bg-amber-100" : "bg-[#f6fafe]"
                                    )
                                }
                                onClick={() => {
                                    if (optionDepends === m.id) {
                                        setOptionDepends("");
                                        setDependName("");
                                    } else {
                                        setOptionDepends(m.id);
                                        setDependName(m.name);
                                    }
                                }}
                            >{m.name}</div>
                        })
                    }
                </div>
            }
        />
        <Select value={optionType.toString()} options={OptionGroupTypeOptions} onChange={(v) => { setOptionType(Number(v)) }} />
        {
            optionType === OptionGroupType.Single &&
            <>
                <div className="flex items-center">
                    <span>是否必填：</span>
                    <Checkbox checked={require} onChange={(e) => setRequire(e.target.checked)} />
                </div>
                <div>
                    <span>子選項：</span>
                    <TagInput tags={children} setTags={setChildren} />
                </div>
            </>
        }

        <SubmitButton label="新增" />
    </form>
}
export default AddOptionForm;