interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export function Button({
    children,
    icon,
    className,

    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            className={`
                flex gap-2 justify-center items-center
                px-4 
                h-[42px]

                text-sm
                font-medium
                
                focus:outline-none 
                
                text-theme-white
                bg-theme-light-brand

                focus:ring-theme-light-brand

                focus:ring-2
                focus:ring-offset-1
                focus:ring-opacity-70
                
                hover:scale-[98%]
                rounded-[4px]
                transition ease-in duration-75 flex-1 
                ${className}
            `}
        >
            {icon}
            {children}
        </button>
    );
}
