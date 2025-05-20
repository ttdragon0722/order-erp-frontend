import { Header2 } from "@/components/ui/Text";
import AddOptionForm from "./_components/addOptionForm";
import Block from "@/components/ui/Block";

const OptionsPage = () => {
    return <div>
        <Header2>
            商品選單管理
        </Header2>
        <hr className="mt-5 " />
        <Block label="新增選項">
            <AddOptionForm />
        </Block>
    </div>
}

export default OptionsPage;