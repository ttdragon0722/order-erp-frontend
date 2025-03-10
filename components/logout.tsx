
import { ManagerAuth } from "@/lib/managerAuth";
import { useRouter } from "next/navigation";

const ManagerLogoutBtn = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const result = await ManagerAuth.logout();

        if (result.success) {
            alert("登出成功！");
            router.push("/manager");
        } else {
            alert("登出失敗，請重試");
        }
    }

    return <button className="bg-black text-white" onClick={handleLogout}>
        登出
    </button>
}

export default ManagerLogoutBtn;