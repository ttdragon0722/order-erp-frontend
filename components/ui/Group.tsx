import { FC, ReactNode } from "react";
import { Header3 } from "./Text";

interface GroupProp {
    children?: ReactNode;
    title?: string
}

const Group: FC<GroupProp> = ({
    children,title
}) => {
    return <div className="py-5 mb-5">
        {title && <Header3 className="mb-5">{title}</Header3>}
        {children}
    </div>
}

export default Group;