"use client"
import { Chip, TagInput } from "@/components/ui/Chip";
import { Select } from "@/components/ui/Select";
import { StockSelection } from "../_components/StockSelection";


const ProductsPage = () => {
    return <>
        <div className="flex gap-2">
            <Chip value="haha" onDel={() => { }} />
            <Chip value="haha" color="indigo" />
            <Chip value="haha" color="cyan" />
            <Chip value="haha" color="teal" />
            <Chip value="haha" color="purple" />
            <Chip value="haha" color="amber" />
        </div>
        <TagInput />
        <StockSelection value={2} onChange={(v) => console.log(v)} />


    </>
}

export default ProductsPage;