import { MdOutlineManageSearch } from "react-icons/md";
import { Button } from "./Button";
import { Input } from "./Input";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
    titleButton: string;
}

export function InputAndButton({ className, titleButton, ...rest }: Props) {
    return (
        <div className="relative ">
            <div className="flex absolute inset-y-0  items-center pl-3 pointer-events-none">
                <MdOutlineManageSearch className="text-2xl opacity-40" />
            </div>
            <Input className={`pl-10 ${className}`} {...rest} />
            <Button
                type="submit"
                className="absolute right-2.5 bottom-[0.3rem]"
            >
                {titleButton}
            </Button>
        </div>
    );
}
