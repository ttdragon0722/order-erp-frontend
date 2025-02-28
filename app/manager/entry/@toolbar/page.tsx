import FillImage from "@/components/ui/FillImage";

export default function Toolbar() {
    return (
        <div className="w-[256px] relative text-white">
            <div className="px-8 py-5">
                <FillImage className="w-full aspect-[5/4] rounded-lg" src="/order-erp.jpg" alt="logo" />
            </div>
        </div>
    );
}
