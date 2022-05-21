interface Props extends React.ComponentPropsWithoutRef<"textarea"> {}

export function TextArea({ className, ...rest }: Props) {
    return (
        <textarea
            className={`

                scrollbar-track-green-50
                scrollbar-thumb-green-500
                scrollbar-thin

                outline-none
                block 
                p-4 
                w-full 
                text-sm 
                text-gray-900 
                bg-gray-50 
                rounded-lg 
                border
                min-h-[60px]
                placeholder:opacity-70
                placeholder:h-7
                border-gray-300 
                hover:border-green-500 
                focus:ring-green-500 
                focus:border-green-500 
                dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-slate-300 
                dark:focus:ring-green-500 
                dark:focus:border-green-500
                ${className}

            `}
            {...rest}
        ></textarea>
    );
}
