import { useEffect, useState } from "react";
import { Table, TableBody, TableHeader, TableRow, Cell } from "@/components/ui/Table";
import CommitHandler from "@/lib/commitHandler";

import { Material, materialTableHeaders } from "@/lib/types/material.type";

const MaterialTable = () => {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch("/api/getMaterials");
                if (!response.ok) throw new Error(`錯誤 ${response.status}: ${response.statusText}`);

                const data = await response.json();
                if (data.error) throw new Error(data.error);

                setMaterials(data);
            } catch (err) {
                // TypeScript: Check if 'err' is an instance of Error
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("發生未知錯誤");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    if (loading) return <p>載入中...</p>;
    if (error) return <p>錯誤：{error}</p>;

    const commitHandler = new CommitHandler();

    return (
        <>
            {materials.length === 0 ? (
                <p>沒有找到材料。</p>
            ) : (
                <Table>
                    <TableHeader src={materialTableHeaders} />
                    <TableBody>
                        {commitHandler.source.map((m) => (
                            <TableRow key={m.id}>
                                {materialTableHeaders.map((mth) => (
                                    <Cell key={mth.key}>{m[mth.key]}</Cell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default MaterialTable;
