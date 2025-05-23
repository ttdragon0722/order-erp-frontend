"use client"
import { useEffect } from "react";

const Cart = ({id}:{id:string}) => {
    useEffect(()=>{
        console.log(id);
    },[id])

    return <></>
}

export default Cart;