import { useEffect, useState } from "react";
import { FaAffiliatetheme } from "react-icons/fa";

type Props = {
    className?: string;
};
export function DarkTheme({ className }: Props) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(localStorage.theme === "dark");
    }, []);

    function onSetDark() {
        if (localStorage.theme === "dark") {
            localStorage.theme = "light";
            setDark(false);
        } else if ((localStorage.theme = "light")) {
            localStorage.theme = "dark";
            setDark(true);
        }

        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            console.log("tema é dark adicionado");

            document.documentElement.classList.add("dark");
        } else {
            console.log("tema dark removido");
            document.documentElement.classList.remove("dark");
        }
    }

    return (
        <div onClick={onSetDark}>
            <FaAffiliatetheme
                title="alterar tema"
                className={`
                    cursor-pointer 
                    hover:scale-90 
                    text-xl 
                    opacity-80 
                    hover:opacity-100
                    ${dark && "rotate-180"}
                    ease-in-out
                    duration-1000
                    ${className}
                    
                `}
            />
        </div>
    );
}
