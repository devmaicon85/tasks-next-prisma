interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={`
                flex gap-2 justify-center items-center
                py-3 px-4 text-white text-sm  transition ease-in duration-200 flex-1 
                hover:scale-[99%] bg-green-700 hover:bg-green-900 
                focus:ring-4 focus:outline-none focus:ring-green-300
                rounded-lg 
                dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
                ${className}
            `}
        >
            {children}
        </button>
    );
}
