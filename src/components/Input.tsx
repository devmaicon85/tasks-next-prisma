interface Props extends React.ComponentPropsWithoutRef<"input"> {
    icon?: React.ReactNode;
}

export function Input({ className, icon, ...rest }: Props) {
    return (
        <>
            {icon && (
                <span className="rounded-l-md inline-flex  dark:bg-gray-600 dark:border-gray-600 items-center px-3 border-t border-l border-b bg-white  border-theme-light-background-brand text-gray-500 shadow-sm text-sm">
                    {icon}
                </span>
            )}

            <input
                className={`
                outline-none
                block 
                p-4 
                w-full 
                text-sm 
                border
                border-theme-light-background-brand
                bg-theme-light-background-input

                text-gray-900 
                rounded-sm
                hover:border-theme-light-brand
                placeholder:opacity-70
                focus:ring-theme-light-brand 
                focus:ring-0
                focus:border-theme-light-brand 
                dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-white 
                dark:focus:ring-theme-light-brand 
                dark:focus:border-theme-light-brand
                ${className}
            `}
                {...rest}
            />
        </>
    );
}
