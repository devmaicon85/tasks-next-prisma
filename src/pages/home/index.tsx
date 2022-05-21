import { DarkTheme } from "@/components/DarkTheme";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className=" flex h-screen w-screen dark:bg-slate-700 dark:text-white text-slate-700 flex-col">
            <Head>
                <title>Tasks Plataform</title>
                <link rel="icon" href="/assets/logo.png" />
            </Head>

            <div className="flex m-auto gap-3">
                <Image
                    width={128}
                    height={128}
                    src="/assets/logo.png"
                    alt="Tasks Plataform"
                />
                <h1 className=" text-3xl p-4 flex flex-col justify-center items-end">
                    Tasks Plataform
                    <Link href="/login">
                        <a className="text-sm hover:scale-150 ease-out duration-1000">
                            Efetuar login
                        </a>
                    </Link>
                </h1>

                <DarkTheme />
            </div>
        </div>
    );
}
