"use client"
import { useParams } from "next/navigation";
import ModalView from "../../_components/modal";

const ProductModal = () => {
    const { id }  = useParams();

    return <ModalView>
        product: {id}
    </ModalView>
}

export default ProductModal;