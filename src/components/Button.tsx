export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className="
            flex px-5 justify-center items-center  
            bg-blue-600 hover:bg-blue-700 
            focus:ring-blue-500 focus:ring-offset-blue-200 
            text-white transition ease-in duration-200 text-center text-base 
            font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg 
        "
        >
            {children}
        </button>
    );
}
