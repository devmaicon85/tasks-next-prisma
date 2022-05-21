interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export function Button({
    children,
    className,

    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            className={`
                flex gap-2 justify-center items-center
                py-3 px-4 text-white text-sm  transition ease-in duration-75 flex-1 
                hover:scale-95 bg-green-700 
                focus:ring-4 focus:outline-none focus:ring-slate-300
                rounded-lg 
                 dark:hover:brightness-90 dark:focus:ring-slate-600

                ${className}
            `}
        >
            {children}
        </button>
    );
}
