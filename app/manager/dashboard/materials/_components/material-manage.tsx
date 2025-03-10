import { useFetch } from "@/hook/useFetch";
import { Materials } from "@/lib/materials";

const MaterialManage = () => {
    const { status, data } = useFetch(Materials.get);

    return <>
        
    </>
}

export default MaterialManage;