export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className="text-white flex-1 hover:scale-105 right-0 absolute mt-3 bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
            {children}
        </button>
    );
}
