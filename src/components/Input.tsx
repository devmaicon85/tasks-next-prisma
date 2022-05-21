export interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export function Input({ className, ...rest }: Props) {
    return (
        <input
            className={`
                outline-none
                block 
                p-4 
                w-full 
                text-sm 
                text-gray-900 
                bg-gray-50 
                rounded-lg 
                border
                border-gray-300 
                hover:border-green-500
                placeholder:opacity-70
                focus:ring-green-500 
                focus:border-green-500 
                dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-white 
                dark:focus:ring-green-500 
                dark:focus:border-green-500
                ${className}
            `}
            {...rest}
        />
    );
}
