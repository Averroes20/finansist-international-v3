import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function TypographyH1({ children, ...props }: TypographyProps) {
    return (
        <h1
            className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${props.className}`}
        >
            {children}
        </h1>
    );
}

export function TypographyH2({ children, ...props }: TypographyProps) {
    return (
        <h2
            className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${props.className}`}
        >
            {children}
        </h2>
    );
}

export function TypographyH3({ children, ...props }: TypographyProps) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${props.className}`}>
            {children}
        </h3>
    );
}

export function TypographyH4({ children, ...props }: TypographyProps) {
    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${props.className}`}>
            {children}
        </h4>
    );
}

export function TypographyH5({ children, ...props }: TypographyProps) {
    return (
        <h5 className={`scroll-m-20 text-lg font-semibold tracking-tight ${props.className}`}>
            {children}
        </h5>
    );
}

interface TypographyPProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

export function TypographyP({ children, ...props }: TypographyPProps) {
    return <p className={`leading-7 ${props.className}`}>{children}</p>;
}
