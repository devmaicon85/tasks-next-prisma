export interface Props extends React.ComponentPropsWithoutRef<"textarea"> {}

export default function TextArea({ className, ...rest }: Props) {
    return (
        <textarea
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
                min-h-[60px]
                placeholder:opacity-70
                border-gray-300 
                hover:border-green-500 
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
        ></textarea>
    );
}
