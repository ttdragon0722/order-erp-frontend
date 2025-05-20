"use client"
import { useApi } from "@/hook/useApi";
import OrderHeader from "../_components/header";
import Product from "@/lib/product";
import { v4 } from "uuid";
import { Header3 } from "@/components/ui/Text";
import ContainerMobile from "../_components/container";
import Link from "next/link";

const Main = () => {
    const { data } = useApi(Product.getList);

    return <div className="relative h-fit">
        <OrderHeader />
        <ContainerMobile>
            {
                data &&
                data.map((t) => {
                    return <div key={v4()} id={t.typeId} className="pt-5 mb-5 scroll-mt-[8vh]">
                        <Header3>
                            {t.typeName}
                        </Header3>
                        <br />
                        {
                            t.products.map((p) => {
                                return <Link key={v4()} href={`/order/product/${p.id}`}>
                                    <div className="font-bold text-xl">{p.name}</div>
                                    {p.price}$
                                    <hr className="my-5 text-gray-300" />
                                </Link>
                            })
                        }
                    </div>
                })
            }
        </ContainerMobile>
    </div>
}

export default Main;