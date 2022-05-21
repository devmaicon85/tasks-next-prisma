import { Button } from "./Button";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

export function ButtonMiniIcon({ children, className, ...rest }: ButtonProps) {
    return (
        <Button
            {...rest}
            className={`
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
        </Button>
    );
}
