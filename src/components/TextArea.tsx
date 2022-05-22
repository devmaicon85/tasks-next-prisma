interface Props extends React.ComponentPropsWithoutRef<"textarea"> {}

export function TextArea({ className, ...rest }: Props) {
    return (
        <textarea
            className={`

                scrollbar-track-green-50
                scrollbar-thumb-slate-700


                scrollbar-thin

                outline-none
                block 
                p-4 
                w-full 
                text-sm 
                text-gray-900 
                bg-gray-50 
                rounded-sm
                border
                min-h-[60px]
                placeholder:opacity-70
                placeholder:h-7
                border-gray-300 
                hover:border-theme-light-brand
                focus:ring-theme-light-brand 
                focus:border-theme-light-brand 
                focus:ring-0
                dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-slate-300 
                dark:focus:ring-theme-light-brand 
                dark:focus:border-theme-light-brand

                disabled:opacity-60
                ${className}

            `}
            {...rest}
        ></textarea>
    );
}
