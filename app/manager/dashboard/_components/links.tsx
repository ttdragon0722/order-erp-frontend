import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributeAnchorTarget } from "react";
import { v4 } from "uuid";

const rootRoute = "/manager/dashboard"

interface IRoute {
    name: string;
    route: string;
    target?: HTMLAttributeAnchorTarget | undefined;
}

const routes: IRoute[] = [
    {
        name: "首頁",
        route: rootRoute
    },
    {
        name: "商家管理",
        route: rootRoute + "/profile"
    },
    {
        name: "原料管理",
        route: rootRoute + "/materials"
    },
    {
        name: "商品類別管理",
        route: rootRoute + "/product-types"
    },
    {
        name: "商品管理",
        route: rootRoute + "/products"
    },
    {
        name: "Api 技術支援",
        route: "/swagger/index.html",
        target:"_blank"
    }
]

const Links = () => {
    const pathname = usePathname();

    return <div className="h-full">
        {
            routes.map((route, idx) => {
                return <Link key={v4()} href={route.route} title={route.name}  target={route.target} >
                    <div className={clsx("px-3 py-1.5 hover:bg-white/30 relative", pathname === route.route && "bg-white/10")}>
                        {
                            pathname === route.route
                        }
                        {route.name}
                    </div>
                </Link>
            })
        }
    </div>
}

export default Links;