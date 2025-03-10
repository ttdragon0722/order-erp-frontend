// import axios from "axios";
// import { Material, materialTableHeaders } from "./types/material.type";
// import { ApiResponse } from "./types/apiResponse";
// import { cookies } from "next/headers";

// export { materialTableHeaders };

// export async function getMaterials(): Promise<
// 	Material[] | { error: string } | undefined
// > {
// 	try {
// 		const token = (await cookies()).get("auth_token")?.value || "";
// 		const response = await axios.get<ApiResponse<Material[]>>(
// 			"http://localhost:3000/api/getMaterials",
// 			{
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 				withCredentials: true,
// 			}
// 		);

// 		if (response.data.success) {
// 			console.log(response.data);
// 			return response.data.data || []; // Return data, or an empty array if no data
// 		} else {
// 			throw new Error(
// 				response.data.message || "Failed to fetch materials"
// 			);
// 		}
// 	} catch (error) {
// 		if (axios.isAxiosError(error)) {
// 			// Check HTTP status codes
// 			if (error.response) {
// 				if (error.response.status === 500) {
// 					console.error("Server error: 500");
// 					return {
// 						error: "Server error: 500, please try again later.",
// 					}; // 500 error message
// 				} else if (error.response.status === 401) {
// 					console.error("Unauthorized: 401");
// 					return {
// 						error: "Unauthorized: 401, please check your credentials.",
// 					}; // 401 error message
// 				}
// 			} else {
// 				console.error("Network or connection error:", error);
// 				return {
// 					error: "Network error: please check your connection.",
// 				}; // Network error message
// 			}
// 		} else {
// 			console.error("Error fetching materials:", error);
// 			return { error: "Unknown error occurred." }; // Unknown error
// 		}
// 	}
// }
