import { BooleanCell, Cell, StockCell, Table, TableBody, TableHeader, TableRow } from "@/components/ui/Table";
import { useApi } from "@/hook/useApi";
import { StatusView } from "@/hook/useStatus";
import CommitHandler from "@/lib/commitHandler";
import { Materials } from "@/lib/materials";
import { materialTableHeaders } from "@/lib/types/material.type";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const MaterialManage = () => {
    const { status, data } = useApi(Materials.get);
    const [commitHandler] = useState(new CommitHandler());

    useEffect(() => {
        if (status === "success" && data) {
            commitHandler.register(data);
        }
    }, [status])

    return <StatusView
        status={status}
        success={
            <Table>
                <TableHeader src={materialTableHeaders} />
                <TableBody>
                    {data && data.map((m) => (
                        <TableRow key={m.id}>
                            {materialTableHeaders.map((mth) => {
                                const value = m[mth.key];

                                if (mth.type === "boolean") {
                                    return <BooleanCell key={v4()} data={Boolean(value)} />;
                                } else if (mth.type === "stock") {
                                    return <StockCell key={v4()} data={value !== null ? Number(value) : null} nullText={mth.nullText} />;
                                } else {
                                    return <Cell key={v4()}>{String(value)}</Cell>;
                                }
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
    />

}

export default MaterialManage;