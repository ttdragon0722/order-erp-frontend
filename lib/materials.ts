export interface Material {
	id: number;
	name: string;
}

export async function getMaterials(): Promise<Material[]> {
	try {
		const res = await fetch(
			"http://localhost:3000/api/getMaterials",
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
