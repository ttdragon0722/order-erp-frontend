import { useApi } from "@/hook/useApi";
import { Materials } from "@/lib/materials";

const MaterialManage = () => {
    const { status, data } = useApi(Materials.get);

    return <>
        
    </>
}

export default MaterialManage;