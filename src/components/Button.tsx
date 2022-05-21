interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    color?: string;
}

export function Button({
    children,
    className,
    color = "green",
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            className={`
                flex gap-2 justify-center items-center
                py-3 px-4 text-white text-sm  transition ease-in duration-200 flex-1 
                hover:scale-[99%] bg-${color}-700 hover:bg-${color}-900 
                focus:ring-4 focus:outline-none focus:ring-${color}-300
                rounded-lg 
                dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800

                ${className}
            `}
        >
            {children}
        </button>
    );
}
