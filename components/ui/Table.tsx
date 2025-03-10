import { FC, ReactNode } from "react"
import { v4 } from "uuid";

interface TableProp {
    children: ReactNode;
}

const Table: FC<TableProp> = ({ children }) => {
    return <div className="relative w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
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
    return <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
    return <tr data-id={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        {children}
    </tr>
}

const Cell: FC<{ children: ReactNode }> = ({ children }) => {
    return <td className="px-6 py-4">
        {children}
    </td>
}

export { Table, TableHeader, TableBody, TableRow, Cell }