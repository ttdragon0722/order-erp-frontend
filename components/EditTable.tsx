import CommitHandler from "@/lib/commitHandler";
import { v4 } from "uuid";
import { Checkbox } from "./ui/Input";
import clsx from "clsx";
import { Chip } from "./ui/Chip";
import { StockStatus, StockStatusText } from "@/lib/enums/stockStatus";
import Link from "./ui/Link";
import { Btn } from "./ui/Button";
import StockInput from "./StockInput";

type RowData = { id: string,hasStock?: boolean};
type FieldKey<T> = keyof T;
type StockField = [StockStatus, number | null]


export type RouteType = 'link' | 'api'
type Routes = {
    title: string,
    type?: RouteType; // 限定為 "link" 或 "api"，可選
    route: `/${string}`
    onClick?: (route: string) => void
}

type Action<T extends RowData> = {
    title: string,
    type: "actions",
    routes: Routes[]
    className?: string
}

type Header<T extends RowData> =
    | { title: string; type: "text" | "boolean" | "number"; key: FieldKey<T>; className?: string }
    | { title: string; type: "stock"; keys: [FieldKey<T>, FieldKey<T>]; className?: string }
    | { title: string; type: "tags" | "groups"; key: FieldKey<T>; className?: string }
    | Action<T>;


type EditTableProps<T extends RowData> = {
    headers: Header<T>[];
    data?: T[];
};

const EditTable = <T extends RowData>({ headers, data }: EditTableProps<T>) => {
    return (
        <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-center rtl:text-right text-black">
                <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={v4()}
                                data-key={
                                    header.type === "stock"
                                        ? `${String(header.keys[0])}-${String(header.keys[1])}`
                                        : "key" in header ? String(header.key) : ""
                                }
                                className={clsx(header.className, "px-6 py-3 text-center tracking-wider")}
                            >
                                {header.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row) => (
                        <tr key={row.id} 
                            className={clsx(
                                "cursor-select",row.hasOwnProperty("hasStock") && !row.hasStock && "bg-gray-200")}
                        >
                            {headers.map((header, index) => {
                                const tdClass = clsx("px-6 py-3", header.className)
                                switch (header.type) {
                                    case "stock":
                                        const [stockStatus, stockAmount]: StockField = [row[header.keys[0]], row[header.keys[1]]] as StockField;

                                        return (
                                            <td key={index} className={tdClass}>
                                                <StockInput
                                                    id={row.id}
                                                    initialStatus={stockStatus}
                                                    initialAmount={stockAmount}
                                                />
                                            </td>
                                        );

                                    case "tags":
                                    case "groups": {
                                        const selected = row[header.key];
                                        // console.log(selected);

                                        return (
                                            <td key={index} className={tdClass}>
                                                {Array.isArray(selected) && selected.length > 0 ?
                                                    <div className="flex justify-center items-center gap-1 flex-wrap">
                                                        {
                                                            selected.map((v) => {
                                                                return <Chip key={v4()} value={v.name} color={v.color} />
                                                            })
                                                        }
                                                    </div> :
                                                    <span key={v4()} className="text-gray-200">Null</span>
                                                }
                                            </td>
                                        );
                                    }
                                    case "boolean": {

                                        return <td key={index} className={tdClass}>
                                            <Checkbox
                                                checked={row[header.key] as boolean}
                                                onChange={() => { }}
                                            />
                                        </td>
                                    }
                                    case "actions":

                                        return <td key={index} className={clsx(tdClass, "flex gap-2 justify-center")}>
                                            {
                                                header.routes.map((r) => {
                                                    return <Link
                                                        key={v4()}
                                                        type={r.type}
                                                        route={`${r.route}/${row.id}`}
                                                        text={r.title}
                                                        onClick={r.onClick} />
                                                })
                                            }
                                        </td>

                                    case "number":
                                    case "text":
                                    default:
                                        return (
                                            <td key={index} className={tdClass}>
                                                {String(row[header.key])}
                                            </td>
                                        );
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditTable;
