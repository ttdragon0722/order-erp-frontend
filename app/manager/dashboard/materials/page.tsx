""
import { Header2, Header3, Paragraph } from "@/components/ui/Text";
// import { getMaterials } from "@/lib/materials";

export interface Material {
	id: number;
	name: string;
}

export async function getMaterials(): Promise<Material[]> {
	try {
		const res = await fetch(
			"/api/getMaterials",
			{
				cache: "no-store", // 確保每次請求都是最新的
				credentials: "include"
			}
		);

		if (!res.ok) {
			throw new Error("Failed to fetch materials");
		}

		const data = await res.json();
		return data.success ? data.data : [];
	} catch (error) {
		console.error("Error fetching materials:", error);
		return [];
	}
}


const Materials = async () => {
    const materials = await getMaterials();
    return <>
        <Header2>
            原料管理 | Materials Manage
        </Header2>
        <div className="my-5">
            <Header3>
                原料列表
            </Header3>
            {materials.length === 0 ? (
                <p>沒有找到材料。</p>
            ) : (
                <ul className="list-disc pl-6">
                    {materials.map((material) => (
                        <li key={material.id} className="text-lg">
                            {material.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
}

export default Materials;
