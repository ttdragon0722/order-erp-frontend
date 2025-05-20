import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { ProductListDto } from "./types/productExcludedOption.type";

const Product = {
    getList: async (): Promise<ApiResponse<ProductListDto[]>> => {
        try {
            const res = await axios.get("/api/product/list");
            if (res.status !== 200) {
                throw Error("Product list 失敗");
            }

            return { success: true, data: res.data }
        } catch (err) {
            console.error(err);
            return { success: false, message: "Product list 失敗"}
        }
    }
}

export default Product;