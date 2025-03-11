"use client"
import { Header2, Header3 } from "@/components/ui/Text";
import MaterialManage from "./_components/material-manage";


const Materials = () => {

    

    return <>
        <Header2>
            原料管理 | Materials Manage
        </Header2>
        <div className="my-5">
            <Header3>
                原料列表
            </Header3>
            <MaterialManage />
        </div>
    </>
}

export default Materials;
