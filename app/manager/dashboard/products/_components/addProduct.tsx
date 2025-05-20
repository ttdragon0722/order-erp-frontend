import { OptionGroupType } from "@/config/optionType";
import { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [typeId, setTypeId] = useState<string>("");
    const [depend, setDepend] = useState<string[]>([]);

    return <></>
}

export default AddProduct;