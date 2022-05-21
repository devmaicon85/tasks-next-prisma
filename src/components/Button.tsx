export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            // className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "

            className="py-2 px-4 text-white transition ease-in duration-200 flex-1 hover:scale-[99%] bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 text-base font-semibold shadow-md rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
            {children}
        </button>
    );
}
