import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { FaAffiliatetheme, FaMoon, FaSun } from "react-icons/fa";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

type Props = {
    className?: string;
};
export function ThemeButton({ className }: Props) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(localStorage.theme === "dark");
        onSetDark();
    }, []);

    function onSetDark() {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
            setDark(false);
        }
    }

    function onAlterTheme() {
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
            setDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setDark(true);
        }
    }

    return (
        <div
            title={`${
                dark ? "mudar para tema light" : "mudar para tema dark"
            } `}
            onClick={onAlterTheme}
            className={`
                    w-10
                    h-10
                    cursor-pointer 
                    text-2xl 
                    flex
                    opacity-70
                    hover:opacity-100
                    justify-center
                    items-center
                    ${dark && "rotate-180"}
                    ease-in-out
                    duration-1000
                    ${className}
        
            `}
        >
            {dark ? <FaMoon /> : <FaSun className="text-yellow-300" />}
        </div>
    );
}
