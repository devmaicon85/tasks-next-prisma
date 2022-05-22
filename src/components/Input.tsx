interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export function Input({ className, ...rest }: Props) {
    return (
        <input
            className={`
                outline-none
                block 
                p-4 
                w-full 
                text-sm 
                border
                border-theme-light-background-brand

                text-gray-900 
                bg-theme-light-background-input
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
    );
}
