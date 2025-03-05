import { Header2, Header3, Paragraph } from "@/components/ui/Text";
import { getMaterials } from "@/lib/materials";
import { Suspense } from "react";
import MaterialTable from "./_components/material-table";

const Materials = async () => {
    return <>
        <Header2>
            原料管理 | Materials Manage
        </Header2>
        <div className="my-5">
            <Header3>
                原料列表
            </Header3>
            <Suspense fallback={<p>正在加載材料...</p>}>
                <MaterialTable />
            </Suspense>
            {
                Array.from({ length: 100 }).map((_, index) => {
                    return <div key={index}>haha</div>;
                })
            }
        </div>
    </>
}

export default Materials;
