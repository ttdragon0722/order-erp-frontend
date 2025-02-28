import Image from "next/image";
import { FC } from "react";
import clsx from "clsx";

enum EObjectFit {
    Contain = "object-contain",
    Cover = "object-cover",
    Fill = "object-fill",
    None = "object-none",
    ScaleDown = "object-scale-down"
}

interface FillImageProps {
    className?: string;
    src: string;
    objectFit?: EObjectFit;
    alt?: string;
}

const FillImage: FC<FillImageProps> = ({ className = "", src, objectFit = EObjectFit.Contain, alt = "image" }) => {
    return (
        <div className={clsx("relative overflow-hidden", className)}>
            <Image src={src} alt={alt} fill className={objectFit} />
        </div>
    );
};

export default FillImage;
