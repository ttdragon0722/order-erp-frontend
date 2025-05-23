"use client"
import { useState, useEffect } from "react";
import Product from "@/lib/product";
import { ProductCart } from "@/lib/types/product.type";
import { useParams, usePathname } from "next/navigation";

export default function PostPage() {
    const { id } = useParams() as { id: string };
    const [data, setData] = useState<ProductCart | null>(null);

    const pathname = usePathname();
    console.log("pathname", pathname);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const res = await Product.getOptions(id);
                if (res.success) {
                    setData(res.data ?? null);
                }
            }
        }
        console.log(id)
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log(id)
        console.log(pathname)
    }, [id,pathname])

    return (
        <div>
            <h1>這是 Post 頁面</h1>
            <p>你目前看到的是 id：{id}</p>
            {data && data.name}
        </div>
    );
}
