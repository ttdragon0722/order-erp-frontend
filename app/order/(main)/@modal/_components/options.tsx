import { OptionGroupType } from "@/lib/enums/optionType";
import { OptionResponse } from "@/lib/types/option.type";
import { v4 } from "uuid";

interface OptionProp { option: OptionResponse }

const ProductOption = ({ option: o }: OptionProp) => {

    switch (o.type) {
        default:
        case OptionGroupType.General:
            return <General option={o} />
        case OptionGroupType.Single:
            return <Single option={o} />
    }

};

const General = ({ option: o }: OptionProp) => {
    return <div>
        {o.name}
        {
            o.price > 0 ?
                <>+{o.price}$</> :
                o.price < 0 &&
                <>{o.price}$</>
        }
    </div>;
}

const Single = ({ option: o }: OptionProp) => {
    return (
        <div>
            <div className="font-bold mb-2">{o.name} {o.require && <>必填</>}</div>
            {
                o.children?.map((c) => {
                    return (
                        <label key={c.id} htmlFor={c.id} className="flex items-center space-x-2 mb-1 cursor-pointer">
                            <input
                                required={o.require}
                                type="radio"
                                id={c.id}
                                name={o.id} // 同一組 name 才能單選
                                value={c.id}
                                className="accent-blue-600"
                            />
                            <span>{c.name}</span>
                        </label>
                    )
                })
            }
        </div>
    )
}

export default ProductOption;