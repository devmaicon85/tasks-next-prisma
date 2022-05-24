interface Props extends React.ComponentPropsWithoutRef<"input"> {
    titleButton: string;
    iconButton?: React.ReactNode;
    iconInput?: React.ReactNode;
}

export function InputAndButton({
    className,
    iconButton,
    iconInput,
    titleButton,
    ...rest
}: Props) {
    return (
        <div className="relative flex ">
            {/* icone dentro do input */}
            <div className="flex absolute inset-y-0  items-center pl-3 pointer-events-none">
                <div className="text-2xl opacity-40">{iconInput}</div>
            </div>
            <input
                className={`input input-primary pl-10 ${className}`}
                {...rest}
            />
            {/* botao dentro do input */}
            <div className="absolute right-1.5 bottom-[0.73rem] h-9">
                <button type="submit" className="btn btn-primary ">
                    {iconButton}
                    {titleButton}
                </button>
            </div>
        </div>
    );
}
