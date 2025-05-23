import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { ProductListDto } from "./types/productExcludedOption.type";
import { ProductCart } from "./types/product.type";

const Product = {
    getList: async (): Promise<ApiResponse<ProductListDto[]>> => {
        try {
            const res = await axios.get("/api/product/list");
            if (res.status !== 200) {
                throw Error("Product list 失敗");
            }

            return { success: true, data: res.data };
        } catch (err) {
            console.error(err);
            return { success: false, message: "Product list 失敗" };
        }
    },

    getOptions: async (id: string): Promise<ApiResponse<ProductCart>> => {
        try {
            console.log(id);
            if (!id ) return { success: false, message: "id not null"}
            const res = await axios.get(`/api/product/${id}`);
            if (res.status !== 200) {
                throw Error("Product options 失敗");
            }

            return { success: true, data: res.data };
        } catch (err) {
            console.error(err);
            return { success: false, message: "Product option 失敗" };
        }
    }
}

export default Product;
