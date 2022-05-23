interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export function Checkbox({ className, children, ...rest }: Props) {
    return (
        <div className="flex items-center gap-2 text-sm ">
            <input
                type="checkbox"
                className={`
                
                outline-none
                block 
                p-4 
                text-sm 
                border
                border-theme-light-background-brand
                bg-theme-light-background-input

                text-theme-light-brand
                rounded-sm
                hover:border-theme-light-brand
                
                focus:ring-theme-light-brand 
                focus:ring-0
                focus:border-theme-light-brand 
                dark:bg-slate-600
                dark:border-state-600
                dark:text-theme-light-brand
                dark:focus:ring-theme-light-brand 
                dark:focus:border-theme-light-brand
                ${className}
            `}
                {...rest}
            />
            <span>{children}</span>
        </div>
    );
}
