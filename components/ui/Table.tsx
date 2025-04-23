import { FC, ReactNode, useState } from "react"
import { v4 } from "uuid";
import { Checkbox } from "./Input";


interface TableProp {
    children: ReactNode;
}

const Table: FC<TableProp> = ({ children }) => {
    return <div className="relative w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-black">
            {children}
        </table>
    </div>
}

type HeaderData = {
    key: string, label: string
}

interface HeaderProp {
    src: HeaderData[];
};

const TableHeader: FC<HeaderProp> = ({
    src
}) => {
    return <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
            {
                src.map((s) => {
                    return <th key={v4()} data-key={s.key} className="px-6 py-3">{s.label}</th>
                })
            }
        </tr>
    </thead>
}

const TableBody: FC<{ children: ReactNode }> = ({ children }) => {

    return <tbody>
        {children}
    </tbody>
}

interface TableRowProp {
    children: ReactNode;
    id?: string;
}

const TableRow: FC<TableRowProp> = ({ children, id }) => {
    return <tr data-id={id} className="bg-white border-b border-gray-200">
        {children}
    </tr>
}


const Cell: FC<{ children: ReactNode }> = ({ children }) => {
    return <td className="px-6 py-4">
        {children}
    </td>
}
const BooleanCell: FC<{ data: boolean }> = ({ data }) => {
    const [check, setCheck] = useState<boolean>(data);

    return (
        <Cell>
            <Checkbox checked={check} onChange={() => setCheck(!check)} />
        </Cell>
    );
};

export const StockCell: FC<{ data: number | null; nullText?: string }> = ({ data, nullText }) => {
    const [value, setValue] = useState<number | null>(data);

    return (
        <Cell>
            {data !== null ? (
                <input
                    type="number"
                    value={value ?? ""}
                    onChange={(e) => setValue(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-2 py-1 border rounded"
                />
            ) : (
                <>{nullText}</>
            )}
        </Cell>
    );
};



export { Table, TableHeader, TableBody, TableRow, Cell, BooleanCell }