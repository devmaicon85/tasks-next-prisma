export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export default function Input({ ...rest }: InputProps) {
    return (
        <input
            className="
            rounded-lg flex-1 appearance-none 
            border border-blue-300 w-full 
            py-2 px-4 bg-white 
            text-gray-700 
            focus:outline-none focus:ring-1 focus:ring-slate-400 
            "
            {...rest}
        />
    );
}
