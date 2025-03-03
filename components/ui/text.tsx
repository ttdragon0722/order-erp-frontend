import React, { ReactNode } from "react";
import clsx from "clsx";

type TextProps = {
    children: ReactNode;
    className?: string;
    color?: string;
};

export const Header1: React.FC<TextProps> = ({ children, className = "", color = "text-gray-900" }) => {
    return (
        <h1
            className={clsx(
                "text-4xl md:text-5xl lg:text-6xl font-bold",
                color,
                className
            )}
        >
            {children}
        </h1>
    );
};

export const Header2: React.FC<TextProps> = ({ children, className = "", color = "text-gray-800" }) => {
    return (
        <h2
            className={clsx(
                "text-2xl md:text-3xl lg:text-4xl font-semibold",
                color,
                className
            )}
        >
            {children}
        </h2>
    );
};

export const Paragraph: React.FC<TextProps> = ({ children, className = "", color = "text-gray-700" }) => {
    return (
        <p
            className={clsx(
                "text-base md:text-lg lg:text-xl leading-relaxed",
                color,
                className
            )}
        >
            {children}
        </p>
    );
};
