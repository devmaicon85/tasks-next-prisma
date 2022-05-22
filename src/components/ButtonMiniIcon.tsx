import { Button } from "./Button";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export function ButtonMiniIcon({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={`
                        flex 
                        gap-2 
                        justify-center 
                        items-center
                        px-4 
                        text-base 
                        font-medium
                        transition ease-in duration-75 flex-1 
                        focus:outline-none 
                        rounded-[4px]
                        dark:hover:brightness-90 
                        dark:focus:ring-slate-600
                        bg-transparent 
                        hover:bg-transparent 
                        dark:bg-transparent
                        dark:hover:bg-transparent
                        text-gray-500  
                        focus:ring-2
                        focus:ring-slate-500
                        h-5
                        hover:scale-125  

                        ${className}
            `}
        >
            {children}
        </button>
    );
}
