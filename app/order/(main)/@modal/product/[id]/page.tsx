"use client"
import { useParams } from "next/navigation";
import ModalView from "../../_components/modal";
import Cart from "../../_components/cart";
import { useApiParam } from "@/hook/useApi";
import Product from "@/lib/product";
import { Header2 } from "@/components/ui/Text";
import { v4 } from "uuid";
import { Chip } from "@/components/ui/Chip";
import { useState } from "react";
import AmountBlock from "../../_components/amount";
import { Btn } from "@/components/ui/Button";
import ProductOption from "../../_components/options";

const ProductModal = () => {
    const { id } = useParams();
    const { data } = useApiParam(Product.getOptions, [id]);

    const [amount, setAmount] = useState(0);

    return <ModalView>

        {data && <>
            <Header2 className="mb-2">
                {data.name} {data.price}$
            </Header2>
            <div className="flex flex-wrap gap-2 mb-4">
                {data.depends?.map((d) => {
                    return <Chip key={v4()} value={d.name} color="cyan" />
                })}
            </div>
            <div className="mb-4">
                {
                    data.options.length === 0 ?
                        <>無客製化選項。</> :
                        <>
                            {
                                data.options.map((o) => {
                                    return <ProductOption key={v4()} option={o} />
                                })
                            }
                        </>
                }
            </div>
            <div className="flex justify-center items-center gap-2">
                <AmountBlock amount={amount} setAmount={setAmount} />
                <div className="w-fit">
                    <Btn label="加入購物車" className="p-4 py-2" />
                </div>
            </div>
        </>
        }
    </ModalView>
}

export default ProductModal;