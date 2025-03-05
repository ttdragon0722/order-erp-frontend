import { getMaterials } from "@/lib/materials";

const MaterialTable = async () => {
    const materials = await getMaterials();

    return <>{
        materials.length === 0 ? (
            <p>沒有找到材料。</p>
        ) : (
            <ul className="list-disc pl-6">
                {materials.map((material) => (
                    <li key={material.id} className="text-lg">
                        {material.name}
                    </li>
                ))}
            </ul>
        )
    }</>
}

export default MaterialTable;