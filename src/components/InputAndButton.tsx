import { MdOutlineManageSearch } from "react-icons/md";
import { Button } from "./Button";
import { Input } from "./Input";

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
            <div className="flex absolute inset-y-0  items-center pl-3 pointer-events-none">
                <div className="text-2xl opacity-40">{iconInput}</div>
            </div>
            <Input className={`pl-10 ${className}`} {...rest} />
            <Button
                icon={iconButton}
                type="submit"
                className="absolute right-1.5 bottom-[0.55rem] h-9"
            >
                {titleButton}
            </Button>
        </div>
    );
}
