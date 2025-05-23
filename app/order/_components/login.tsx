"use client"

import FillImage from "@/components/ui/FillImage";
import { useApi } from "@/hook/useApi"
import LineLogin from "@/lib/lineLogin"
import clsx from "clsx";

const LoginBlock = () => {
    const { data: Me } = useApi(LineLogin.getMe);
    const { data: Url } = useApi(LineLogin.getURL);

    return <div className={
        clsx(
            !Me && "px-2",
            "absolute top-2 right-2 w-fit h-11 gap-1 rounded-4xl overflow-hidden flex items-center bg-amber-400 text-white pr-2 font-bold shadow-2xl"
        )}>
        {
            Me ? <>
                {Me.pictureUrl ? <FillImage className="w-10 h-10 rounded-4xl" src={Me.pictureUrl} /> : <></>}
                <div>{Me.displayName}</div>
            </> :
                <div>
                    <a href={Url}>
                        註冊/登入
                    </a>
                </div>
        }
    </div>
}

export default LoginBlock;