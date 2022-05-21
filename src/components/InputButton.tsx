import { MdOutlineManageSearch } from "react-icons/md";
import { Button } from "./Button";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
    titleButton: string;
}

export function InputButton({ className, titleButton, ...rest }: Props) {
    return (
        <div className="relative ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineManageSearch className="text-2xl opacity-40" />
            </div>
            <input
                className={`
                    outline-none
                    block 
                    p-4 
                    pl-10
                    w-full 
                    text-sm 
                    text-gray-900 
                    bg-gray-50 
                    rounded-lg 
                    border
                    border-gray-300 
                    hover:border-green-500
                    placeholder:opacity-70
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
            />
            <Button
                type="submit"
                className="absolute right-2.5 bottom-[0.3rem]"
            >
                {titleButton}
            </Button>
        </div>
    );
}
