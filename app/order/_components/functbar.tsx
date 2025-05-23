import Link from "next/link";

const FunctionBar = () => {
    return <Link href="/order/cart">
        <div className="fixed bottom-0 left-0 w-full h-[8vh] z-40 overflow-hidden rounded-t-3xl" >
            <div className="cursor-pointer select-none w-full h-full bg-orange-400/75 backdrop-blur-2xl font-black flex justify-center items-center text-xl text-white/95 tracking-wider">
                購物車 / 選單
            </div>
        </div>
    </Link>
}

export default FunctionBar;