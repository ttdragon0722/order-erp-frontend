"use client";
import { Header2 } from "@/components/ui/Text";
import ContainerMobile from "../_components/container";
import { useApi } from "@/hook/useApi";
import LineLogin from "@/lib/lineLogin";

const LineLoginPage = () => {
    const { data } = useApi(LineLogin.getURL);

    return <ContainerMobile>
        <Header2>登入Line加入我們！</Header2>
        {
            data &&
            <a href={data}>點擊登入</a>
        }
    </ContainerMobile>
}

export default LineLoginPage;