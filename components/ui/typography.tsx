interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const TitleSection = ({ children, ...props }: TypographyProps) => {
  return <h1 className={`${props.className} text-center font-libreBaskerville md:text-5xl text-3xl uppercase tracking-normal py-3 `}>{children}</h1>;
};
